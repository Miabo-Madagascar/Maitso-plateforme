import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Partner {
  src: string;
  alt: string;
}

interface HeroSectionProps {
  images?: string[];
  partners?: Partner[];
}

const content = {
  badge: "Entreprise engagée pour l'avenir",
  title: {
    part1: "Innovons ensemble pour",
    part2: "un avenir durable",
  },
  subtitle: "L'innovation au service de l'écologie, pour Madagascar et le monde.",
  description:
    "MAITSO Madagascar accompagne les entreprises, collectivités et jeunes dans leur transition écologique grâce à l'IA, l'IoT et les énergies renouvelables.",
};

const BackgroundCarousel: React.FC<{ images: string[]; bgIndex: number; onImageLoad: () => void }> = ({ images, bgIndex, onImageLoad }) => (
  <div className="absolute inset-0 z-0">
    {images.map((img, idx) => (
      <img
        key={img}
        src={img}
        alt=""
        aria-hidden="true"
        loading={bgIndex === idx ? 'eager' : 'lazy'}
        onLoad={onImageLoad}
        onError={(e) => (e.currentTarget.src = '/fallback-image.jpg')}
        className={`w-full h-full object-cover object-center transition-opacity duration-1000 absolute inset-0 ${bgIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
      />
    ))}
    <div className="absolute inset-0 bg-gray-900/50 dark:bg-gray-900/40"></div>
  </div>
);

const HeroSection: React.FC<HeroSectionProps> = ({
  images = ['/f1.jpeg', '/f2.jpeg', '/f3.jpeg', '/f4.jpeg'],
  partners = [
    { src: '/P1.png', alt: 'Partenaire 1' },
    { src: '/I9.jpeg', alt: 'Partenaire 2' },
  ],
}) => {
  const memoizedImages = useMemo(() => images, [images]);
  const [bgIndex, setBgIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const nextImage = useCallback(() => {
    setBgIndex((prev) => (prev + 1) % memoizedImages.length);
    buttonRef.current?.focus();
  }, [memoizedImages.length]);

  const prevImage = useCallback(() => {
    setBgIndex((prev) => (prev - 1 + memoizedImages.length) % memoizedImages.length);
    buttonRef.current?.focus();
  }, [memoizedImages.length]);

  useEffect(() => {
    timeoutRef.current = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % memoizedImages.length);
    }, 5000);
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [memoizedImages.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') nextImage();
      if (event.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextImage, prevImage]);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = memoizedImages[0];
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [memoizedImages]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearInterval(timeoutRef.current);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % memoizedImages.length);
    }, 5000);
  };

  const handleImageLoad = () => setIsImageLoading(false);

  return (
    <div
      className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <BackgroundCarousel images={memoizedImages} bgIndex={bgIndex} onImageLoad={handleImageLoad} />
      {isImageLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {memoizedImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setBgIndex(idx)}
            aria-label={`Afficher l'image ${idx + 1} du carrousel`}
            aria-current={bgIndex === idx ? 'true' : 'false'}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${bgIndex === idx ? 'bg-emerald-400/40' : 'bg-slate-300/20'} border border-emerald-300/30 dark:border-slate-300/30`}
          />
        ))}
      </div>

      <div className="absolute bottom-4 right-4 flex gap-4 z-20">
        <button
          onClick={prevImage}
          aria-label="Image précédente"
          className="p-2 bg-white/15 dark:bg-slate-900/15 border border-emerald-300/30 dark:border-slate-300/30 text-white rounded-full hover:bg-emerald-400/20 transition-all duration-300"
        >
          ←
        </button>
        <button
          ref={buttonRef}
          onClick={nextImage}
          aria-label="Image suivante"
          className="p-2 bg-white/15 dark:bg-slate-900/15 border border-emerald-300/30 dark:border-slate-300/30 text-white rounded-full hover:bg-emerald-400/20 transition-all duration-300"
        >
          →
        </button>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.1 }}
            className="text-center lg:text-left bg-white/10 dark:bg-slate-900/20 border border-emerald-300/30 dark:border-slate-300/30 rounded-2xl p-8 shadow-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: 0.15, type: 'spring' }}
              className="inline-flex items-center gap-2 px-4 py-1 mb-4 rounded-full bg-gradient-to-r from-emerald-400 to-amber-400 text-white text-sm font-semibold shadow-md border border-emerald-300/30"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {content.badge}
            </motion.div>

            <motion.h1
              key={bgIndex}
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-gray-900 dark:text-gray-100 leading-tight"
            >
              <span className="text-emerald-400">{content.title.part1}</span><br />
              <span className="text-emerald-400">{content.title.part2}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: 0.35 }}
              className="italic text-base md:text-lg text-teal-400 dark:text-teal-300 mb-4 font-medium"
            >
              {content.subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              {content.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start mb-8"
            >
              <a
                href="#contact"
                aria-label="Contacter notre équipe pour plus d'informations"
                onClick={() => window.gtag?.('event', 'click', { event_category: 'HeroSection', event_label: 'Contact' })}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 text-white font-bold shadow-md hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 text-lg border border-emerald-300/30"
              >
                Nous contacter
              </a>
              <a
                href="#solutions"
                aria-label="Découvrir nos solutions écologiques"
                onClick={() => window.gtag?.('event', 'click', { event_category: 'HeroSection', event_label: 'Solutions' })}
                className="px-8 py-3 rounded-full bg-white/05 dark:bg-slate-900/05 border-2 border-teal-400/50 text-emerald-400 dark:text-teal-300 font-bold hover:bg-emerald-400/10 transition-all duration-300 text-lg"
              >
                Découvrir nos solutions
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: 0.7 }}
              className="flex flex-wrap justify-center lg:justify-start items-center gap-6 mb-8"
            >
              <span className="text-gray-600 dark:text-gray-400">Partenaires de confiance :</span>
              {partners.map((partner, idx) => (
                <img key={idx} src={partner.src} alt={partner.alt} className="h-12" />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;