import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/Card';

const oddItems = [
  {
    number: 7,
    title: "Énergie propre",
    description: "Développer des solutions d'énergie propre et accessible pour tous.",
    color: "bg-yellow-500"
  },
  {
    number: 9,
    title: "Innovation durable",
    description: "Promouvoir l'industrialisation durable et l'innovation.",
    color: "bg-orange-500"
  },
  {
    number: 11,
    title: "Villes durables",
    description: "Rendre les villes inclusives, sûres, résilientes et durables.",
    color: "bg-red-500"
  },
  {
    number: 13,
    title: "Action climatique",
    description: "Lutter contre le changement climatique et ses impacts.",
    color: "bg-blue-500"
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
              <Card className="h-full hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <div className={`h-2 ${odd.color}`} />
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className={`${odd.color} text-white w-12 h-12 rounded-full flex items-center justify-center mb-4 font-bold text-lg`}>
                      {odd.number}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {odd.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
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