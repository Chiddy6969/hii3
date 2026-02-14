import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PhotoHeart from './components/PhotoHeart';
import LetterModal from './components/LetterModal';
import { AppStage } from './types';

const App: React.FC = () => {
  // Start directly at the album stage
  const [stage, setStage] = useState<AppStage>('album');
  const [showNextButton, setShowNextButton] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  const handleHeartComplete = () => {
    setShowNextButton(true);
  };

  const openLetter = () => {
    setIsLetterOpen(true);
    setStage('letter');
  };

  const closeLetter = () => {
    setIsLetterOpen(false);
    // Stay on album view but letter is closed
    setStage('album');
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-white text-zinc-900 overflow-hidden relative selection:bg-zinc-200">
        
      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 z-10">
        <AnimatePresence mode="wait">

          {(stage === 'album' || stage === 'letter') && (
             <motion.div
                key="album"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="w-full flex flex-col items-center"
             >
                <div className="w-full max-w-3xl mb-8 text-center space-y-2">
                    {/* EDIT HERE: Change the text below to update the title */}
                    <h2 className="font-serif-display text-3xl md:text-4xl text-zinc-900 tracking-tight">
                        us being us.
                    </h2>
                    <p className="text-zinc-400 text-xs tracking-widest uppercase">
                        click to reveal
                    </p>
                </div>

                <PhotoHeart onComplete={handleHeartComplete} />

                <AnimatePresence>
                    {showNextButton && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="fixed bottom-8 right-8 z-40"
                        >
                            <motion.button
                                onClick={openLetter}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-3 px-8 py-3 bg-black text-white rounded-full font-serif-display text-lg shadow-xl hover:bg-zinc-800 transition-colors"
                            >
                                <span>Next</span>
                                <ArrowRight size={18} />
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
             </motion.div>
          )}

        </AnimatePresence>
      </main>

      <LetterModal isOpen={isLetterOpen} onClose={closeLetter} />
    </div>
  );
};

export default App;