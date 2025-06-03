-- Create workflows table
CREATE TABLE workflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'idle',
  target_website TEXT,
  search_criteria TEXT,
  last_run TIMESTAMP WITH TIME ZONE,
  apify_task_id TEXT,
  n8n_workflow_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see only their workflows
CREATE POLICY "Users can view their own workflows"
  ON workflows
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy to allow users to create their own workflows
CREATE POLICY "Users can create their own workflows"
  ON workflows
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own workflows
CREATE POLICY "Users can update their own workflows"
  ON workflows
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own workflows
CREATE POLICY "Users can delete their own workflows"
  ON workflows
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_workflows_updated_at
  BEFORE UPDATE ON workflows
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 