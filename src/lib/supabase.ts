import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fxiavcweeykbzielebqj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4aWF2Y3dlZXlrYnppZWxlYnFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MzQ2NTQsImV4cCI6MjA2MTAxMDY1NH0.tvcz3pZgnyTo7URb4Ccj0ybCBaB-Plgun43JeuMidY8';

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * SQL Schema for Supabase:
 * 
 * -- Create the tasks table
 * CREATE TABLE public.tasks (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   user_id UUID REFERENCES auth.users(id) NOT NULL,
 *   title TEXT NOT NULL,
 *   description TEXT,
 *   status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'done')),
 *   urgency TEXT CHECK (urgency IN ('low', 'medium', 'high')),
 *   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 *   due_date TIMESTAMPTZ
 * );
 * 
 * -- Set up Row Level Security
 * ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
 * 
 * -- Create policy to ensure users can only access their own tasks
 * CREATE POLICY "Users can only access their own tasks" 
 * ON public.tasks 
 * USING (auth.uid() = user_id);
 * 
 * -- Allow logged in users to insert their own tasks
 * CREATE POLICY "Users can insert their own tasks" 
 * ON public.tasks 
 * FOR INSERT 
 * WITH CHECK (auth.uid() = user_id);
 * 
 * -- Allow users to update their own tasks
 * CREATE POLICY "Users can update their own tasks" 
 * ON public.tasks 
 * FOR UPDATE 
 * USING (auth.uid() = user_id);
 * 
 * -- Allow users to delete their own tasks
 * CREATE POLICY "Users can delete their own tasks" 
 * ON public.tasks 
 * FOR DELETE 
 * USING (auth.uid() = user_id);
 */
