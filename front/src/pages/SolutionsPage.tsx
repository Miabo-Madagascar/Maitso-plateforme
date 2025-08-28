import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PieChart, Leaf, GraduationCap, LeafyGreen } from 'lucide-react';
import { Button } from '../components/ui/Button';

const solutions = [
  {
    id: 'consultance',
    icon: <PieChart className="h-10 w-10 text-green-600 dark:text-green-500" />,
    title: "Consultance RSE & IA",
    description: "Notre équipe d'experts en développement durable vous accompagne dans l'analyse de votre empreinte carbone et la mise en place de stratégies RSE optimisées par l'intelligence artificielle. Nous identifions les opportunités d'amélioration et vous aidons à mettre en œuvre des solutions concrètes.",
    benefits: [
      "Analyse complète de votre empreinte carbone",
      "Recommandations personnalisées basées sur l'IA",
      "Rapports détaillés et tableaux de bord interactifs",
      "Accompagnement dans la mise en œuvre des solutions"
    ],
    image: "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    id: 'projects',
    icon: <Leaf className="h-10 w-10 text-green-600 dark:text-green-500" />,
    title: "Projets environnementaux",
    description: "Nous concevons et mettons en œuvre des projets à impact positif sur l'environnement et les communautés locales. De la reforestation aux solutions d'énergie renouvelable, nos projets sont conçus pour maximiser l'impact positif tout en minimisant l'empreinte écologique.",
    benefits: [
      "Projets de reforestation et de conservation",
      "Installation de solutions d'énergie renouvelable",
      "Programmes de recyclage et de gestion des déchets",
      "Mesure et rapports d'impact environnemental"
    ],
    image: "https://images.pexels.com/photos/5748845/pexels-photo-5748845.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    id: 'formation',
    icon: <GraduationCap className="h-10 w-10 text-green-600 dark:text-green-500" />,
    title: "Formations",
    description: "Nos programmes de formation sur les technologies vertes, l'IA éthique et les pratiques durables sont conçus pour équiper votre équipe des compétences nécessaires pour naviguer dans l'économie verte. Nous proposons des formations adaptées à tous les niveaux, des débutants aux experts.",
    benefits: [
      "Ateliers interactifs sur l'IA et le développement durable",
      "Programmes de certification en technologies vertes",
      "Formation sur mesure pour les entreprises",
      "Ressources pédagogiques accessibles en ligne"
    ],
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    id: 'amenagement',
    icon: <LeafyGreen className="h-10 w-10 text-green-600 dark:text-green-500" />,
    title: "Aménagement végétal",
    description: "Nos solutions d'aménagement d'espaces verts intelligents transforment les environnements urbains en oasis de biodiversité. Nous intégrons des capteurs IoT pour surveiller et optimiser la santé des plantes, la qualité de l'air et la consommation d'eau.",
    benefits: [
      "Conception d'espaces verts durables",
      "Systèmes d'irrigation intelligents et économes en eau",
      "Surveillance de la qualité de l'air et de la biodiversité",
      "Intégration de technologies IoT pour l'optimisation"
    ],
    image: "https://images.pexels.com/photos/4503818/pexels-photo-4503818.jpeg?auto=compress&cs=tinysrgb&w=1600"
  }
];

const SolutionsPage = () => {
  const [activeTab, setActiveTab] = useState('consultance');

  return (
    <div className="pt-24 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-green-600 dark:bg-green-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Nos solutions pour accélérer votre transition écologique
            </h1>
            <p className="text-green-100 md:text-lg">
              Découvrez comment MAITSO Madagascar peut vous aider à réduire votre empreinte carbone,
              optimiser vos processus et contribuer à un avenir plus durable.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Tabs navigation */}
        <div className="flex flex-wrap mb-8 border-b border-gray-200 dark:border-gray-800">
          {solutions.map((solution) => (
            <button
              key={solution.id}
              className={`px-4 py-3 text-sm md:text-base font-medium transition-colors border-b-2 mr-4 mb-2 ${
                activeTab === solution.id
                  ? 'border-green-600 text-green-600 dark:border-green-500 dark:text-green-500'
                  : 'border-transparent text-gray-600 hover:text-green-600 hover:border-green-300 dark:text-gray-400 dark:hover:text-green-400 dark:hover:border-green-800'
              }`}
              onClick={() => setActiveTab(solution.id)}
            >
              {solution.title}
            </button>
          ))}
        </div>

        {/* Active solution content */}
        {solutions.map((solution) => (
          <div key={solution.id} id={solution.id}>
            {activeTab === solution.id && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full mr-4">
                      {solution.icon}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      {solution.title}
                    </h2>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {solution.description}
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Avantages clés:
                  </h3>

                  <ul className="space-y-2 mb-6">
                    {solution.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-2 mt-1 text-green-600 dark:text-green-500">•</div>
                        <span className="text-gray-600 dark:text-gray-400">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/contact">
                      <Button size="lg">
                        Demander un devis
                      </Button>
                    </Link>
                    <Button variant="outline" size="lg">
                      En savoir plus
                    </Button>
                  </div>
                </div>

                <div className="order-first lg:order-last">
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-80 object-cover rounded-lg shadow-md"
                  />
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolutionsPage;
