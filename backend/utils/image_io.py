import os
import uuid
import cv2
import numpy as np
from pathlib import Path

UPLOAD_DIR = Path(__file__).resolve().parent.parent / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


def save_upload(file_bytes, original_filename):
    """
    Save raw uploaded bytes to disk.
    Returns the absolute path to the saved file.
    """
    ext = os.path.splitext(original_filename)[1] or ".png"
    filename = f"{uuid.uuid4().hex}{ext}"
    filepath = UPLOAD_DIR / filename
    filepath.write_bytes(file_bytes)
    return str(filepath)


def load_image(filepath):
    """
    Load an image from disk as a BGR numpy array (OpenCV format).
    """
    img = cv2.imread(filepath, cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError(f"Could not read image: {filepath}")
    return img


def save_result(image_array, prefix="result"):
    """
    Save a processed numpy image to the uploads folder as JPG.
    Returns the filename (not the full path).
    """
    filename = f"{prefix}_{uuid.uuid4().hex}.jpg"
    filepath = UPLOAD_DIR / filename
    cv2.imwrite(str(filepath), image_array, [int(cv2.IMWRITE_JPEG_QUALITY), 85])
    return filename


def get_resolution(image_array):
    """
    Return a 'WxH' resolution string for the image.
    """
    h, w = image_array.shape[:2]
    return f"{w}x{h}"
