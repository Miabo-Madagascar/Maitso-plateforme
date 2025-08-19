import React, { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Partner {
  src: string;
  alt: string;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface MissionCard {
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
}

export const MissionSection = () => {
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const missionContent: MissionCard[] = [
    {
      title: 'Innovation',
      description: 'Mettre l’IA et l’IoT au service de la transition écologique à Madagascar.',
      icon: (
        <svg className="w-12 h-12 mb-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
      ),
      color: 'text-emerald-400 dark:text-emerald-300',
    },
    {
      title: 'Écologie',
      description: 'Accompagner entreprises et jeunes vers un avenir durable et responsable.',
      icon: (
        <svg className="w-12 h-12 mb-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 7v7m0 0H8m4 0h4" />
        </svg>
      ),
      color: 'text-teal-400 dark:text-teal-300',
    },
    {
      title: 'Inclusion',
      description: 'Favoriser l’inclusion et la diversité dans la tech et l’écologie.',
      icon: (
        <svg className="w-12 h-12 mb-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M9 20H4v-2a3 3 0 015.356-1.857M15 11a4 4 0 10-6 0v1a4 4 0 006 0v-1z" />
        </svg>
      ),
      color: 'text-amber-400 dark:text-amber-300',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-100 to-amber-100 dark:from-slate-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">Notre mission</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {missionContent.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: idx * 0.2 }}
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
              role="article"
              className="flex flex-col items-center text-center p-6 bg-white/10 dark:bg-slate-900/20 backdrop-blur-md rounded-xl shadow-md border border-emerald-300/30 dark:border-slate-300/30 transition-all duration-300 hover:bg-emerald-400/20"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-white/10 dark:bg-slate-900/10 backdrop-blur-md rounded-full mb-4">
                {card.icon}
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${card.color}`}>{card.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const teamMembers: TeamMember[] = [
  {
    name: 'R.Dihariniaina',
    role: 'CEO & Fondatrice',
    image: '/Photo_persoGrp/I1.jpg',
    bio: 'Expert en transition écologique et IA.',
  },
  {
    name: 'Hérvé',
    role: '3D Designer',
    image: '/Photo_persoGrp/I2.jpg',
    bio: 'Spécialiste objets connectés & énergie.',
  },
  {
    name: 'Daniella Rakotonirina',
    role: 'Responsable DevOps',
    image: '/Photo_persoGrp/I6.jpg',
    bio: 'Spécialiste objets connectés & énergie.',
  },
  {
    name: 'Njato',
    role: 'Développeur Front-End',
    image: '/Photo_persoGrp/I4.jpg',
    bio: 'Spécialiste objets connectés & énergie.',
  },
  {
    name: 'Rindranirainy',
    role: 'Responsable environnemental',
    image: '/Photo_persoGrp/I7.jpg',
    bio: 'Passionné par l’IA et l’analyse de données.',
  },
  {
    name: 'Antsa Vivien',
    role: 'Developpeur IA',
    image: '/Photo_persoGrp/I8.jpg',
    bio: 'Spécialiste objets connectés & énergie.',
  },
  {
    name: 'Yardih',
    role: 'Data Scientist',
    image: '/Photo_persoGrp/I9.jpg',
    bio: 'Passionné par l’IA et l’analyse de données.',
  },
  {
    name: 'Elie Mamodally.',
    role: 'Front-end Developper',
    image: '/Photo_persoGrp/I10.png',
    bio: 'Passionné par l’IA et l’analyse de données.',
  },
];

const TeamSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
      window.gtag?.('event', 'click', { event_category: 'TeamSection', event_label: `Scroll ${direction}` });
    }
  }, []);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = teamMembers[0].image;
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-gray-100">Notre équipe</h2>
        <div className="relative">
          <button
            aria-label="Défiler à gauche"
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/15 dark:bg-slate-900/15 backdrop-blur-md border border-emerald-300/30 dark:border-slate-300/30 rounded-full p-2 shadow-md hover:bg-emerald-400/20 transition-all duration-300 hidden md:block"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-emerald-400">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div
            ref={scrollRef}
            aria-label="Carrousel des membres de l'équipe, défilez horizontalement"
            className="flex gap-8 overflow-x-auto md:overflow-x-hidden py-2 px-1 md:px-8 scrollbar-none"
            style={{ scrollBehavior: 'smooth' }}
          >
            {teamMembers.map((member, idx) => (
              <motion.div
                key={member.name + idx}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                role="article"
                className="bg-white/10 dark:bg-slate-900/20 backdrop-blur-md rounded-xl shadow-md p-6 w-72 flex-shrink-0 flex flex-col items-center transition-all duration-300 hover:bg-emerald-400/20 hover:shadow-lg border border-emerald-300/30 dark:border-slate-300/30"
              >
                <div className="w-24 h-24 rounded-full mb-4 overflow-hidden border-4 border-gradient-to-r from-emerald-400 to-amber-400">
                  <img src={member.image} alt={member.name} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-semibold text-emerald-400 dark:text-emerald-300 mb-1">{member.name}</h3>
                <p className="text-sm text-teal-400 dark:text-amber-300 mb-2">{member.role}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 text-center">{member.bio}</p>
              </motion.div>
            ))}
          </div>
          <button
            aria-label="Défiler à droite"
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/15 dark:bg-slate-900/15 backdrop-blur-md border border-emerald-300/30 dark:border-slate-300/30 rounded-full p-2 shadow-md hover:bg-emerald-400/20 transition-all duration-300 hidden md:block"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-emerald-400">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;