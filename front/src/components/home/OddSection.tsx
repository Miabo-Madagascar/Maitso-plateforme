import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CardContent, Card } from '../ui/Card';

// Données des ODD avec couleurs alignées sur TeamPresentation
const oddItems = [
  {
    number: 7,
    title: "Énergie propre",
    description: "Développer des solutions d'énergie propre et accessible pour tous.",
    color: "bg-amber-400",
    img: "/Odd/odd7.svg"
  },
  {
    number: 9,
    title: "Innovation durable",
    description: "Promouvoir l'industrialisation durable et l'innovation.",
    color: "bg-orange-500",
    img: "/Odd/odd9.svg"
  },
  {
    number: 11,
    title: "Villes durables",
    description: "Rendre les villes inclusives, sûres, résilientes et durables.",
    color: "bg-amber-500",
    img: "/Odd/odd11.svg"
  },
  {
    number: 13,
    title: "Action climatique",
    description: "Lutter contre le changement climatique et ses impacts.",
    color: "bg-green-800",
    img: "/Odd/odd13.svg"
  }
];

// Variants d'animation
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// Composant OddCard réutilisable
const OddCard = ({ odd }: { odd: typeof oddItems[0] }) => {
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.div 
      variants={item}
      whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
      role="listitem"
      className="focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-lg"
      tabIndex={0}
    >
      <Card className="rounded-lg bg-white/10 dark:bg-slate-900/20 backdrop-blur-md shadow-md border border-emerald-300/30 dark:border-emerald-300/30 h-full hover:shadow-lg transition-all duration-300 hover:bg-emerald-400/20">
        <div className={`h-2 ${odd.color}`} aria-hidden="true" />
        <CardContent
          className="relative flex flex-col items-center text-center p-0 justify-end flex-grow"
          aria-label={`Objectif de Développement Durable ${odd.number}: ${odd.title}`}
        >
          <div className={`absolute top-3 left-3 w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg ring-2 ring-white/80 z-10 ${odd.color}`}>
            {odd.number}
          </div>
          <img
            src={odd.img}
            alt={`Icône de l'ODD ${odd.number}: ${odd.title}`}
            className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain mt-6 mb-4 drop-shadow-lg z-10"
            draggable="false"
            loading="lazy"
            onError={(e) => (e.currentTarget.src = '/Odd/fallback.svg')}
          />
          <div className="w-full bg-white/10 dark:bg-slate-900/20 px-4 py-3 rounded-b-lg backdrop-blur-sm z-10">
            <h3 className="text-lg sm:text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
              {odd.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              {odd.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Composant principal OddSection
const OddSection = React.memo(() => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = oddItems[0].img;
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-emerald-100 to-amber-100 dark:from-slate-900 dark:to-gray-800 w-full" role="region" aria-labelledby="odd-heading">
      <div className="w-full px-4 sm:px-6 md:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 id="odd-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-4">
            ODD ciblés
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Nos actions s'alignent avec les Objectifs de Développement Durable des Nations Unies pour un impact maximal.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          role="list"
        >
          {oddItems.map((odd) => (
            <OddCard key={odd.number} odd={odd} />
          ))}
        </motion.div>
      </div>
    </section>
  );
});

export default OddSection;