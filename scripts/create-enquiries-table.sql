-- Create enquiries table in Supabase
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  message TEXT,
  course_name VARCHAR(255) NOT NULL,
  provider_id VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_state ON enquiries(state);
CREATE INDEX IF NOT EXISTS idx_enquiries_provider ON enquiries(provider_id);

-- Enable Row Level Security (optional)
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (adjust as needed for your security requirements)
CREATE POLICY "Allow enquiry inserts" ON enquiries
  FOR INSERT WITH CHECK (true);

-- Create policy to allow reads (adjust as needed)
CREATE POLICY "Allow enquiry reads" ON enquiries
  FOR SELECT USING (true);
