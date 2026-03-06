# HyperVision 🚀

**HyperVision** is a next-generation web application designed to visually demonstrate the massive performance differences between CPU computing and GPU acceleration across two distinct domains: Image Processing and Matrix Mathemataics. 

Built with a stunning, premium aesthetic ("glassmorphism", deep contrasts, #244ED1 branding), this project brings high-performance computing to a visual, interactive browser experience.

---

## 🌟 Core Features

### 1. GPU Accelerated Image Processing
Upload standard or extremely high-resolution 4K/8K images and apply intensive algorithms. Watch in real-time as PyTorch/CUDA absolutely obliterates the CPU's processing times.

**Operations Include:**
- **Classical Transforms**: Gaussian Blur, Grayscale, Edge Detection (Sobel), Sharpening, Histogram Equalization, OTSU Thresholding.
- **Morphological Math**: Erosion, Dilation, Opening, Closing.

*The backend utilizes highly optimized NumPy paths for CPU work, and pure PyTorch (`device="cuda"`) paths for identical GPU work.*

### 2. Live Matrix Computing Benchmark
An interactive playground demonstrating raw floating point mathematical horsepower.
- Dial up a "Matrix Dimension" slider to define the physical memory constraints (e.g. 10,000 x 10,000 matrices).
- Dial a "Compute Loop" multiplier slider to enforce sustained workloads (up to 100x back-to-back loops).
- Run the benchmark to spawn a live race between the CPU and GPU. The UI decouples the requests, allowing the GPU to finish instantly while the CPU physically lags, providing a visceral, interactive speedup visualization.

---

## 🛠️ Tech Stack & Architecture

This is a decoupled monolith consisting of a modern React frontend and a heavyweight Python Data-Science backend.

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4 + Vanilla CSS Modules for complex animations.
- **Icons:** `lucide-react`
- **Networking:** Axios for asynchronous API requests

### Backend
- **Framework:** FastAPI (Asynchronous API endpoints)
- **Math Engine (CPU):** NumPy
- **Math Engine (GPU):** PyTorch (`torch.cuda`)
- **Image Processing:** OpenCV (`cv2`) and Pillow (`PIL`)
- **Server:** Uvicorn

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18+ required.
- **Python**: 3.10+ required.
- **Nvidia GPU**: Required for actual GPU acceleration times (will gracefully fallback to CPU PyTorch if no CUDA cores are detected, though this defeats the benchmark!).
- **CUDA Toolkit**: Required by PyTorch for hardware access.

### 2. Setup the Python Backend
The backend utilizes heavyweight AI/Math libraries. We highly recommend using a Virtual Environment (`venv` or `conda`).

```bash
cd backend
python -m venv venv
# Activate the venv (Windows):
.\venv\Scripts\activate
# Activate the venv (Mac/Linux):
source venv/bin/activate

pip install -r requirements.txt
```

### 3. Setup the Frontend
```bash
cd hypervision
npm install
```

### 4. Run the Full Stack
Thanks to `concurrently`, running the application is a single command. The command will automatically boot the Next.js hot-reloading dev server AND boot the Uvicorn ASGI Python server.

*Make sure your Python virtual environment is active in your terminal before running this.*

```bash
cd hypervision
npm run dev
```

Visit `http://localhost:3000` to interact with HyperVision!
