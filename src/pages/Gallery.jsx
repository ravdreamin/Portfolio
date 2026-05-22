import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Image as ImageIcon, X } from 'lucide-react';
import { FadeIn } from '../components/ui/Animations';

export const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://res.cloudinary.com/dgdabkabu/image/list/portfolio.json');

        if (!res.ok) {
          throw new Error('Could not fetch images.');
        }

        const data = await res.json();

        if (data.resources && data.resources.length > 0) {
          const formattedImages = data.resources.map(img => {
            const baseUrl = `https://res.cloudinary.com/dgdabkabu/image/upload`;
            return {
              id: img.public_id,
              src: `${baseUrl}/w_600,q_auto,f_auto/v${img.version}/${img.public_id}.${img.format}`,
              fullSrc: `${baseUrl}/q_auto,f_auto/v${img.version}/${img.public_id}.${img.format}`,
              width: img.width,
              height: img.height,
              aspectRatio: img.width / img.height
            };
          });
          setImages(formattedImages);
        }
      } catch (err) {
        console.error('Gallery fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const openLightbox = (index) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">

        <FadeIn>
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              Gallery
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl">
              A visual collection of my work, life, and aesthetic explorations.
            </p>
          </div>
        </FadeIn>

        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400/10 to-teal-500/10 dark:from-emerald-400/10 dark:to-teal-400/10 flex items-center justify-center">
              <Loader2 size={20} className="text-emerald-500 dark:text-emerald-400 animate-spin" />
            </div>
            <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">Loading gallery...</p>
          </div>
        )}

        {!loading && images.length === 0 && (
          <FadeIn>
            <div className="text-center py-24">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/[0.04] flex items-center justify-center mx-auto mb-5">
                <ImageIcon size={24} className="text-slate-300 dark:text-slate-600" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">No images found</p>
              <p className="text-slate-400 dark:text-slate-500 text-xs max-w-sm mx-auto">
                Unable to fetch images. Make sure you have uploaded images to Cloudinary with the tag 'portfolio' and un-restricted the Resource List.
              </p>
            </div>
          </FadeIn>
        )}

        {!loading && images.length > 0 && (
          <div className="columns-2 md:columns-3 gap-2 sm:gap-4 space-y-2 sm:space-y-4">
            {images.map((img, i) => (
              <FadeIn key={img.id} delay={i * 0.05} className="break-inside-avoid">
                <motion.div
                  className="relative rounded-2xl overflow-hidden cursor-zoom-in group border border-slate-200/50 dark:border-white/[0.06] bg-slate-100/50 dark:bg-white/[0.02]"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => openLightbox(i)}
                  style={{ aspectRatio: img.aspectRatio || 1 }}
                >
                  <img
                    src={img.src}
                    alt="Gallery item"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-black/20 transition-colors duration-300" />
                </motion.div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && images[activeImageIndex] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 dark:bg-black/95 backdrop-blur-xl"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-900 dark:text-white transition-colors"
          >
            <X size={20} strokeWidth={2} />
          </button>

          <div
            className="absolute left-0 top-0 bottom-0 w-1/4 cursor-w-resize z-40"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex(prev => prev > 0 ? prev - 1 : images.length - 1);
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-1/4 cursor-e-resize z-40"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex(prev => prev < images.length - 1 ? prev + 1 : 0);
            }}
          />

          <div className="w-full h-full p-4 sm:p-12 flex items-center justify-center relative">
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              key={images[activeImageIndex].id}
              src={images[activeImageIndex].fullSrc}
              alt="Gallery fullscreen view"
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl relative z-30"
              style={{ maxHeight: '90vh' }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-slate-100/80 dark:bg-white/10 text-slate-800 dark:text-white text-xs font-medium tracking-widest z-50">
            {activeImageIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
};
