"""
HyperVision Backend — FastAPI entry point.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path

from contextlib import asynccontextmanager
from routes.process import router as process_router
from routes.matrix import router as matrix_router
import torch
import numpy as np
import os

# Set PyTorch memory allocator to avoid fragmentation OOMs on 6GB/8GB GPUs
os.environ["PYTORCH_CUDA_ALLOC_CONF"] = "expandable_segments:True"

# Re-added the missing definition
UPLOADS_DIR = Path(__file__).resolve().parent / "uploads"
UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # GPU Warm-up: Initialize CUDA context to avoid latency on first request
    if torch.cuda.is_available():
        print("[GPU] Warming up CUDA core context...")
        dummy = torch.zeros((1, 3, 1024, 1024), device="cuda")
        torch.cuda.synchronize()
        del dummy
    yield

app = FastAPI(
    title="HyperVision API",
    description="GPU-accelerated image processing backend",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — allow the Next.js dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve processed images from /uploads
app.mount("/uploads", StaticFiles(directory=str(UPLOADS_DIR)), name="uploads")

# Register API routes
app.include_router(process_router, tags=["process"])
app.include_router(matrix_router, prefix="/matrix", tags=["matrix"])


@app.get("/")
def root():
    return {"status": "ok", "service": "HyperVision API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
