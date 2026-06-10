import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotoFocusModalProps {
  photos: (string | null)[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function PhotoFocusModal({ photos, currentIndex, onClose, onNavigate }: PhotoFocusModalProps) {
  const filled = photos.filter(Boolean);
  const isOpen = currentIndex !== null && photos[currentIndex] !== null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const prev = () => {
    if (currentIndex === null) return;
    let i = currentIndex - 1;
    while (i >= 0 && !photos[i]) i--;
    if (i >= 0) onNavigate(i);
  };

  const next = () => {
    if (currentIndex === null) return;
    let i = currentIndex + 1;
    while (i < photos.length && !photos[i]) i++;
    if (i < photos.length) onNavigate(i);
  };

  return (
    <AnimatePresence>
      {isOpen && currentIndex !== null && photos[currentIndex] && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X size={20} />
          </button>

          {/* Prev */}
          {filled.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Image */}
          <motion.div
            key={currentIndex}
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.88, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-[90vw] max-h-[85vh] rounded-2xl overflow-hidden shadow-float"
          >
            <img
              src={photos[currentIndex]!}
              alt=""
              className="max-w-[90vw] max-h-[85vh] object-contain"
            />
            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-3 right-4 text-white/60 text-xs">
              {photos.slice(0, currentIndex + 1).filter(Boolean).length} / {filled.length}
            </div>
          </motion.div>

          {/* Next */}
          {filled.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
