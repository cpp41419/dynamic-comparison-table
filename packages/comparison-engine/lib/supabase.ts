import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type EnquiryData = {
  id?: string
  name: string
  email: string
  phone?: string
  message?: string
  course_name: string
  provider_id: string
  state: string
  created_at?: string
}
