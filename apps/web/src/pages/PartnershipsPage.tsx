import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Building2, Users, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

// Custom handshake icon since lucide-react doesn't have one
const HandshakeIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M17 16v-1.2c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C14.72 10 13.88 10 12.2 10H7.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C3 12.28 3 13.12 3 14.8V16"></path>
    <path d="M18.5 14.4V16"></path>
    <path d="M18.5 3v1.6"></path>
    <path d="M8.5 4.4V16"></path>
    <path d="M10.5 4.4H7.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C3 6.68 3 7.52 3 9.2v0"></path>
    <path d="M10.5 14.4H7.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C3 12.12 3 11.28 3 9.6v0"></path>
    <path d="M12 14.4h2.2c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C19 12.12 19 11.28 19 9.6V8"></path>
    <path d="M12 4.4h2.2c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C19 6.68 19 7.52 19 9.2V11"></path>
    <path d="M8.5 4.4V3"></path>
  </svg>
);

const benefits = [
  {
    icon: <Building2 className="h-10 w-10 text-green-600 dark:text-green-500" />,
    title: "Expertise écologique",
    description: "Accédez à notre savoir-faire en matière de développement durable et de transition écologique."
  },
  {
    icon: <Users className="h-10 w-10 text-green-600 dark:text-green-500" />,
    title: "Réseau de partenaires",
    description: "Rejoignez notre écosystème de partenaires engagés dans la transition écologique."
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-green-600 dark:text-green-500" />,
    title: "Impact mesurable",
    description: "Bénéficiez d'outils de mesure d'impact pour valoriser vos actions environnementales."
  }
];

const PartnershipsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name || !formData.email || !formData.company || !formData.message) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-green-600 dark:bg-green-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Devenez partenaire
            </h1>
            <p className="text-green-100 md:text-lg">
              Collaborons ensemble pour créer un impact positif sur l'environnement et les communautés.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Pourquoi devenir partenaire de MAITSO?
                </h2>
                <p className="text-gray-600 dark:text-gray-400 md:text-lg">
                  Rejoindre notre réseau de partenaires vous permet de bénéficier de notre expertise en matière 
                  de développement durable et de transition écologique, tout en contribuant à un avenir plus vert.
                </p>
              </div>
              
              <div className="space-y-6 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4 mt-1 bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Types de partenariats
                </h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 text-green-600 dark:text-green-500">•</div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Partenariats stratégiques pour des projets d'envergure
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 text-green-600 dark:text-green-500">•</div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Collaborations techniques sur des solutions innovantes
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 text-green-600 dark:text-green-500">•</div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Partenariats académiques pour la recherche et le développement
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 text-green-600 dark:text-green-500">•</div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Sponsoring d'événements écologiques et technologiques
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                {!isSubmitted ? (
                  <>
                    <div className="flex items-center mb-6">
                      <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mr-3">
                        <HandshakeIcon className="h-6 w-6 text-green-600 dark:text-green-500" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Proposer un partenariat
                      </h2>
                    </div>
                    
                    {error && (
                      <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-3 rounded-md flex items-start mb-4">
                        <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Nom complet
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email professionnel
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Entreprise / Organisation
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Votre proposition
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white"
                          required
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full"
                        isLoading={isSubmitting}
                      >
                        Envoyer ma proposition
                      </Button>
                    </form>
                  </>
                ) : (
                  <div className="flex flex-col items-center text-center py-6">
                    <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-500 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Merci pour votre proposition !
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
                      Nous avons bien reçu votre demande de partenariat. Notre équipe va l'étudier et vous recontactera dans les plus brefs délais.
                    </p>
                    <Button 
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: '', email: '', company: '', message: '' });
                      }}
                      variant="outline"
                    >
                      Envoyer une autre proposition
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Ils nous font confiance
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 flex flex-wrap justify-center items-center gap-12">
            {/* Partner logos would go here - using placeholder text for now */}
            <div className="text-center opacity-60 hover:opacity-100 transition-opacity">
              <p className="text-lg font-medium text-gray-400">Partenaire 1</p>
            </div>
            <div className="text-center opacity-60 hover:opacity-100 transition-opacity">
              <p className="text-lg font-medium text-gray-400">Partenaire 2</p>
            </div>
            <div className="text-center opacity-60 hover:opacity-100 transition-opacity">
              <p className="text-lg font-medium text-gray-400">Partenaire 3</p>
            </div>
            <div className="text-center opacity-60 hover:opacity-100 transition-opacity">
              <p className="text-lg font-medium text-gray-400">Partenaire 4</p>
            </div>
            <div className="text-center opacity-60 hover:opacity-100 transition-opacity">
              <p className="text-lg font-medium text-gray-400">Partenaire 5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnershipsPage;