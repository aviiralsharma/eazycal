import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://dxadodowiauchchxzlde.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4YWRvZG93aWF1Y2hjaHh6bGRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzMTU1OTcsImV4cCI6MjA2MTg5MTU5N30.7g9Os16THWQZey6vzTW9fXmmi4dQukZWtgkItUwDRnM'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 