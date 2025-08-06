import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const courses = [
  {
    id: 1,
    title: "Introduction à l'IA durable",
    description: "Découvrez comment l'IA peut être utilisée pour optimiser les processus écologiques.",
    duration: "30 minutes"
  },
  {
    id: 2,
    title: "Gestion des déchets",
    description: "Apprenez les meilleures pratiques pour la gestion et la réduction des déchets.",
    duration: "45 minutes"
  },
  {
    id: 3,
    title: "Énergies renouvelables",
    description: "Explorez les différentes sources d'énergie renouvelable et leur application.",
    duration: "60 minutes"
  }
];

const TrainingPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Formation
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} hover>
            <CardContent className="pt-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                {course.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {course.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {course.duration}
                </span>
                <Button size="sm" variant="secondary">
                  Commencer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrainingPage;