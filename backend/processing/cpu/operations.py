"""
CPU-based image processing operations using OpenCV and NumPy.
"""
import cv2
import numpy as np


def grayscale(img):
    """Convert BGR image to grayscale (returned as 3-channel for consistency)."""
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    return cv2.cvtColor(gray, cv2.COLOR_GRAY2BGR)


def resize(img, scale=0.5):
    """Resize image by a given scale factor."""
    h, w = img.shape[:2]
    new_w, new_h = int(w * scale), int(h * scale)
    return cv2.resize(img, (new_w, new_h), interpolation=cv2.INTER_LINEAR)


def gaussian_blur(img, ksize=15):
    """Apply Gaussian blur."""
    return cv2.GaussianBlur(img, (ksize, ksize), 0)


def edge_detection(img):
    """Canny edge detection (returned as 3-channel)."""
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 100, 200)
    return cv2.cvtColor(edges, cv2.COLOR_GRAY2BGR)


def histogram_equalization(img):
    """Equalize histogram on each channel independently."""
    channels = cv2.split(img)
    eq_channels = [cv2.equalizeHist(ch) for ch in channels]
    return cv2.merge(eq_channels)


def sharpen(img):
    """Sharpen image using a convolution kernel."""
    kernel = np.array([
        [0, -1, 0],
        [-1, 5, -1],
        [0, -1, 0]
    ], dtype=np.float32)
    return cv2.filter2D(img, -1, kernel)


def threshold(img, thresh_val=127):
    """Binary threshold (returned as 3-channel)."""
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, result = cv2.threshold(gray, thresh_val, 255, cv2.THRESH_BINARY)
    return cv2.cvtColor(result, cv2.COLOR_GRAY2BGR)


def morphological(img, operation="erosion", ksize=5):
    """
    Morphological operation.
    operation: 'erosion', 'dilation', 'opening', 'closing'
    """
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (ksize, ksize))
    ops = {
        "erosion": lambda: cv2.erode(img, kernel, iterations=1),
        "dilation": lambda: cv2.dilate(img, kernel, iterations=1),
        "opening": lambda: cv2.morphologyEx(img, cv2.MORPH_OPEN, kernel),
        "closing": lambda: cv2.morphologyEx(img, cv2.MORPH_CLOSE, kernel),
    }
    fn = ops.get(operation)
    if fn is None:
        raise ValueError(f"Unknown morphological operation: {operation}")
    return fn()


# ---------------------------------------------------------------------------
# AI Features (CPU fallback implementations)
# ---------------------------------------------------------------------------

def background_removal(img):
    """
    Remove background using rembg (runs on CPU by default).
    Returns BGRA image converted back to BGR with white background.
    """
    from rembg import remove
    from PIL import Image
    import io

    # Convert BGR numpy -> PIL RGB
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    pil_img = Image.fromarray(rgb)

    # Run removal
    buf = io.BytesIO()
    pil_img.save(buf, format="PNG")
    buf.seek(0)
    result_bytes = remove(buf.read())

    # Convert back
    result_pil = Image.open(io.BytesIO(result_bytes)).convert("RGBA")
    # Composite onto white background
    bg = Image.new("RGBA", result_pil.size, (255, 255, 255, 255))
    composited = Image.alpha_composite(bg, result_pil).convert("RGB")
    return cv2.cvtColor(np.array(composited), cv2.COLOR_RGB2BGR)


def super_resolution(img):
    """
    Upscale image 4x using simple bicubic interpolation (CPU fallback).
    Real-ESRGAN GPU version is in the GPU module.
    """
    # Anti-OOM Safety Cap: 4x of 8K is 32K, which crashes encoding and takes >15s!
    # Cap input to max ~1920x1080 before upscaling
    max_pixels = 1920 * 1080
    h, w = img.shape[:2]
    if h * w > max_pixels:
        scale = (max_pixels / (h * w)) ** 0.5
        img = cv2.resize(img, (int(w * scale), int(h * scale)), interpolation=cv2.INTER_AREA)
        h, w = img.shape[:2]

    return cv2.resize(img, (w * 4, h * 4), interpolation=cv2.INTER_CUBIC)


def style_transfer(img):
    """
    Neural style transfer using PyTorch pretrained model (CPU).
    Uses a fast neural style from torchvision.
    """
    import torch
    from torchvision import transforms

    device = torch.device("cpu")

    # Load a pretrained style transfer model (mosaic style)
    try:
        model = torch.hub.load(
            "pytorch/examples",
            "fast_neural_style",
            model="mosaic",
            verbose=False,
        )
    except Exception:
        # Fallback: apply a stylised colour transform if model unavailable
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        hsv[:, :, 0] = (hsv[:, :, 0].astype(int) + 30) % 180
        hsv[:, :, 1] = np.clip(hsv[:, :, 1].astype(int) + 40, 0, 255).astype(np.uint8)
        return cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)

    model = model.to(device).eval()

    preprocess = transforms.Compose([
        transforms.ToTensor(),
        transforms.Lambda(lambda x: x.mul(255)),
    ])
    postprocess = transforms.Compose([
        transforms.Lambda(lambda x: x.clone().clamp(0, 255).div(255)),
        transforms.ToPILImage(),
    ])

    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    from PIL import Image
    pil_img = Image.fromarray(rgb)
    input_tensor = preprocess(pil_img).unsqueeze(0).to(device)

    with torch.no_grad():
        output = model(input_tensor).squeeze(0)

    result_pil = postprocess(output)
    return cv2.cvtColor(np.array(result_pil), cv2.COLOR_RGB2BGR)


# Registry mapping operation names -> functions
OPERATIONS = {
    "grayscale": grayscale,
    "resize": resize,
    "gaussian_blur": gaussian_blur,
    "edge_detection": edge_detection,
    "histogram_equalization": histogram_equalization,
    "sharpen": sharpen,
    "threshold": threshold,
    "morphological_erosion": lambda img: morphological(img, "erosion"),
    "morphological_dilation": lambda img: morphological(img, "dilation"),
    "morphological_opening": lambda img: morphological(img, "opening"),
    "morphological_closing": lambda img: morphological(img, "closing"),
    "background_removal": background_removal,
    "super_resolution": super_resolution,
    "style_transfer": style_transfer,
}
