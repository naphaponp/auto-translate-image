'use client';

import { useState } from 'react';
import Dropzone from '@/components/Dropzone';

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!imageUrl) return;
    setLoading(true);
    setTranslatedText(null);

    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl }),
      });
      const data = await res.json();
      setTranslatedText(data.translated || 'No translation found');
    } catch (error) {
      setTranslatedText('Error translating');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Auto Translate Image</h1>

      <Dropzone onImageUpload={(url) => {
        setImageUrl(url);
        setTranslatedText(null);
      }} />

      {imageUrl && (
        <>
          <div className="mt-4">
            <p className="mb-2">Uploaded Image:</p>
            <img src={imageUrl} alt="Uploaded" className="max-w-md rounded shadow" />
          </div>

          <button
            onClick={handleTranslate}
            disabled={loading}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Translating...' : 'Translate to Thai'}
          </button>
        </>
      )}

      {translatedText && (
        <div className="mt-4 max-w-md p-4 border rounded bg-gray-100 whitespace-pre-wrap">
          <h2 className="font-semibold mb-2">Translated Text:</h2>
          <p>{translatedText}</p>
        </div>
      )}
    </main>
  );
}
