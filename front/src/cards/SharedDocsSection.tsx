import React, { useState } from "react";
import { Plus, FileText, Download, Eye, Edit, ChevronDown, ChevronUp } from "lucide-react";

interface Document {
  name: string;
  type: string;
  updated: string;
  owner: string;
  size: string;
  downloads: number;
  category: string;
  description: string;
  suggestions?: string[];
}

// Liste enrichie des documents avec descriptions et suggestions contextuelles
const DOCUMENTS: Document[] = [
  {
    name: "Certificat RSE 2024",
    type: "Certificat",
    updated: "01 Septembre 2024",
    owner: "Service RSE",
    size: "1.2 MB",
    downloads: 128,
    category: "Certification",
    description: "Document officiel attestant de la démarche RSE de l'entreprise.",
    suggestions: [
      "Mettre en place des politiques de réduction de déchets",
      "Favoriser les énergies renouvelables",
      "Encourager le télétravail pour réduire les déplacements"
    ],
  },
  {
    name: "Guide Démarche Verte",
    type: "Document informatif",
    updated: "15 Octobre 2024",
    owner: "Développement Durable",
    size: "850 KB",
    downloads: 76,
    category: "Soutien Vert",
    description: "Suggestions pour intégrer une démarche écologique dans l'entreprise.",
    suggestions: [
      "Réduire consommation de papier",
      "Optimiser usage des ressources énergétiques",
      "Sensibiliser les collaborateurs aux bonnes pratiques"
    ],
  },
  {
    name: "Manuel Utilisation Application",
    type: "Guide",
    updated: "20 Octobre 2024",
    owner: "Support Technique",
    size: "2.5 MB",
    downloads: 210,
    category: "Utilisation",
    description: "Guide complet d’utilisation de l’application pour les utilisateurs.",
  },
  {
    name: "Rapport Données Capteurs Q3",
    type: "Rapport",
    updated: "05 Octobre 2024",
    owner: "Analyse IoT",
    size: "3.1 MB",
    downloads: 154,
    category: "Rapports",
    description: "Analyse détaillée des données collectées par les capteurs au troisième trimestre.",
  },
  {
    name: "Guide d'utilisation plateforme MAITSO",
    type: "Guide",
    updated: "25 Septembre 2024",
    owner: "Support Plateforme",
    size: "1.8 MB",
    downloads: 98,
    category: "Guides",
    description: "Instructions claires pour la gestion et l'exploitation de la plateforme MAITSO.",
  },
  {
    name: "Suggestions et Bonnes Pratiques",
    type: "Document collaboratif",
    updated: "10 Octobre 2024",
    owner: "Communauté Utilisateurs",
    size: "1.0 MB",
    downloads: 83,
    category: "Suggestions",
    description: "Recueil des meilleures pratiques et idées proposées par notre communauté.",
    suggestions: [
      "Automatiser les alertes critiques",
      "Partager les réussites auprès des équipes",
      "Organiser des sessions de formation régulières"
    ],
  },
];

const SharedDocsSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="mt-6 p-8 bg-white/30 backdrop-blur-xl rounded-3xl border border-white/30 shadow-lg text-gray-900 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-3xl font-extrabold tracking-tight">Documents partagés</h2>
        <div className="flex gap-4 w-full sm:w-auto">
          <button className="flex items-center gap-3 px-6 py-3 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl shadow-md hover:brightness-110 transition focus:outline-none">
            <Plus className="w-5 h-5" />
            Uploader
          </button>
          <select className="px-4 py-3 border border-white/50 rounded-2xl bg-white/40 backdrop-blur-md text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition w-48">
            <option>Toutes catégories</option>
            <option>Rapports</option>
            <option>Certifications</option>
            <option>Guides</option>
            <option>Suggestions</option>
          </select>
        </div>
      </div>

      {/* Liste documents */}
      <div className="grid gap-4">
        {DOCUMENTS.map((doc, i) => (
          <div
            key={i}
            className="flex flex-col border border-white/40 p-6 rounded-2xl bg-white/20 backdrop-blur-md shadow-sm hover:shadow-lg transition cursor-pointer"
            aria-expanded={expandedIndex === i}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-indigo-100/70 rounded-xl flex items-center justify-center shadow-inner">
                  <FileText className="w-7 h-7 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg leading-tight">{doc.name}</h3>
                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mt-1">
                    <span>{doc.type} • {doc.size}</span>
                    <span>Modifié le {doc.updated}</span>
                    <span>Par {doc.owner}</span>
                    <span className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      {doc.downloads}
                    </span>
                  </div>
                  <span className="inline-block mt-2 px-3 py-1 bg-white/40 text-gray-600 rounded-full text-xs font-semibold backdrop-blur-sm">
                    {doc.category}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 text-gray-700">
                <button 
                  className="p-3 rounded-lg bg-white/30 backdrop-blur-md hover:bg-white/50 transition text-indigo-600 shadow-sm focus:outline-none"
                  onClick={() => toggleExpand(i)}
                  aria-label={expandedIndex === i ? "Réduire détails" : "Afficher détails"}
                >
                  {expandedIndex === i ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                <button className="p-3 rounded-lg bg-white/30 backdrop-blur-md hover:bg-white/50 transition text-indigo-600 shadow-sm focus:outline-none">
                  <Eye className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-lg bg-white/30 backdrop-blur-md hover:bg-white/50 transition text-green-600 shadow-sm focus:outline-none">
                  <Download className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-lg bg-white/30 backdrop-blur-md hover:bg-white/50 transition text-gray-600 shadow-sm focus:outline-none">
                  <Edit className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Description et suggestions, affichées si étendu */}
            {expandedIndex === i && (
              <div className="mt-4 text-sm text-gray-700 select-text">
                <p className="mb-3">{doc.description}</p>
                {doc.suggestions && doc.suggestions.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-1 text-indigo-600">Suggestions :</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {doc.suggestions.map((sug, idx) => (
                        <li key={idx}>{sug}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SharedDocsSection;
