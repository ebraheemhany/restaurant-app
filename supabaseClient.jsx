


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://utrrwssstxwzquqnovgj.supabase.co'  
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0cnJ3c3NzdHh3enF1cW5vdmdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NDkxNTEsImV4cCI6MjA3MTEyNTE1MX0.svgq39cA_Xuyg0KpYItMZ2RumybpgCYbEVyslv20N4A"  

export const supabase = createClient(supabaseUrl, supabaseKey)

