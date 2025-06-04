import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 min-h-screen flex flex-col justify-center pt-20">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
              <span className="text-green-600 dark:text-green-400">Innovons</span> ensemble pour 
              <span className="text-green-600 dark:text-green-400"> un avenir durable</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              MAITSO Madagascar accompagne les entreprises, collectivités et jeunes dans leur 
              transition écologique grâce à l'IA, l'IoT et les énergies renouvelables.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/contact">
                <Button size="lg">
                  Nous contacter
                </Button>
              </Link>
              <Link to="/solutions">
                <Button variant="outline" size="lg">
                  Découvrir nos solutions
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <img
              src="https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Énergie renouvelable et technologie"
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent dark:from-gray-950 dark:to-transparent" />
    </div>
  );
};

export default HeroSection;