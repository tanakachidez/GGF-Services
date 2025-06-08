-- Drop the existing table if it exists
DROP TABLE IF EXISTS users;

-- Create users table for storing contact form submissions
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    responded BOOLEAN DEFAULT FALSE,
    response_sent_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance (removed unique constraint on email)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);
CREATE INDEX IF NOT EXISTS idx_users_responded ON users(responded);

-- Enable Row Level Security (optional, for better security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (you can make this more restrictive)
CREATE POLICY "Allow all operations on users" ON users FOR ALL USING (true);
