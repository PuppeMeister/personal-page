export interface Article {
  title: string;
  link: string;
  pubDate: string; // ISO 8601
  thumbnail: string | null;
  snippet: string;
  categories: string[];
}
