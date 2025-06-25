'use client';

import { useEffect, useRef } from 'react';

type Props = {
  imageUrl: string;
  text: string;
};

export default function ImageWithOverlay({ imageUrl, text }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous'; // Important for cross-origin images
    img.src = imageUrl;

    img.onload = () => {
      // Set canvas size same as image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image
      ctx.drawImage(img, 0, 0);

      // Overlay text - you can customize font, color, position
      ctx.font = '24px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;

      // Position example (bottom-left corner)
      const x = 20;
      const y = img.height - 40;

      // Draw stroke for readability
      ctx.strokeText(text, x, y);
      ctx.fillText(text, x, y);
    };
  }, [imageUrl, text]);

  return <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto' }} />;
}
