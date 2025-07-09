import React, { useState } from 'react';
import { Search, Filter, Calendar, Clock, User, Tag, ArrowRight, ChevronLeft, ChevronRight, BookOpen, TrendingUp, Heart, MessageCircle, ChevronDown } from 'lucide-react';
import posts from './content/blog.json';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const [search, setSearch] = useState('');
  const items = posts
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const categories = ['Tous'];
  const postsPerPage = 6;

  // Filter articles based on search and category
  const filteredArticles = items.filter(article => {
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
          {currentArticles.length > 0 ? (
            <>
              {/* Search and Filter */}
              <div className="max-w-4xl mx-auto mb-12">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Rechercher un article..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D5919] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Blog Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {currentArticles.map((article, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {article.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-3 py-1 bg-[#D6E2B4] text-[#3D5919] rounded-full text-sm font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold text-[#3D5919] mb-3 playfair-display">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(article.date).toLocaleDateString('fr-FR')}
                      </div>
                      <button
                        onClick={() => handleReadMore(article)}
                        className="inline-flex items-center px-4 py-2 bg-[#3D5919] text-white rounded-lg hover:bg-[#2d4214] transition-colors duration-200"
                      >
                        Lire plus
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === page
                          ? 'bg-[#3D5919] text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          ) : (
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
          )}
        </div>
      </section>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-[#3D5919] playfair-display">
                  {selectedArticle.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(selectedArticle.date).toLocaleDateString('fr-FR')}
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedArticle.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="px-3 py-1 bg-[#D6E2B4] text-[#3D5919] rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="prose prose-lg max-w-none">
                {selectedArticle.body.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

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