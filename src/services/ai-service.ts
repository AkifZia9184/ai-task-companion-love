
// This is a mock AI service - In a production app, connect to OpenAI or Gemini
export const analyzeTask = async (title: string, description?: string): Promise<{ urgency: 'low' | 'medium' | 'high' }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simple keyword-based urgency detection
  const text = `${title} ${description || ''}`.toLowerCase();
  
  // Check for urgency keywords
  const highUrgencyKeywords = ['urgent', 'asap', 'immediately', 'deadline', 'tomorrow', 'today', 'by friday', 'by monday', 'emergency'];
  const mediumUrgencyKeywords = ['soon', 'next week', 'important', 'priority', 'needed', 'required'];
  
  for (const keyword of highUrgencyKeywords) {
    if (text.includes(keyword)) {
      return { urgency: 'high' };
    }
  }
  
  for (const keyword of mediumUrgencyKeywords) {
    if (text.includes(keyword)) {
      return { urgency: 'medium' };
    }
  }
  
  return { urgency: 'low' };
};

export const generateTaskSuggestion = async (partialTitle?: string): Promise<string> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real app, we'd send this to an AI model
  const suggestions = [
    "Schedule team meeting for project review",
    "Update resume with recent accomplishments",
    "Prepare financial report for Q2",
    "Research new productivity tools",
    "Call dentist to schedule appointment",
    "Fix bugs in the authentication system",
    "Review marketing strategy for next quarter",
    "Buy groceries for the week",
    "Complete performance reviews for team members",
    "Pay monthly bills and review budget",
  ];
  
  if (!partialTitle) {
    return suggestions[Math.floor(Math.random() * suggestions.length)];
  }
  
  // Simple "AI" that filters suggestions based on partial input
  const matchingSuggestions = suggestions.filter(
    suggestion => suggestion.toLowerCase().includes(partialTitle.toLowerCase())
  );
  
  if (matchingSuggestions.length > 0) {
    return matchingSuggestions[Math.floor(Math.random() * matchingSuggestions.length)];
  } else {
    return suggestions[Math.floor(Math.random() * suggestions.length)];
  }
};
