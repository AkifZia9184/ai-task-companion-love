
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { TaskStatus } from '@/types';

interface TaskFilterProps {
  onFilterChange: (filter: { status: string; search: string }) => void;
}

export default function TaskFilter({ onFilterChange }: TaskFilterProps) {
  const [status, setStatus] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const handleStatusChange = (value: string) => {
    setStatus(value);
    onFilterChange({ status: value, search });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onFilterChange({ status, search: e.target.value });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          value={search}
          onChange={handleSearchChange}
          className="pl-9"
        />
      </div>
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Label htmlFor="status-filter" className="sr-only">Filter by status</Label>
        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger id="status-filter" className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="done">Done</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
