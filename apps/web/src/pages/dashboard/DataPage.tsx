import React from 'react';
import DataChart from '../../components/dashboard/DataChart';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

const DataPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Mes données environnementales
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </div>
  );
};

export default DataPage;