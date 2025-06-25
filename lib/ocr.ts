import Tesseract from 'tesseract.js';

export async function extractTextFromImage(imageUrl: string): Promise<string> {
  try {
    const result = await Tesseract.recognize(imageUrl, 'eng', {
      logger: (m) => console.log(m),
    });

    return result.data.text;
  } catch (error) {
    console.error('OCR failed:', error);
    return '';
  }
}
