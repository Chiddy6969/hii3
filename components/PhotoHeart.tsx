import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { PhotoItem } from '../types';
import { INITIAL_PHOTOS } from '../constants';

interface PhotoHeartProps {
  onComplete: () => void;
}

const PhotoHeart: React.FC<PhotoHeartProps> = ({ onComplete }) => {
  const [photos, setPhotos] = useState<PhotoItem[]>(INITIAL_PHOTOS);
  const [revealedCount, setRevealedCount] = useState(0);
  const [expandedPhoto, setExpandedPhoto] = useState<PhotoItem | null>(null);
  const [caption, setCaption] = useState<string>('');

  // Fetch caption when a photo is expanded
  useEffect(() => {
    if (expandedPhoto) {
      setCaption(''); // Reset caption while loading
      // Try to fetch the specific text file for this photo from public/captions/X.txt
      fetch(`./captions/${expandedPhoto.id}.txt`)
        .then(response => {
          if (response.ok) {
            return response.text();
          }
          throw new Error('Caption not found');
        })
        .then(text => setCaption(text))
        .catch(() => {
            // If the text file doesn't exist, we just show nothing.
            setCaption('');
        });
    }
  }, [expandedPhoto]);

  const handleTileClick = (id: number) => {
    const photo = photos.find(p => p.id === id);
    if (!photo) return;

    if (photo.isRevealed) {
        // If already revealed, expand it
        setExpandedPhoto(photo);
    } else {
        // If not revealed, reveal it
        const newPhotos = photos.map(p => 
            p.id === id ? { ...p, isRevealed: true } : p
        );
        
        setPhotos(newPhotos);
        const newCount = revealedCount + 1;
        setRevealedCount(newCount);

        if (newCount === photos.length) {
            setTimeout(onComplete, 1500); 
        }
    }
  };

  // Helper to place items in the 7-column grid
  const gridCells = [];
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
      const photo = photos.find(p => p.row === r && p.col === c);
      gridCells.push({ r, c, photo });
    }
  }

  return (
    <>
      <div className="relative w-full max-w-2xl mx-auto p-4">
        {/* Grid Container */}
        <div className="grid grid-cols-7 gap-2 md:gap-3 aspect-[7/6]">
          {gridCells.map((cell, index) => {
            if (!cell.photo) {
              return <div key={`empty-${index}`} className="w-full h-full pointer-events-none" />;
            }

            return (
              <div key={cell.photo.id} className="relative aspect-square">
                 <motion.button
                  onClick={() => cell.photo && handleTileClick(cell.photo.id)}
                  className="w-full h-full perspective-1000 cursor-pointer outline-none group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                 >
                   <div className={`relative w-full h-full transition-all duration-700 transform-style-3d ${cell.photo.isRevealed ? 'rotate-y-180' : ''}`}
                        style={{ transformStyle: 'preserve-3d', transform: cell.photo.isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                   >
                      {/* Front: The "Cover" - Minimalist Black/Dark Grey */}
                      <div 
                          className="absolute inset-0 w-full h-full bg-zinc-900 rounded-sm shadow-sm backface-hidden border border-zinc-800"
                          style={{ backfaceVisibility: 'hidden' }}
                      >
                      </div>

                      {/* Back: The Photo or Video Thumbnail */}
                      <div 
                          className="absolute inset-0 w-full h-full bg-white rounded-sm shadow-sm overflow-hidden flex items-center justify-center backface-hidden rotate-y-180"
                          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                      >
                           <img 
                              // For videos, use the thumbnail. For photos, use the main url.
                              src={cell.photo.type === 'video' ? cell.photo.thumbnail : cell.photo.url} 
                              alt="Memory" 
                              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                              loading="lazy"
                           />
                           
                           {/* Hover overlay hint */}
                           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                      </div>
                   </div>
                 </motion.button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expanded Photo/Video Modal */}
      <AnimatePresence>
        {expandedPhoto && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setExpandedPhoto(null)}
                className="fixed inset-0 z-[60] flex items-center justify-center bg-white/90 backdrop-blur-md p-4 md:p-8 cursor-zoom-out"
            >
                <motion.div
                    layoutId={`photo-${expandedPhoto.id}`}
                    className="relative max-w-4xl w-auto flex flex-col items-center shadow-2xl bg-white p-2 rounded-sm"
                    onClick={(e) => e.stopPropagation()} 
                >
                    <div className="relative">
                        {expandedPhoto.type === 'video' ? (
                          <video 
                             src={expandedPhoto.url} 
                             className="max-w-full max-h-[70vh] object-contain rounded-sm"
                             controls
                             autoPlay
                             playsInline
                          />
                        ) : (
                          <img 
                              src={expandedPhoto.url} 
                              alt="Expanded Memory"
                              className="max-w-full max-h-[70vh] object-contain rounded-sm grayscale-0"
                          />
                        )}
                    </div>
                    
                    {/* Caption Section */}
                    <AnimatePresence mode="wait">
                        {caption && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mt-4 mb-2 px-4 text-center max-w-2xl"
                            >
                                <p className="text-zinc-800 font-serif-display text-xl italic leading-relaxed">
                                    {caption}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button 
                        onClick={() => setExpandedPhoto(null)}
                        className="absolute -top-12 right-0 text-zinc-800 hover:text-zinc-500 transition-colors"
                    >
                        <X size={32} />
                    </button>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PhotoHeart;