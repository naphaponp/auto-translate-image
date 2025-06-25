import axios from 'axios';

export async function translateToThai(text: string): Promise<string> {
  try {
    const response = await axios.post(
      'https://libretranslate.de/translate',
      {
        q: text,
        source: 'en',
        target: 'th',
        format: 'text',
      },
      {
        headers: { accept: 'application/json' },
      }
    );

    return response.data.translatedText;
  } catch (error) {
    console.error('Translation failed:', error);
    return '';
  }
}
