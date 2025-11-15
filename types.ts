
export enum Tone {
  PROFESSIONAL = 'Professional',
  WITTY = 'Witty',
  URGENT = 'Urgent',
}

export type Platform = 'LinkedIn' | 'Twitter' | 'Instagram';

export type AspectRatio = '1:1' | '4:3' | '16:9';

export interface SocialPost {
  platform: Platform;
  content: string;
  imageUrl: string;
}
