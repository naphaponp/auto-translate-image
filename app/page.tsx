'use client';

import { useState } from 'react';
import Dropzone from '@/components/Dropzone';

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <main className="min-h-screen p-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Auto Translate Image</h1>
      <Dropzone onImageUpload={(url) => setImageUrl(url)} />
      {imageUrl && (
        <div className="mt-4">
          <p className="mb-2">Uploaded Image:</p>
          <img src={imageUrl} alt="Uploaded" className="max-w-md rounded shadow" />
        </div>
      )}
    </main>
  );
}
