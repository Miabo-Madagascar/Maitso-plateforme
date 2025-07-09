import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DataPage from './dashboard/DataPage';
import RecommendationsPage from './dashboard/RecommendationsPage';
import TrainingPage from './dashboard/TrainingPage';
import MessagesPage from './dashboard/MessagesPage';
import SettingsPage from './dashboard/SettingsPage';
import DataChart from '../components/dashboard/DataChart';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ArrowUpRight, Lightbulb, AlertTriangle } from 'lucide-react';

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

const DashboardHome = () => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Émissions de GES (tonnes CO2)</CardTitle>
          </CardHeader>
          <CardContent>
            <DataChart type="emissions" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Consommation d'énergie (kWh)</CardTitle>
          </CardHeader>
          <CardContent>
            <DataChart type="energy" />
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-green-600 dark:text-green-500" />
          Recommandations IA
        </h3>
        
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
      
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Modules de formation
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card hover>
            <CardContent className="pt-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Introduction à l'IA durable
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Découvrez comment l'IA peut être utilisée pour optimiser les processus écologiques.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  30 minutes
                </span>
                <Button size="sm" variant="secondary">
                  Commencer
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card hover>
            <CardContent className="pt-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Gestion des déchets
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Apprenez les meilleures pratiques pour la gestion et la réduction des déchets.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  45 minutes
                </span>
                <Button size="sm" variant="secondary">
                  Commencer
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card hover>
            <CardContent className="pt-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Énergies renouvelables
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Explorez les différentes sources d'énergie renouvelable et leur application.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  60 minutes
                </span>
                <Button size="sm" variant="secondary">
                  Commencer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="data" element={<DataPage />} />
            <Route path="recommendations" element={<RecommendationsPage />} />
            <Route path="training" element={<TrainingPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/dashboard\" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;