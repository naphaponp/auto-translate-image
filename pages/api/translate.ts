import type { NextApiRequest, NextApiResponse } from 'next';
import { extractTextFromImage } from '@/lib/ocr';
import { translateToThai } from '@/lib/translate';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ error: 'Missing imageUrl' });
  }

  try {
    const text = await extractTextFromImage(imageUrl);
    const translated = await translateToThai(text);

    return res.status(200).json({ text, translated });
  } catch (error) {
    console.error('Processing failed:', error);
    return res.status(500).json({ error: 'Translation failed' });
  }
}
