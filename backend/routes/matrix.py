from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import time
import numpy as np
import torch
import math
import gc

# Use the same benchmark helpers if available, or just do it inline here for simplicity.
# We'll do it inline since taking multiple reps of massive matrix multiplications can lock up the server.

router = APIRouter()

class MatrixRequest(BaseModel):
    n: int # Dimension of the NxN matrix
    device: str = "both" # "cpu", "gpu", or "both"
    iterations: int = 1 # Number of times to run the compute

@router.post("/multiply")
async def multiply_matrices(req: MatrixRequest):
    # HARD LIMIT: 10,000 x 10,000 is ~400MB per matrix in float32. 
    # Having A, B, and C in memory simultaneously takes ~1.2 GB of RAM minimum per request.
    # At 30,000, it takes ~10.8 GB, instantly crashing Next/FastAPI via RAM OOM and spilling to SSD.
    if req.n < 100 or req.n > 10000:
        raise HTTPException(status_code=400, detail="Dimension must be between 100 and 10000 to prevent extreme RAM Out of Memory crashes.")
    if req.iterations < 1 or req.iterations > 1000:
        raise HTTPException(status_code=400, detail="Iterations must be between 1 and 1000.")

    N = req.n
    Iters = req.iterations
    
    # 0. Force cleanup before heavy allocations to free RAM
    gc.collect()
    torch.cuda.empty_cache()

    # Generate random data on CPU (using float32 to match GPU standard)
    A_np = np.random.rand(N, N).astype(np.float32)
    B_np = np.random.rand(N, N).astype(np.float32)
    
    cpu_time = 0.0
    gpu_time = 0.0

    # 1. CPU Run
    if req.device in ["cpu", "both"]:
        start_cpu = time.perf_counter()
        for _ in range(Iters):
            C_np = np.dot(A_np, B_np)
        cpu_time = time.perf_counter() - start_cpu
        # Clean up the last C_np matrix reference
        del C_np
        gc.collect()

    # 2. GPU Run
    if req.device in ["gpu", "both"]:
        if torch.cuda.is_available():
            # Pin memory to transfer to GPU faster if needed, though raw transfer is fine here
            device = torch.device('cuda')
            A_pt = torch.from_numpy(A_np).to(device)
            B_pt = torch.from_numpy(B_np).to(device)
            
            # Warmup
            _ = torch.matmul(A_pt, B_pt)
            torch.cuda.synchronize()
            
            start_gpu = time.perf_counter()
            for _ in range(Iters):
                C_pt = torch.matmul(A_pt, B_pt)
            torch.cuda.synchronize()
            gpu_time = time.perf_counter() - start_gpu
            
            del A_pt, B_pt, C_pt
            torch.cuda.empty_cache()
            gc.collect()
        else:
            # Fallback
            A_pt = torch.from_numpy(A_np)
            B_pt = torch.from_numpy(B_np)
            start_gpu = time.perf_counter()
            for _ in range(Iters):
                _ = torch.matmul(A_pt, B_pt)
            gpu_time = time.perf_counter() - start_gpu

    # Clean up massive NumPy arrays immediately before returning response
    del A_np
    del B_np
    gc.collect()

    # Calculate actual speedup (only relevant if both were run)
    speedup = cpu_time / gpu_time if (gpu_time > 0 and cpu_time > 0) else 1.0

    return {
        "dimension": N,
        "iterations": Iters,
        "operations": 2 * (N ** 3) * Iters,
        "cpu_time": round(cpu_time, 4) if req.device in ["cpu", "both"] else None,
        "gpu_time": round(gpu_time, 4) if req.device in ["gpu", "both"] else None,
        "speedup": round(speedup, 1) if req.device == "both" else None
    }
