'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  imageUrl: string;
  text: string;
};

export default function ImageWithOverlay({ imageUrl, text }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      ctx.font = '24px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;

      const x = 20;
      const y = img.height - 40;

      ctx.strokeText(text, x, y);
      ctx.fillText(text, x, y);

      setCanvasReady(true);
    };
  }, [imageUrl, text]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'translated-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <>
      <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto' }} />
      {canvasReady && (
        <button
          onClick={handleDownload}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Download Image
        </button>
      )}
    </>
  );
}
