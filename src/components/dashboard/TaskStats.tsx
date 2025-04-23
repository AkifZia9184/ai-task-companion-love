
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Task } from '@/types';

interface TaskStatsProps {
  tasks: Task[];
}

export default function TaskStats({ tasks }: TaskStatsProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'done').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  
  const completionPercentage = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  const dueSoonCount = tasks.filter(task => {
    if (!task.due_date || task.status === 'done') return false;
    const dueDate = new Date(task.due_date);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  }).length;

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Tasks Completed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline">
            <div className="text-2xl font-bold">{completedTasks}</div>
            <div className="ml-2 text-xs text-muted-foreground">
              / {totalTasks}
            </div>
            <div className="ml-auto text-sm font-medium text-primary">
              {completionPercentage}%
            </div>
          </div>
          <div className="mt-3 h-1.5 w-full bg-secondary">
            <div 
              className="h-1.5 bg-primary" 
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Pending Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingTasks}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            In Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inProgressTasks}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Due Soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{dueSoonCount}</div>
          <div className="text-xs text-muted-foreground">In the next 3 days</div>
        </CardContent>
      </Card>
    </div>
  );
}
