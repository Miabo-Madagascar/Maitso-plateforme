import React from 'react';
import { motion } from 'framer-motion';

interface GalleryImageCardProps {
  id: number;
  src: string;
  alt: string;
  description: string;
  onClick: (id: number) => void;
}

const GalleryImageCard: React.FC<GalleryImageCardProps> = ({ id, src, alt, description, onClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="overflow-hidden rounded-lg shadow-md cursor-pointer group"
    onClick={() => onClick(id)}
  >
    <div className="aspect-w-4 aspect-h-3 relative">
      <img
        src={src || '/placeholder.jpg'}
        alt={alt || 'Image galerie'}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <p className="text-white font-medium">{alt}</p>
      </div>
    </div>
  </motion.div>
);

export default GalleryImageCard;
