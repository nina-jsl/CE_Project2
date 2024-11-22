// lib/sentimentAnalyzer.ts
import * as vader from "vader-sentiment";

type SentimentScores = {
  neg: number;
  neu: number;
  pos: number;
  compound: number;
};

export const analyzeSentiment = (text: string): { sentiment: string; scores: SentimentScores } => {
  const scores = vader.SentimentIntensityAnalyzer.polarity_scores(text);

  let sentiment = "Neutral";
  if (scores.compound >= 0.05) {
    sentiment = "Positive";
  } else if (scores.compound <= -0.05) {
    sentiment = "Negative";
  }

  return { sentiment, scores };
};
