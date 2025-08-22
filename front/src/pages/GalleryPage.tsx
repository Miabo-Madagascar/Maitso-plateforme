
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import GalleryImageCard from '../components/ui/GalleryImageCard';

const galleryImages = [
  { id: 1, src: 'https://i.pinimg.com/1200x/99/ca/4d/99ca4dbc70591a3958079a4012a886cd.jpg', alt: 'Panneaux solaires', category: 'projects', description: "Installation de panneaux solaires dans une école rurale" },
  { id: 2, src: '/galerie/G4.JPG', alt: 'Formation', category: 'education', description: "Session de formation sur les technologies vertes" },
  { id: 3, src: 'https://i.pinimg.com/1200x/57/bd/f4/57bdf408cfa8b6147aa91e7866bc3b0b.jpg', alt: "Plantation d'arbres", category: 'projects', description: "Projet de reforestation communautaire" },
  { id: 4, src: 'https://i.pinimg.com/736x/2f/36/e0/2f36e03dbfcf015273ad6cf7b68a5d0d.jpg', alt: "Aménagement végétal", category: 'amenagement', description: "Création d'un espace vert intelligent dans un bâtiment d'entreprise" },
  { id: 5, src: 'https://i.pinimg.com/736x/57/01/b7/5701b781cced7183d9c6819341ac850e.jpg', alt: "Éolienne", category: 'projects', description: "Installation d'une éolienne pour une communauté isolée" },
  { id: 6, src: 'https://i.pinimg.com/1200x/7a/6e/c4/7a6ec421bb75cfd3ffbd23ef6cdbaa0b.jpg', alt: "Atelier sensibilisation", category: 'education', description: "Atelier de sensibilisation sur le recyclage" },
  { id: 7, src: 'https://i.pinimg.com/736x/eb/33/f6/eb33f67e26bad7835c0dc18895ca1853.jpg', alt: "Jardinage urbain", category: 'amenagement', description: "Projet de jardinage urbain dans un quartier d'Antananarivo" },
  { id: 8, src: 'https://i.pinimg.com/736x/bf/00/85/bf0085df47e09790a13314338112520a.jpg', alt: "Conférence", category: 'events', description: "Conférence sur les innovations durables" },
  { id: 9, src: '/galerie/G2.JPG', alt: "Équipe MAITSO", category: 'team', description: "L'équipe MAITSO lors d'une journée de plantation d'arbres" },
  { id: 10, src: '/galerie/G5.png', alt: "Capteurs IoT", category: 'technology', description: "Installation de capteurs IoT pour la surveillance environnementale" },
  { id: 11, src: 'https://i.pinimg.com/1200x/1f/fc/1d/1ffc1dbd63ef51faeeef1ede7b860d4d.jpg', alt: "Recyclage", category: 'projects', description: "Centre de tri et de recyclage innovant" },
  { id: 12, src: 'https://i.pinimg.com/1200x/b5/59/8a/b5598a5fa4dc101a0b4e64d98ea1138f.jpg', alt: "Hackathon vert", category: 'events', description: "Hackathon sur les technologies vertes organisé par MAITSO" }
];


const categories = [
  { id: 'all', name: 'Tous' },
  { id: 'projects', name: 'Projets' },
  { id: 'education', name: 'Éducation' },
  { id: 'amenagement', name: 'Aménagement' },
  { id: 'events', name: 'Événements' },
  { id: 'team', name: 'Équipe' },
  { id: 'technology', name: 'Technologie' }
];

const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages = selectedCategory === 'all'
    ? galleryImages
    : galleryImages.filter(image => image.category === selectedCategory);

  const openModal = (id: number) => {
    setSelectedImage(id);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const getSelectedImage = () => {
    return galleryImages.find(image => image.id === selectedImage);
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Bandeau titre */}
      <div className="bg-green-600 dark:bg-green-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Galerie photos</h1>
            <p className="text-green-100 md:text-lg">Découvrez nos projets, événements et activités à travers notre galerie d'images.</p>
          </div>
        </div>
      </div>

      {/* Section galerie */}
      <div className="container mx-auto px-4 py-12">
        {/* Filtres catégories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 text-sm rounded-full transition-colors ${selectedCategory === category.id ? 'bg-green-600 text-white dark:bg-green-700' : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Grille d'images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <GalleryImageCard
              key={image.id}
              id={image.id}
              src={image.src}
              alt={image.alt}
              description={image.description}
              onClick={openModal}
            />
          ))}
        </div>

        {/* Modal d'image */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-3 right-3 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  onClick={closeModal}
                  title="Fermer"
                >
                  <X className="h-6 w-6" />
                </button>

                <img
                  src={getSelectedImage()?.src || '/placeholder.jpg'}
                  alt={getSelectedImage()?.alt || 'Image galerie'}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />

                <div className="bg-white dark:bg-gray-900 p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {getSelectedImage()?.alt}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {getSelectedImage()?.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              Aucune image trouvée pour cette catégorie.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
