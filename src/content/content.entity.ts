export class Content {
  id: string;
  title: string;
  description: string;
  body: string;
  category: string;
  language: string;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  status: 'draft' | 'published' | 'archived';
  author_id: string;
  meta_data?: Record<string, any>;
}
