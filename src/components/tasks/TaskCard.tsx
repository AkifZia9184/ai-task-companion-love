
import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, Trash, Edit, Check, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Task } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
}

export default function TaskCard({ task, onDelete, onEdit, onStatusChange }: TaskCardProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();
  
  const handleStatusChange = (newStatus: Task['status']) => {
    onStatusChange(task.id, newStatus);
    
    if (newStatus === 'done' && task.status !== 'done') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      
      toast({
        title: "Task completed! 🎉",
        description: "Great job on finishing this task!",
      });
    }
  };

  const getStatusBadgeClass = () => {
    switch (task.status) {
      case 'pending': return 'status-badge-pending';
      case 'in-progress': return 'status-badge-in-progress';
      case 'done': return 'status-badge-done';
    }
  };

  const getNextStatus = () => {
    switch (task.status) {
      case 'pending': return 'in-progress';
      case 'in-progress': return 'done';
      case 'done': return 'pending';
    }
  };

  const getNextStatusIcon = () => {
    switch (task.status) {
      case 'pending': return <ArrowRight className="h-4 w-4" />;
      case 'in-progress': return <Check className="h-4 w-4" />;
      case 'done': return <ArrowRight className="h-4 w-4" />;
    }
  };

  const renderConfetti = () => {
    if (!showConfetti) return null;
    
    const confetti = [];
    const colors = ['#9b87f5', '#F97316', '#10B981', '#F43F5E', '#0EA5E9'];
    
    for (let i = 0; i < 30; i++) {
      const left = Math.random() * 100;
      const animationDelay = Math.random() * 0.5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      confetti.push(
        <div
          key={i}
          className="confetti"
          style={{
            left: `${left}%`,
            backgroundColor: color,
            animationDelay: `${animationDelay}s`,
            top: '50%'
          }}
        />
      );
    }
    
    return confetti;
  };

  return (
    <Card className="task-card relative">
      {renderConfetti()}
      <CardHeader className="pb-2 pt-4 px-4 flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1">
          <span className={getStatusBadgeClass()}>
            {task.status.replace('-', ' ')}
          </span>
          {task.urgency && (
            <span className={`ml-2 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-full text-xs font-medium`}>
              {task.urgency} urgency
            </span>
          )}
        </div>
        <div className="flex space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onEdit(task)}
            aria-label="Edit task"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onDelete(task.id)}
            aria-label="Delete task"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-4 pt-0 pb-2">
        <h3 className="font-medium text-lg">{task.title}</h3>
        {task.description && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{task.description}</p>
        )}
      </CardContent>
      <CardFooter className="px-4 py-3 border-t flex items-center justify-between">
        <div className="text-xs text-muted-foreground flex items-center">
          {task.due_date && (
            <>
              <Calendar className="h-3.5 w-3.5 mr-1" />
              <span>{format(new Date(task.due_date), 'MMM d, yyyy')}</span>
            </>
          )}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs h-7"
          onClick={() => handleStatusChange(getNextStatus())}
        >
          Move to {getNextStatus().replace('-', ' ')} {getNextStatusIcon()}
        </Button>
      </CardFooter>
    </Card>
  );
}
