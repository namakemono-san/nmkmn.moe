export interface PostMeta {
  title: string;
  date: string;
  slug: string;
  tags: string[];
  excerpt: string;
}

export interface Post extends PostMeta {
  content: string;
}
