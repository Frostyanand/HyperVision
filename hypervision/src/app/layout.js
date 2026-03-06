import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "HyperVision — Premium AI Image processing",
  description:
    "High-performance GPU-accelerated image processing platform demonstrating CUDA acceleration vs CPU computing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
