import { createClient } from "@supabase/supabase-js";

// Verificar que las variables de entorno existan en tiempo de compilación
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL no está definida en las variables de entorno");
}

if (!supabaseAnonKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY no está definida en las variables de entorno");
}

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Tipos basados en el schema de drizzle
export type User = {
  id: string;
  email: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  banner_url: string | null;
  bio: string;
  role: "user" | "admin";
  reputation: number;
  created_at: string;
  updated_at: string;
};

export type News = {
  id: string;
  title: string;
  excerpt: string | null;
  body: string;
  cover_image: string | null;
  category: string;
  author_id: string;
  status: "draft" | "published" | "archived" | "flagged";
  tags: string[];
  view_count: number;
  like_count: number;
  is_featured: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ForumSection = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parent_id: string | null;
  icon: string | null;
  color: string | null;
  sort_order: number;
  created_at: string;
};

export type ForumThread = {
  id: string;
  title: string;
  slug: string;
  body: string;
  author_id: string;
  section_id: string;
  status: "draft" | "published" | "archived" | "flagged";
  view_count: number;
  reply_count: number;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parent_id: string | null;
  icon: string | null;
  color: string | null;
  sort_order: number;
  created_at: string;
};

export type Game = {
  id: string;
  title: string;
  description: string | null;
  cover_image_url: string | null;
  trailer_url: string | null;
  genre: string | null;
  platform: string | null;
  release_year: number | null;
  created_at: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  thumbnail_url: string | null;
  user_id: string;
  category: "landscape" | "city" | "food" | "festival" | "tourism" | "illustration" | "other";
  media_type: "image" | "video" | "embed";
  tags: string[];
  is_ai_generated: boolean;
  status: "draft" | "published" | "archived" | "flagged";
  view_count: number;
  like_count: number;
  created_at: string;
};

export type Favorite = {
  id: string;
  user_id: string;
  target_type: "anime" | "article" | "gallery" | "thread";
  target_id: string;
  created_at: string;
};