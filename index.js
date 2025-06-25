
import { useState } from 'react';
import Tesseract from 'tesseract.js';

export default function Home() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageChange = (e) => {
    setText('');
    setProgress(0);
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleOCR = () => {
    if (!image) return;
    setIsProcessing(true);
    Tesseract.recognize(image, 'eng', {
      logger: (m) => {
        if (m.status === 'recognizing text') {
          setProgress(parseInt(m.progress * 100));
        }
      },
    })
      .then(({ data: { text } }) => {
        setText(text);
        setIsProcessing(false);
      })
      .catch(() => {
        setText('Error during OCR');
        setIsProcessing(false);
      });
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Manga Translation Demo</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && (
        <div style={{ marginTop: 20 }}>
          <img src={image} alt="upload" style={{ maxWidth: '100%' }} />
          <button onClick={handleOCR} disabled={isProcessing} style={{ marginTop: 10 }}>
            {isProcessing ? `Processing... ${progress}%` : 'Run OCR'}
          </button>
        </div>
      )}
      {text && (
        <pre style={{ whiteSpace: 'pre-wrap', marginTop: 20, backgroundColor: '#f0f0f0', padding: 10 }}>
          {text}
        </pre>
      )}
    </div>
  );
}
