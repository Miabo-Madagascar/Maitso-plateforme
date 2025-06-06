import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Sample gallery images
const galleryImages = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Panneaux solaires",
    category: "projects",
    description: "Installation de panneaux solaires dans une école rurale"
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Formation",
    category: "education",
    description: "Session de formation sur les technologies vertes"
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/5748845/pexels-photo-5748845.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Plantation d'arbres",
    category: "projects",
    description: "Projet de reforestation communautaire"
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/4503818/pexels-photo-4503818.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Aménagement végétal",
    category: "amenagement",
    description: "Création d'un espace vert intelligent dans un bâtiment d'entreprise"
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/3912976/pexels-photo-3912976.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Éolienne",
    category: "projects",
    description: "Installation d'une éolienne pour une communauté isolée"
  },
  {
    id: 6,
    src: "https://images.pexels.com/photos/5428132/pexels-photo-5428132.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Atelier sensibilisation",
    category: "education",
    description: "Atelier de sensibilisation sur le recyclage"
  },
  {
    id: 7,
    src: "https://images.pexels.com/photos/5748818/pexels-photo-5748818.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Jardinage urbain",
    category: "amenagement",
    description: "Projet de jardinage urbain dans un quartier d'Antananarivo"
  },
  {
    id: 8,
    src: "https://images.pexels.com/photos/4439142/pexels-photo-4439142.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Conférence",
    category: "events",
    description: "Conférence sur les innovations durables"
  },
  {
    id: 9,
    src: "https://images.pexels.com/photos/4049672/pexels-photo-4049672.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Équipe MAITSO",
    category: "team",
    description: "L'équipe MAITSO lors d'une journée de plantation d'arbres"
  },
  {
    id: 10,
    src: "https://images.pexels.com/photos/7465567/pexels-photo-7465567.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Capteurs IoT",
    category: "technology",
    description: "Installation de capteurs IoT pour la surveillance environnementale"
  },
  {
    id: 11,
    src: "https://images.pexels.com/photos/8866803/pexels-photo-8866803.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Recyclage",
    category: "projects",
    description: "Centre de tri et de recyclage innovant"
  },
  {
    id: 12,
    src: "https://images.pexels.com/photos/6636097/pexels-photo-6636097.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Hackathon vert",
    category: "events",
    description: "Hackathon sur les technologies vertes organisé par MAITSO"
  }
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

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
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
      <div className="bg-green-600 dark:bg-green-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Galerie photos
            </h1>
            <p className="text-green-100 md:text-lg">
              Découvrez nos projets, événements et activités à travers notre galerie d'images.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 text-sm rounded-full transition-colors ${
                selectedCategory === category.id
                  ? 'bg-green-600 text-white dark:bg-green-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Image gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-lg shadow-md cursor-pointer group"
              onClick={() => openModal(image.id)}
            >
              <div className="aspect-w-4 aspect-h-3 relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-medium">{image.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Image modal */}
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
                >
                  <X className="h-6 w-6" />
                </button>

                <img
                  src={getSelectedImage()?.src}
                  alt={getSelectedImage()?.alt}
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
