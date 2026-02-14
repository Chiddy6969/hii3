export interface PhotoItem {
  id: number;
  row: number;
  col: number;
  type: 'photo' | 'video';
  url: string;
  thumbnail?: string; // Optional: used for video cover images
  isRevealed: boolean;
}

export type AppStage = 'album' | 'letter';

export enum AnimationState {
  HIDDEN = 'hidden',
  VISIBLE = 'visible',
  EXIT = 'exit'
}