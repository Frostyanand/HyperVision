"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function ImageUploader({ onImageSelect }) {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;
      setPreview(URL.createObjectURL(file));
      onImageSelect(file);
    },
    [onImageSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".bmp", ".tiff", ".webp"] },
    multiple: false,
    maxSize: 50 * 1024 * 1024,
  });

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? "active" : ""}`}
    >
      <input {...getInputProps()} />
      {preview ? (
        <div>
          <img
            src={preview}
            alt="Preview"
            style={{
              maxHeight: 180,
              borderRadius: 10,
              objectFit: "contain",
              margin: "0 auto",
              display: "block",
            }}
          />
          <p style={{ marginTop: 10, fontSize: 13, color: "#64748b" }}>
            Click or drag to replace
          </p>
        </div>
      ) : (
        <div>
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#84A5F2"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ margin: "0 auto 14px" }}
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <p style={{ fontSize: 15, fontWeight: 600, color: "#0f172a" }}>
            {isDragActive
              ? "Drop your image here..."
              : "Drag & drop an image, or click to browse"}
          </p>
          <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 6 }}>
            Supports PNG, JPG, BMP, TIFF, WebP — up to 50 MB
          </p>
        </div>
      )}
    </div>
  );
}
