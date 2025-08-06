import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Lightbulb, AlertTriangle, ArrowUpRight } from 'lucide-react';

const recommendations = [
  {
    id: 1,
    title: "Optimisez votre consommation électrique",
    description: "L'analyse IA suggère d'installer des capteurs IoT pour optimiser la consommation énergétique. Économies potentielles : 20%.",
    priority: "high"
  },
  {
    id: 2,
    title: "Réduisez les émissions de vos transports",
    description: "Implémenter un plan de mobilité durable pour vos employés pourrait réduire votre empreinte carbone de 15%.",
    priority: "medium"
  },
  {
    id: 3,
    title: "Gestion des déchets améliorée",
    description: "Notre système suggère une optimisation du tri des déchets qui pourrait augmenter votre taux de recyclage de 25%.",
    priority: "medium"
  }
];

const RecommendationsPage = () => {
  const getPriorityStyles = (priority: string) => {
    switch(priority) {
      case 'high':
        return 'border-red-500 dark:border-red-600';
      case 'medium':
        return 'border-orange-500 dark:border-orange-600';
      default:
        return 'border-yellow-500 dark:border-yellow-600';
    }
  };
  
  const getPriorityIcon = (priority: string) => {
    switch(priority) {
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'medium':
        return <Lightbulb className="h-5 w-5 text-orange-500" />;
      default:
        return <Lightbulb className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Recommandations IA
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((recommendation) => (
          <Card 
            key={recommendation.id}
            className={`border-l-4 ${getPriorityStyles(recommendation.priority)}`}
            hover
          >
            <CardContent className="pt-6">
              <div className="flex items-start">
                <div className="mr-3 mt-0.5">
                  {getPriorityIcon(recommendation.priority)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {recommendation.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {recommendation.description}
                  </p>
                  <Button variant="link" className="px-0 py-0 h-auto">
                    <span>Voir détails</span>
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsPage;