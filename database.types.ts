/**
 * PostgreSQL / Supabase Database Type Definitions
 *
 * This file maps the relational schema planned for the Supabase backend:
 * - profiles (users & enterprise representatives)
 * - companies (registered enterprise accounts)
 * - ideas (consumer submissions)
 * - idea_votes (upvotes & engagement)
 * - comments (community and company discussion)
 * - company_shortlists (enterprise innovation pipeline)
 * - tags & categories
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string;
          username: string;
          role: 'consumer' | 'company' | 'admin';
          avatar_url: string | null;
          bio: string | null;
          reputation_score: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      companies: {
        Row: {
          id: string;
          name: string;
          slug: string;
          logo_url: string | null;
          industry: string;
          description: string;
          is_verified: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['companies']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['companies']['Insert']>;
      };
      ideas: {
        Row: {
          id: string;
          title: string;
          tagline: string;
          problem_statement: string;
          proposed_solution: string;
          target_audience: string;
          key_benefits: string[];
          category: string;
          target_company_id: string | null;
          author_id: string;
          status: 'submitted' | 'under_review' | 'shortlisted' | 'in_development' | 'launched' | 'archived';
          upvotes_count: number;
          comments_count: number;
          views_count: number;
          market_potential_score: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['ideas']['Row'], 'id' | 'created_at' | 'updated_at' | 'upvotes_count' | 'comments_count' | 'views_count'>;
        Update: Partial<Database['public']['Tables']['ideas']['Insert']>;
      };
      idea_votes: {
        Row: {
          id: string;
          idea_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['idea_votes']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['idea_votes']['Insert']>;
      };
      comments: {
        Row: {
          id: string;
          idea_id: string;
          author_id: string;
          content: string;
          is_company_feedback: boolean;
          upvotes_count: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['comments']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['comments']['Insert']>;
      };
      company_shortlists: {
        Row: {
          id: string;
          company_id: string;
          idea_id: string;
          stage: 'discovered' | 'shortlisted' | 'in_review' | 'partnering';
          notes: string | null;
          priority: 'low' | 'medium' | 'high';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['company_shortlists']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['company_shortlists']['Insert']>;
      };
    };
  };
}
