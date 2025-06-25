'use client';

import { useCallback, useState } from 'react';

type Props = {
  onImageUpload: (url: string) => void;
};

export default function Dropzone({ onImageUpload }: Props) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data.url) {
      onImageUpload(data.url);
    }
  }, [onImageUpload]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data.url) {
      onImageUpload(data.url);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded p-6 w-full max-w-md text-center cursor-pointer ${
        isDragging ? 'bg-gray-200' : ''
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <p>Drag & drop an image here, or click to select</p>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mt-2"
      />
    </div>
  );
}
