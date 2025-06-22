import React, { useState } from 'react';
import { Search, Filter, Calendar, Clock, User, Tag, ArrowRight, ChevronLeft, ChevronRight, BookOpen, TrendingUp, Heart, MessageCircle, ChevronDown } from 'lucide-react';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [];

  const categories = ['Tous'];
  const postsPerPage = 6;

  // Filter articles based on search and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchTerm === '' || 
                         article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'Tous' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredArticles.length / postsPerPage);

  const handleReadMore = (article) => {
    setSelectedArticle(article);
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };

  return (
    <>
      {/* Hero Section with Background Image */}
      <section 
        className="py-20 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${require('./optimized/extra_2.webp')})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in playfair-display">
              Blog Nutritionnel
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 montserrat-medium">
              Découvrez mes conseils, astuces et réflexions pour une vie plus saine et équilibrée
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                <BookOpen className="w-4 h-4 mr-2" />
                <span className="montserrat-medium">Articles à venir</span>
              </div>
              <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                <TrendingUp className="w-4 h-4 mr-2" />
                <span className="montserrat-medium">Mise à jour régulière</span>
              </div>
              <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                <Heart className="w-4 h-4 mr-2" />
                <span className="montserrat-medium">Conseils personnalisés</span>
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
              Contenu en préparation
            </h2>
            <p className="text-lg text-gray-700 mb-8 montserrat-medium">
              Le blog sera bientôt disponible avec des articles nutritionnels, des conseils pratiques et des informations scientifiques pour vous accompagner dans votre parcours santé.
            </p>
            <div className="bg-[#D6E2B4] p-6 rounded-lg">
              <p className="text-[#3D5919] montserrat-medium">
                Restez connecté pour découvrir nos premiers articles !
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

export default BlogPage; 