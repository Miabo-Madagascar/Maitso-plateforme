import React from 'react';
import { motion } from 'framer-motion';
import { CardContent, Card } from '../ui/Card';

// Données des ODD avec couleurs alignées sur ServiceSection
const oddItems = [
  {
    number: 7,
    title: "Énergie propre",
    description: "Développer des solutions d'énergie propre et accessible pour tous.",
    color: "bg-[var(--yellow-500)]",
    img: "/Odd/odd7.svg"
  },
  {
    number: 9,
    title: "Innovation durable",
    description: "Promouvoir l'industrialisation durable et l'innovation.",
    color: "bg-[var(--orange-500)]",
    img: "/Odd/odd9.svg"
  },
  {
    number: 11,
    title: "Villes durables",
    description: "Rendre les villes inclusives, sûres, résilientes et durables.",
    color: "bg-[var(--red-500)]",
    img: "/Odd/odd11.svg"
  },
  {
    number: 13,
    title: "Action climatique",
    description: "Lutter contre le changement climatique et ses impacts.",
    color: "bg-[var(--green-500)]",
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
  return (
    <motion.div 
      variants={item} 
      role="listitem"
    >
      <Card className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 h-full hover:shadow-md transition-all duration-300 hover:border-green-300 dark:hover:border-green-700">
        <div className={`h-2 ${odd.color}`} aria-hidden="true" />
        <CardContent
          className="relative flex flex-col items-center text-center p-0 justify-end flex-grow"
          aria-label={`Objectif de Développement Durable ${odd.number}: ${odd.title}`}
        >
          <div className={`absolute top-3 left-3 w-10 h-10 rounded-full flex items-center justify-center text-[var(--white)] text-lg font-bold shadow-lg ring-2 ring-[var(--white)]/80 z-10 ${odd.color}`}>
            {odd.number}
          </div>
          <img
            src={odd.img}
            alt={`Icône de l'ODD ${odd.number}: ${odd.title}`}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain mb-2 mt-6 drop-shadow-lg z-10"
            draggable="false"
            loading="lazy"
            onError={(e) => (e.currentTarget.src = '/Odd/fallback.svg')}
          />
          <div className="w-full bg-white/90 dark:bg-gray-900/90 px-4 py-3 rounded-b-lg backdrop-blur-sm z-10">
            <h3 className="text-lg sm:text-xl font-semibold text-[var(--gray-900)] dark:text-[var(--white)] mb-1">
              {odd.title}
            </h3>
            <p className="text-sm sm:text-base text-[var(--gray-600)] dark:text-[var(--gray-400)]">
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
  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-gray-900" role="region" aria-labelledby="odd-heading">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          <h2 id="odd-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--gray-900)] dark:text-[var(--white)] mb-4">
            ODD ciblés
          </h2>
          <p className="text-base sm:text-lg text-[var(--gray-600)] dark:text-[var(--gray-400)]">
            Nos actions s'alignent avec les Objectifs de Développement Durable des Nations Unies pour un impact maximal.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
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