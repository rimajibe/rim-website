import React, { useState } from 'react';
import { Download, BookOpen, Video, FileText, Heart, Target, Clock, MessageCircle, Star, Users, Check, ChevronDown } from 'lucide-react';
import resources from './content/resources.json';

const ResourcesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tous', icon: BookOpen }
  ];

  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory);

  return (
    <>
      {/* Hero Section with Background Image */}
      <section 
        className="py-20 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${require('./optimized/extra_1.webp')})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in playfair-display">
              Ressources Nutritionnelles
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 montserrat-medium">
              Découvrez nos guides, e-books et outils pour vous accompagner dans votre transformation nutritionnelle
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                <Download className="w-4 h-4 mr-2" />
                <span className="montserrat-medium">Ressources à venir</span>
              </div>
              <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                <Star className="w-4 h-4 mr-2" />
                <span className="montserrat-medium">Qualité garantie</span>
              </div>
              <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                <Users className="w-4 h-4 mr-2" />
                <span className="montserrat-medium">Gratuit</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-[#FDFCE9]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#3D5919] mb-6 playfair-display">
              Ressources en préparation
            </h2>
            <p className="text-lg text-gray-700 mb-8 montserrat-medium">
              Nos guides nutritionnels, e-books et outils pratiques seront bientôt disponibles pour vous accompagner dans votre parcours santé.
            </p>
            <div className="bg-[#D6E2B4] p-6 rounded-lg">
              <p className="text-[#3D5919] montserrat-medium">
                Restez connecté pour découvrir nos premières ressources !
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .playfair-display {
          font-family: 'Playfair Display', serif;
        }
        .montserrat-medium {
          font-family: 'Montserrat', sans-serif;
          font-weight: 500;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default ResourcesPage; 