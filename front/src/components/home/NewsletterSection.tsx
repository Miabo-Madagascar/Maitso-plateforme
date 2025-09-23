import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Mail, CheckCircle } from 'lucide-react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Veuillez entrer votre adresse email');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Veuillez entrer une adresse email valide');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
    }, 1500);
  };

  return (
    <section className="py-12 bg-green-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {!isSubscribed ? (
            <>
              <Mail className="h-12 w-12 mx-auto mb-4 text-green-600 dark:text-green-500" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Restez informé des dernières actualités
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Abonnez-vous à notre newsletter pour recevoir des conseils, actualités et invitations aux événements sur la transition écologique.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col items-center sm:flex-row gap-3 max-w-md mx-auto">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse email"
                    className={`w-full px-4 py-3 rounded-md border ${
                      error ? 'border-red-400 dark:border-red-600' : 'border-gray-300 dark:border-gray-700'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500`}
                    disabled={isSubmitting}
                  />
                  {error && <p className="text-red-500 text-sm mt-1 text-left">{error}</p>}
                </div>
                <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting} className="pt-6 pb-6 text-xl">
                  S'abonner
                </Button>
              </form>
            </>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600 dark:text-green-500" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Merci pour votre inscription !
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Vous recevrez bientôt notre prochaine newsletter avec des informations exclusives.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
