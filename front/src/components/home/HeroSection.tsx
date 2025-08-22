import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  lightImage?: string;
  darkImage?: string;
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

const BackgroundImage: React.FC<{ image: string; onImageLoad: () => void }> = ({ image, onImageLoad }) => (
  <div className="absolute inset-0 z-0">
    <img
      src={image}
      alt=""
      aria-hidden="true"
      loading="eager"
      onLoad={onImageLoad}
      onError={(e) => (e.currentTarget.src = '/fallback-image.jpg')}
      className="w-full h-full object-cover object-center brightness-90 dark:brightness-75"
    />
    <div className="absolute inset-0 bg-gray-900/20 dark:bg-gray-900/70"></div>
  </div>
);

const HeroSection: React.FC<HeroSectionProps> = ({
  lightImage = '/f1.jpeg',
  darkImage = '/f1.jpeg',
}) => {
  const [isDarkMode, setIsDarkMode] = useState(
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [isImageLoading, setIsImageLoading] = useState(true);
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const selectedImage = useMemo(() => (isDarkMode ? darkImage : lightImage), [isDarkMode, lightImage, darkImage]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = selectedImage;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [selectedImage]);

  const handleImageLoad = () => setIsImageLoading(false);

  return (
    <div className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
      <BackgroundImage image={selectedImage} onImageLoad={handleImageLoad} />
      {isImageLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12 md:py-24 relative z-10">
        <div className="grid grid-cols-1 gap-8 items-center text-left">
          <motion.div
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: 0.15, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-1 mb-2 rounded-full bg-gradient-to-r from-emerald-400 to-amber-400 text-white text-sm font-semibold shadow-md text-shadow-md max-w-sm"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {content.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-gray-900 dark:text-gray-100 leading-tight text-shadow-md"
          >
            <span className="text-emerald-400">{content.title.part1}</span><br />
            <span className="text-emerald-400">{content.title.part2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: 0.35 }}
            className="italic text-base md:text-lg text-teal-500 dark:text-teal-200 mb-2 font-medium text-shadow-md"
          >
            {content.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white dark:text-gray-400 mb-4 max-w-2xl text-shadow-md"
          >
            {content.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4 items-start justify-start mb-4"
          >
            <a
              href="/contact"
              aria-label="Contacter notre équipe pour plus d'informations"
              onClick={() => window.gtag?.('event', 'click', { event_category: 'HeroSection', event_label: 'Contact' })}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 text-white font-bold shadow-md hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 text-lg text-shadow-md"
            >
              Nous contacter
            </a>
            <a
              href="/solutions"
              aria-label="Découvrir nos solutions écologiques"
              onClick={() => window.gtag?.('event', 'click', { event_category: 'HeroSection', event_label: 'Solutions' })}
              className="px-8 py-3 rounded-full bg-white/05 dark:bg-slate-900/05 border-2 border-teal-400/50 text-emerald-400 dark:text-teal-300 font-bold hover:bg-emerald-400/10 transition-all duration-300 text-lg text-shadow-md"
            >
              Découvrir nos solutions
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;