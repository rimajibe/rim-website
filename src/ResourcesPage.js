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
          {filteredResources.length > 0 ? (
            <>
              {/* Categories Filter */}
              <div className="max-w-4xl mx-auto mb-12">
                <div className="flex flex-wrap justify-center gap-4">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center px-6 py-3 rounded-lg transition-colors duration-200 ${
                          selectedCategory === category.id
                            ? 'bg-[#3D5919] text-white'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-5 h-5 mr-2" />
                        {category.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Resources Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredResources.map((resource, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <FileText className="w-6 h-6 text-[#3D5919] mr-3" />
                          <h3 className="text-xl font-bold text-[#3D5919] playfair-display">
                            {resource.title}
                          </h3>
                        </div>
                        <Download className="w-5 h-5 text-gray-400" />
                      </div>
                      
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-[#D6E2B4] text-[#3D5919] rounded-full text-sm font-medium">
                          {resource.category}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <Check className="w-4 h-4 mr-1 text-green-500" />
                          <span>Gratuit</span>
                        </div>
                        <a
                          href={resource.file}
                          download
                          className="inline-flex items-center px-4 py-2 bg-[#3D5919] text-white rounded-lg hover:bg-[#2d4214] transition-colors duration-200"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Télécharger
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
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
          )}
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