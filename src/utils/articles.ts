import { Article } from '../types/article';
import config from '../config/medium.json';

/**
 * Runtime freshness layer for the Articles section.
 *
 * The primary data source is src/data/articles.json, generated at build time
 * by scripts/fetch-articles.js. Medium's RSS endpoint blocks browser CORS
 * requests, so the runtime refresh goes through rss2json.com, which converts
 * the feed to JSON and adds CORS headers. If this call fails (rate limit,
 * service down), callers should silently keep the build-time data.
 */

const RSS2JSON_ENDPOINT = 'https://api.rss2json.com/v1/api.json';
const FEED_URL = `https://medium.com/feed/@${config.username}`;

interface Rss2JsonItem {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  description: string;
  content: string;
  categories: string[];
}

function stripHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return (doc.body.textContent || '').replace(/\s+/g, ' ').trim();
}

function toSnippet(html: string, maxLength = 200): string {
  const text = stripHtml(html);
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).replace(/\s+\S*$/, '')}…`;
}

function extractThumbnail(item: Rss2JsonItem): string | null {
  if (item.thumbnail && !item.thumbnail.includes('medium.com/_/stat')) {
    return item.thumbnail;
  }
  const imgMatch = (item.content || '').match(/<img[^>]+src="([^"]+)"/);
  if (imgMatch && !imgMatch[1].includes('medium.com/_/stat')) {
    return imgMatch[1];
  }
  return null;
}

export async function fetchLatestArticles(): Promise<Article[]> {
  const url = `${RSS2JSON_ENDPOINT}?rss_url=${encodeURIComponent(FEED_URL)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`rss2json responded with HTTP ${res.status}`);
  }
  const data = await res.json();
  if (data.status !== 'ok' || !Array.isArray(data.items)) {
    throw new Error('rss2json returned an unexpected payload');
  }
  return (data.items as Rss2JsonItem[]).slice(0, config.maxArticles).map((item) => ({
    title: item.title,
    link: item.link.split('?')[0],
    pubDate: new Date(item.pubDate).toISOString(),
    thumbnail: extractThumbnail(item),
    snippet: toSnippet(item.content || item.description || ''),
    categories: item.categories || [],
  }));
}
