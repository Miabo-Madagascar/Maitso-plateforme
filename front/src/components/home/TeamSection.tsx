import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TeamMember {
  id: string;
  fonction: string;
  nom: string;
  competences: string[];
  fonctionsAdministratives: string[];
  photo: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    fonction: "CEO & Fondatrice",
    nom: "R.Dihariniaina",
    competences: ["Transformation digitale","Communication digitale","Gestion de Projet IT", "IA", "Leadership", "Vision stratégique", "Innovation", "MC - Art oratoire"],
    fonctionsAdministratives: [
      "Direction générale de l'entreprise",
      "Définition de la stratégie générale et écologique",
      "Supervision des projets IA",
      "Relations partenaires et investisseurs",
      "Communication externe et interne"
    ],
    photo: "/Photo_persoGrp/I1.jpg"
  },
  {
    id: "2",
    fonction: "3D Designer",
    nom: "ANDRIANANTENAINA  H. Hérvé",
    competences: ["Design 3D", "Modélisation", "Prototypage", "CAO", "Design industriel"],
    fonctionsAdministratives: [
      "Création de prototypes 3D",
      "Design de produits IoT",
      "Modélisation technique",
      "Supervision des projets de design",
      "Preparation des fichiers de fabrication"
    ],
    photo: "/Photo_persoGrp/I2.jpg"
  },
  {
    id: "3",
    fonction: "Responsable DevOps",
    nom: "Daniella N. Rakotonirina",
    competences: ["DevOps", "Cloud", "Infrastructure", "CI/CD", "Kubernetes/Docker", "AWS"],
    fonctionsAdministratives: [
      "Gestion de l'infrastructure cloud",
      "Automatisation des déploiements",
      "Supervision des environnements",
      "Sécurité des systèmes",
      "Intégration du GreenOps"
    ],
    photo: "/Photo_persoGrp/I6.jpg"
  },
  {
    id: "4",
    fonction: "Développeur Front-End",
    nom: "T.Ramanantsoa Njato",
    competences: ["React", "TypeScript", "Vue.js", "JavaScript", "UI/UX"],
    fonctionsAdministratives: [
      "Développement des interfaces utilisateur",
      "Intégration des designs",
      "Optimisation des performances front-end",
      "Tests et validation utilisateur"
    ],
    photo: "/Photo_persoGrp/I4.jpg"
  },
  {
    id: "5",
    fonction: "Responsable environnemental",
    nom: "Rindranirainy",
    competences: ["Environnement", "Durabilité", "Écologie", "Analyse impact", "RSE"],
    fonctionsAdministratives: [
      "Évaluation de l'impact environnemental",
      "Développement de solutions durables",
      "Conseil en transition écologique",
      "Reporting environnemental"
    ],
    photo: "/Photo_persoGrp/I7.jpg"
  },
  {
    id: "6",
    fonction: "Manager",
    nom: "Mahery Mickaël",
    competences: ["Gestion de projet", "Leadership", "Scrum", "Planification", "Coordination"],
    fonctionsAdministratives: [
      "Coordination des équipes projet",
      "Planification et suivi des livrables",
      "Gestion des ressources",
      "Interface client"
    ],
    photo: "/Photo_persoGrp/I5.jpg"
  },
  {
    id: "7",
    fonction: "Développeur Back-end",
    nom: "ANDRIAMAMONJY A. Lahatrarivelo",
    competences: ["Node.js", "PostgreSQL", "MongoDB", "REST API", "SolidWorks", "Qt", "C++"],
    fonctionsAdministratives: [
      "Développement des APIs",
      "Architecture backend",
      "Gestion des bases de données",
      "3D Designing",
      "Conception d'application pour micro-ordinateur"
    ],
    photo: "/Photo_persoGrp/I3.jpg"
  },
  {
    id: "8",
    fonction: "Développeur IA",
    nom: "RAFANOMEZANTSOA Antsa",
    competences: ["Machine Learning", "Deep Learning", "Python", "Scikit-Learn", "Numpy",  "Pandas", "PyTorch", "IA", "FastAPI", "TypeScript", "NestJS"],
    fonctionsAdministratives: [
      "Développement d'algorithmes IA",
      "Formation de modèles ML",
      "Recherche et développement IA",
      "Optimisation des performances"
    ],
    photo: "/Photo_persoGrp/I8.jpg"
  },
  {
    id: "9",
    fonction: "Embedded System & IoT",
    nom: "Yardih RAKOTONIRAINY",
    competences: [ "Electronics", "Robotics", "Embedded Systems", "Embedded Networking", "IoT", "TinyML", "Simulation", "Proteus", "MATLAB", "Python" ,"C", "Assembly"],
    fonctionsAdministratives: [
      "Conception de circuit Electroniques",
      "Développement de systèmes embarqués et en temps réels",
      "Simulation de Circuit Electronique",
      "Tests et validation des dispositifs créés"
    ],
    photo: "/Photo_persoGrp/I9.jpg"
  },
  {
    id: "10",
    fonction: "Front-end Developer",
    nom: "RAVELOMANANTSOA E. Mamodally",
    competences: ["React", "JavaScript", "HTML/CSS", "Vue.js", "Mobile", "Responsive Design"],
    fonctionsAdministratives: [
      "Développement d'interfaces modernes",
      "Optimisation mobile",
      "Intégration responsive",
      "Amélioration de l'expérience utilisateur"
    ],
    photo: "/Photo_persoGrp/I10.png"
  }
];

export default function TeamPresentation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = teamMembers[currentIndex].photo;
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, [currentIndex]);

  const currentMember = teamMembers[currentIndex];

  return (
    <section className="min-h-screen bg-gradient-to-br from-emerald-100 to-amber-100 dark:from-slate-900 dark:to-gray-800 py-12 px-4 sm:px-6 md:px-8 w-full">
      <div className="w-full">
        {/* Titre principal */}
        <h2 className="text-4xl font-bold text-center text-emerald-600 dark:text-emerald-400 mb-10">Team</h2>

        {/* Indicateur de position */}
        <div className="text-center mb-8">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {currentIndex + 1} / {teamMembers.length}
          </div>
          <div className="flex justify-center space-x-2">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Aller au membre ${index + 1}`}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-emerald-400' : 'bg-gray-400 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Contenu principal */}
        <motion.div
          key={currentMember.id}
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/10 dark:bg-slate-90/20 backdrop-blur-md rounded-xl shadow-md p-8 border border-emerald-300/30 w-full"
        >
          {/* Colonne gauche : Informations */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-4">{currentMember.fonction}</h2>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">{currentMember.nom}</h3>
            <div className="mb-6">
              <h4 className="text-lg font-medium text-teal-600 dark:text-teal-400 mb-2">Compétences</h4>
              <ul className="flex flex-wrap gap-2">
                {currentMember.competences.map((competence, idx) => (
                  <li
                    key={idx}
                    className="bg-emerald-400/20 text-emerald-600 dark:text-emerald-300 text-sm px-3 py-1 rounded-full"
                  >
                    {competence}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium text-teal-600 dark:text-teal-400 mb-2">Fonctions chez Maitso</h4>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm">
                {currentMember.fonctionsAdministratives.map((fonction, idx) => (
                  <li key={idx}>{fonction}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Colonne droite : Photo */}
          <div className="flex justify-center items-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-gradient-to-r from-emerald-400 to-amber-400">
              <img
                src={currentMember.photo}
                alt={currentMember.nom}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Boutons de navigation */}
        <div className="flex justify-center space-x-6 mt-12">
          <button
            onClick={goToPrevious}
            aria-label="Précédent"
            className="bg-white/15 dark:bg-slate-900/15 backdrop-blur-md border-emerald-300/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-400/20 transition-all duration-300 flex items-center gap-2 px-6 py-3 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Précédent
          </button>
          <button
            onClick={goToNext}
            aria-label="Suivant"
            className="bg-white/15 dark:bg-slate-900/15 backdrop-blur-md border-emerald-300/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-400/20 transition-all duration-300 flex items-center gap-2 px-6 py-3 rounded-full"
          >
            Suivant
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}