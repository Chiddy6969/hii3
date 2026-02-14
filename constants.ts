import { PhotoItem } from './types';

// Grid configuration for a 7x6 heart shape
// 1 = Photo, 0 = Empty space
const HEART_GRID = [
  [0, 1, 1, 0, 1, 1, 0], // Row 0
  [1, 1, 1, 1, 1, 1, 1], // Row 1
  [1, 1, 1, 1, 1, 1, 1], // Row 2
  [0, 1, 1, 1, 1, 1, 0], // Row 3
  [0, 0, 1, 1, 1, 0, 0], // Row 4
  [0, 0, 0, 1, 0, 0, 0], // Row 5
];

export const TOTAL_PHOTOS = 27;

// *** HOW TO ADD OR REMOVE VIDEOS ***
// 1. To ADD a video: Add the tile ID (1-27) to the array below.
// 2. To REMOVE a video: Delete the ID from the array below.
const VIDEO_IDS = [11, 15, 17, 19, 23, 22, 24, 25]; 

export const INITIAL_PHOTOS: PhotoItem[] = [];

// Get the base URL from Vite (will be './' in production)
const BASE = import.meta.env.BASE_URL;

let idCounter = 1;
HEART_GRID.forEach((row, rowIndex) => {
  row.forEach((cell, colIndex) => {
    if (cell === 1) {
      const isVideo = VIDEO_IDS.includes(idCounter);
      
      // Construct paths using the BASE url to ensure they work on GitHub Pages
      // We strip the leading slash from 'photos/...' because BASE usually handles the prefix.
      // If BASE is './', result is './photos/1.jpeg'
      const photoPath = `${BASE}photos/${idCounter}.jpeg`;
      const videoPath = `${BASE}videos/${idCounter}.mp4`;

      INITIAL_PHOTOS.push({
        id: idCounter,
        row: rowIndex,
        col: colIndex,
        type: isVideo ? 'video' : 'photo',
        
        url: isVideo ? videoPath : photoPath,
        thumbnail: isVideo ? photoPath : undefined,

        isRevealed: false,
      });
      idCounter++;
    }
  });
});