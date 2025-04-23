
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MotivationalQuote as QuoteType } from '@/types';

export default function MotivationalQuote() {
  const [quote, setQuote] = useState<QuoteType>({
    quote: "Loading your daily motivation...",
    author: ""
  });

  useEffect(() => {
    // In a real app, this would come from an API or the AI
    const quotes = [
      { quote: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
      { quote: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
      { quote: "It always seems impossible until it's done.", author: "Nelson Mandela" },
      { quote: "Done is better than perfect.", author: "Sheryl Sandberg" },
      { quote: "The best way to predict the future is to create it.", author: "Abraham Lincoln" },
      { quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
      { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
      { quote: "Productivity is being able to do things that you were never able to do before.", author: "Franz Kafka" }
    ];
    
    // Get a random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardDescription>AI DAILY MOTIVATION</CardDescription>
        <CardTitle className="text-lg">Today's Focus</CardTitle>
      </CardHeader>
      <CardContent>
        <blockquote className="italic text-lg">{quote.quote}</blockquote>
        {quote.author && (
          <p className="text-right mt-2 text-sm text-muted-foreground">— {quote.author}</p>
        )}
      </CardContent>
    </Card>
  );
}
