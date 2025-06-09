import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cqciddaylexiarzxmxnj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxY2lkZGF5bGV4aWFyenhteG5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzMjE4NzgsImV4cCI6MjA2NDg5Nzg3OH0.2XgJiUL8PtLmhcyJeHLKlvXL-ULIygHhZHcPiLwdxbc'

export const supabase = createClient(supabaseUrl, supabaseKey)
