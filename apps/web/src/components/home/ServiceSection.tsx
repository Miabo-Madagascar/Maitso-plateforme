import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, PieChart, Leaf, Lightbulb, Users } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../ui/Card';

const services = [
  {
    icon: <PieChart className="h-10 w-10 text-green-600 dark:text-green-500" />,
    title: "Consultance RSE & IA",
    description: "Analyse de votre empreinte carbone et mise en place de stratégies RSE optimisées par l'intelligence artificielle.",
    link: "/solutions#consultance"
  },
  {
    icon: <Leaf className="h-10 w-10 text-green-600 dark:text-green-500" />,
    title: "Projets environnementaux",
    description: "Conception et mise en œuvre de projets à impact positif sur l'environnement et les communautés locales.",
    link: "/solutions#projects"
  },
  {
    icon: <Users className="h-10 w-10 text-green-600 dark:text-green-500" />,
    title: "Formations",
    description: "Programmes de formation sur les technologies vertes, l'IA éthique et les pratiques durables.",
    link: "/solutions#formation"
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-green-600 dark:text-green-500" />,
    title: "Aménagement végétal",
    description: "Solutions d'aménagement d'espaces verts intelligents pour entreprises et collectivités.",
    link: "/solutions#amenagement"
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

const ServiceSection = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Nos Services
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Découvrez nos solutions intégrées alliant technologie et développement durable.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full hover:shadow-md transition-all duration-300 hover:border-green-300 dark:hover:border-green-700">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-full mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {service.description}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="pt-4 flex justify-center">
                  <Link 
                    to={service.link} 
                    className="inline-flex items-center text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                  >
                    <span>En savoir plus</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceSection;