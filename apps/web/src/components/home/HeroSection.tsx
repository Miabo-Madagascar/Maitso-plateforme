import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
      
      {/* Fond animé optionnel */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-green-300 opacity-20 rounded-full filter blur-3xl animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight transition-transform"
            >
              <span className="text-green-600 dark:text-green-400">Innovons</span> ensemble pour
              <br />
              <span className="text-green-600 dark:text-green-400">un avenir durable</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              MAITSO Madagascar accompagne les entreprises, collectivités et jeunes dans leur 
              transition écologique grâce à l'IA, l'IoT et les énergies renouvelables.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link to="/contact">
                  <Button size="lg">
                    Nous contacter
                  </Button>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }}>
                <Link to="/solutions">
                  <Button variant="outline" size="lg">
                    Découvrir nos solutions
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden lg:block"
          >
            <img
              src="/hero-image.jpeg"
              alt="Énergie renouvelable et technologie"
              className="w-[80%] h-auto rounded-xl shadow-2xl border-4 border-green-200 dark:border-green-500"
            />
          </motion.div>
        </div>
      </div>

      {/* Dégradé de bas de section */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent dark:from-gray-950 dark:to-transparent z-10" />
    </div>
  );
};

export default HeroSection;
