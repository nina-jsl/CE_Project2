// app/api/sentiment.ts
import { NextApiRequest, NextApiResponse } from 'next';
import * as vader from 'vader-sentiment';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const sentiment = vader.SentimentIntensityAnalyzer.polarity_scores(text);
    return res.status(200).json(sentiment);
  }
  return res.status(405).json({ error: 'Method not allowed' });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function analyzeSentiment(text: string) {
    const response = await fetch('/api/sentiment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    return response.json();
  }
  