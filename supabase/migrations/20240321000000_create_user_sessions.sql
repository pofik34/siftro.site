-- Create user_sessions table
CREATE TABLE user_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  ip TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see only their own sessions
CREATE POLICY "Users can view their own sessions"
  ON user_sessions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy to allow users to create their own sessions
CREATE POLICY "Users can create their own sessions"
  ON user_sessions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own sessions
CREATE POLICY "Users can update their own sessions"
  ON user_sessions
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own sessions
CREATE POLICY "Users can delete their own sessions"
  ON user_sessions
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX user_sessions_user_id_idx ON user_sessions(user_id);
CREATE INDEX user_sessions_ip_idx ON user_sessions(ip);
CREATE INDEX user_sessions_expires_at_idx ON user_sessions(expires_at); 