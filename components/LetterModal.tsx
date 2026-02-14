import React from 'react';
import { motion } from 'framer-motion';
import { LETTER_CONTENT } from '../letter';

interface LetterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LetterModal: React.FC<LetterModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-xl p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full max-w-lg bg-white border border-zinc-100 shadow-2xl overflow-hidden"
        style={{
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Minimal Content Container */}
        <div className="p-10 md:p-14 flex flex-col items-center text-center">
            
          <div className="prose prose-zinc max-w-none w-full">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                 <div className="font-serif-display text-3xl text-zinc-900 mb-8 font-normal italic">
                    For You
                 </div>
                 <div className="font-sans font-light text-lg md:text-xl text-zinc-600 leading-relaxed min-h-[200px] max-h-[60vh] overflow-y-auto custom-scrollbar p-2 whitespace-pre-wrap text-left">
                    {LETTER_CONTENT}
                 </div>
              </motion.div>
          </div>

          <div className="mt-10">
             <button
                onClick={onClose}
                className="text-xs uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors border-b border-transparent hover:border-zinc-900 pb-1"
             >
                Close
             </button>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
};

export default LetterModal;
