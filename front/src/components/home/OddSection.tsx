import React from 'react';
import { motion } from 'framer-motion';
import { CardContent, Card } from '../ui/Card';

const oddItems = [
  {
    number: 7,
    title: "Énergie propre",
    description: "Développer des solutions d'énergie propre et accessible pour tous.",
    color: "bg-yellow-500",
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
    color: "bg-red-500",
    img: "/Odd/odd11.svg"
  },
  {
    number: 13,
    title: "Action climatique",
    description: "Lutter contre le changement climatique et ses impacts.",
    color: "bg-green-500",
    img: "/Odd/odd13.svg"
  }
];

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
  show: { opacity: 1, y: 0 }
};

const OddSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ODD ciblés
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Nos actions s'alignent avec les Objectifs de Développement Durable des Nations Unies pour un impact maximal.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {oddItems.map((odd, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden group border-2 border-transparent hover:border-blue-400">
                <div className={`h-2 ${odd.color}`} />
                <CardContent
                  className="relative flex flex-col items-center text-center h-56 md:h-64 p-0 justify-end"
                  aria-label={odd.title}
                >
                  {/* Badge numéro ODD */}
                  <div className={`absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg ring-2 ring-white/80 z-10 ${odd.color}`}>
                    {odd.number}
                  </div>
                  {/* SVG ODD */}
                  <img
                    src={odd.img}
                    alt={odd.title}
                    className="w-20 h-20 md:w-24 md:h-24 object-contain mb-2 mt-6 drop-shadow-lg z-10"
                    draggable="false"
                  />
                  {/* Texte en bas */}
                  <div className="w-full bg-white/80 dark:bg-gray-900/80 px-4 py-3 rounded-b-lg backdrop-blur-sm z-10">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      {odd.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {odd.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OddSection;