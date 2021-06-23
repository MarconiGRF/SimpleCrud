/**
 * Describes a Warn object.
 */
export interface Warn {
  id: string;
  title: string;
  description: string;
  publishedAt: number;
  viewedAt?: number;
}
