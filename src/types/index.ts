
export type TaskStatus = 'pending' | 'in-progress' | 'done';
export type TaskUrgency = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  urgency?: TaskUrgency;
  created_at: string;
  due_date?: string;
}

export interface MotivationalQuote {
  quote: string;
  author: string;
}
