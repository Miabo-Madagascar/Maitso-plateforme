import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Building, GraduationCap, LeafyGreen } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

const missions = [
  {
    icon: <Zap className="h-8 w-8 text-green-600 dark:text-green-500" />,
    title: "Transition écologique",
    description: "Accompagnement dans la réduction de l'empreinte carbone et l'adoption de pratiques durables."
  },
  {
    icon: <Building className="h-8 w-8 text-green-600 dark:text-green-500" />,
    title: "Accompagnement des entreprises",
    description: "Solutions sur mesure pour les entreprises souhaitant adopter des pratiques écoresponsables."
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-green-600 dark:text-green-500" />,
    title: "Formation à la green tech",
    description: "Programmes éducatifs pour les jeunes et les professionnels sur les technologies vertes."
  },
  {
    icon: <LeafyGreen className="h-8 w-8 text-green-600 dark:text-green-500" />,
    title: "Projets environnementaux",
    description: "Conception et mise en œuvre de projets ayant un impact positif sur l'environnement."
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const MissionSection = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Notre Mission
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Chez MAITSO Madagascar, nous combinons expertise technologique et engagement écologique pour créer un avenir plus durable.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {missions.map((mission, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full hover:shadow-md transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-full mb-4">
                      {mission.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {mission.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {mission.description}
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

export default MissionSection;