import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface LoanApplication {
  id: string;
  user_id: string;
  status: 'submitted' | 'verified' | 'assessment' | 'underwriting' | 'disbursed';
  loan_amount: number;
  interest_rate: number;
  tenure_months: number;
  created_at: string;
  updated_at: string;
}
