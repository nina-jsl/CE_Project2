declare module 'vader-sentiment' {
    export const SentimentIntensityAnalyzer: {
      polarity_scores: (text: string) => { [key: string]: number };
    };
  }
  