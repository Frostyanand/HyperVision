import time


def measure_time(fn, *args, **kwargs):
    """
    Execute a function and measure its wall-clock execution time.
    Returns (result, elapsed_seconds).
    """
    try:
        import torch
        if torch.cuda.is_available():
            torch.cuda.synchronize()
    except ImportError:
        pass

    start = time.perf_counter()
    result = fn(*args, **kwargs)

    try:
        import torch
        if torch.cuda.is_available():
            torch.cuda.synchronize()
    except ImportError:
        pass

    end = time.perf_counter()
    return result, end - start


def compute_speedup(cpu_time, gpu_time):
    """
    Compute speedup ratio.  Returns 1.0 if gpu_time is zero or negative.
    """
    if gpu_time <= 0:
        return 1.0
    return round(cpu_time / gpu_time, 2)
