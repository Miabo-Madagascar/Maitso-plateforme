import React, { type JSX } from "react";
import { BookOpen, Plug, Lightbulb, Video, Layers, Wrench } from "lucide-react";

interface DocItem {
  title: string;
  description: string;
  icon: JSX.Element;
  pdfLink: string; // Lien vers le PDF
}

const DOC_ITEMS: DocItem[] = [
  {
    title: "Guide d'installation",
    description: "Installation et configuration des capteurs",
    icon: <BookOpen className="w-6 h-6 text-indigo-600" />,
    pdfLink: "/pdfs/guide-installation.pdf",
  },
  {
    title: "API & Intégrations",
    description: "Connexion et synchronisation des données",
    icon: <Plug className="w-6 h-6 text-green-600" />,
    pdfLink: "/pdfs/api-integrations.pdf",
  },
  {
    title: "Maintenance & Calibration",
    description: "Entretiens réguliers et ajustements des capteurs",
    icon: <Wrench className="w-6 h-6 text-yellow-600" />,
    pdfLink: "/pdfs/maintenance-calibration.pdf",
  },
  {
    title: "Bonnes pratiques",
    description: "Optimisation des flux de données et monitoring",
    icon: <Lightbulb className="w-6 h-6 text-purple-600" />,
    pdfLink: "/pdfs/bonnes-pratiques.pdf",
  },
  {
    title: "Tutoriels vidéo",
    description: "Visualisez le suivi des capteurs en temps réel",
    icon: <Video className="w-6 h-6 text-red-600" />,
    pdfLink: "/pdfs/tutoriels-video.pdf",
  },
  {
    title: "Cas d'usage",
    description: "Exemples concrets d'analyse et reporting",
    icon: <Layers className="w-6 h-6 text-teal-600" />,
    pdfLink: "/pdfs/cas-d-usage.pdf",
  },
];

const DocumentationSection: React.FC = () => {
  return (
    <div className="mt-5 p-6 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40 text-gray-700">
      <h2 className="text-xl font-bold mb-6">📖 Documentation & Guides</h2>

      {/* Grille de guides */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {DOC_ITEMS.map((doc, i) => (
          <a
            key={i}
            href={doc.pdfLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border border-white/50 rounded-xl bg-white/30 hover:bg-white/50 hover:shadow-lg transition flex flex-col gap-2 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              {doc.icon}
              <h3 className="font-semibold text-gray-800">{doc.title}</h3>
            </div>
            <p className="text-sm text-gray-600">{doc.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default DocumentationSection;
