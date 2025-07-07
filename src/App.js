import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, Check, ArrowRight, Calendar, Mail, Phone, Instagram, Star, Heart, Target, Clock, MessageCircle, ChevronLeft, ChevronRight, Plus, Minus, Scale } from 'lucide-react';
import { Zap, Award, TrendingUp, AlertCircle } from 'lucide-react';
import ResourcesPage from './ResourcesPage';
import BlogPage from './BlogPage';
import { reportImagePerformance } from './reportWebVitals';

// Preload critical images
const preloadImages = () => {
  const criticalImages = [
    require('./optimized/First_Picture.webp'),
    require('./optimized/rim.webp'),
    require('./optimized/Services_Prise_et_perte_de_poids.webp'),
    require('./optimized/Services_Nutrition_thérapeutique.webp'),
    require('./optimized/Services_Nutrition_sportive.webp')
  ];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

// Image component with lazy loading and optimization
const OptimizedImage = ({ src, alt, className, priority = false, fallbackSrc, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    if (priority) {
      const img = new Image();
      img.onload = () => setIsLoaded(true);
      img.onerror = () => {
        if (fallbackSrc && !useFallback) {
          setUseFallback(true);
        } else {
          setHasError(true);
        }
      };
      img.src = useFallback ? fallbackSrc : src;
    }
  }, [src, priority, fallbackSrc, useFallback]);

  if (hasError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500">Image non disponible</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !priority && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#3D5919] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={useFallback ? fallbackSrc : src}
        alt={alt}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (fallbackSrc && !useFallback) {
            setUseFallback(true);
          } else {
            setHasError(true);
          }
        }}
        {...props}
      />
    </div>
  );
};

// Header Component
const Header = ({ scrolled, isMenuOpen, setIsMenuOpen, onNavigate, currentPage }) => {
  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  const handleNavigation = (target) => {
    if (target === 'rendez-vous') {
      // Open Calendly instead of scrolling to form
      window.open('https://calendly.com/dieteticienne-ajibe-rim/consultation-gratuite?primary_color=3D5919&text_color=000000&background_color=ffffff&hide_event_type_details=1&hide_gdpr_banner=1', '_blank');
      return;
    }
    
    if (currentPage !== 'home') {
      // If we're not on home page, first go to home, then scroll to section
      onNavigate('home');
      // Use setTimeout to ensure the home page loads before scrolling
      setTimeout(() => {
        const element = document.getElementById(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If we're already on home page, just scroll to section
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className={`text-xl font-bold agrandir-wide ${scrolled ? 'text-[#3D5919]' : 'text-white'}`}>Dt. Rim Ajibe</div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <button onClick={() => handleNavigation('accueil')} className={`${scrolled ? 'text-[#3D5919]' : 'text-white'} hover:text-[#D6E2B4] transition-colors montserrat-medium bg-transparent border-none cursor-pointer`}>Accueil</button>
          <button onClick={() => handleNavigation('services')} className={`${scrolled ? 'text-[#3D5919]' : 'text-white'} hover:text-[#D6E2B4] transition-colors montserrat-medium bg-transparent border-none cursor-pointer`}>Services</button>
          <button onClick={() => handleNavigation('qui-suis-je')} className={`${scrolled ? 'text-[#3D5919]' : 'text-white'} hover:text-[#D6E2B4] transition-colors montserrat-medium bg-transparent border-none cursor-pointer`}>Qui suis-je ?</button>
          <button onClick={() => onNavigate('resources')} className={`${scrolled ? 'text-[#3D5919]' : 'text-white'} hover:text-[#D6E2B4] transition-colors montserrat-medium bg-transparent border-none cursor-pointer`}>Ressources</button>
          <button onClick={() => onNavigate('blog')} className={`${scrolled ? 'text-[#3D5919]' : 'text-white'} hover:text-[#D6E2B4] transition-colors montserrat-medium bg-transparent border-none cursor-pointer`}>Blog</button>
          <button onClick={() => handleNavigation('rendez-vous')} className="bg-[#3D5919] text-white px-6 py-2 rounded-full hover:bg-[#2A3F0F] transition-colors montserrat-medium border-none cursor-pointer">Rendez-vous</button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`md:hidden ${scrolled ? 'text-[#3D5919]' : 'text-white'}`}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 py-2 space-y-2">
            <button onClick={() => handleNavigation('accueil')} className="block w-full text-left py-2 text-[#3D5919] montserrat-medium bg-transparent border-none cursor-pointer">Accueil</button>
            <button onClick={() => handleNavigation('services')} className="block w-full text-left py-2 text-[#3D5919] montserrat-medium bg-transparent border-none cursor-pointer">Services</button>
            <button onClick={() => handleNavigation('qui-suis-je')} className="block w-full text-left py-2 text-[#3D5919] montserrat-medium bg-transparent border-none cursor-pointer">Qui suis-je ?</button>
            <button onClick={() => { onNavigate('resources'); handleMenuItemClick(); }} className="block w-full text-left py-2 text-[#3D5919] montserrat-medium bg-transparent border-none cursor-pointer">Ressources</button>
            <button onClick={() => { onNavigate('blog'); handleMenuItemClick(); }} className="block w-full text-left py-2 text-[#3D5919] montserrat-medium bg-transparent border-none cursor-pointer">Blog</button>
            <button onClick={() => handleNavigation('rendez-vous')} className="block w-full py-2 bg-[#3D5919] text-white text-center rounded-full montserrat-medium border-none cursor-pointer">Rendez-vous</button>
          </div>
        </div>
      )}
    </nav>
  );
};


// Hero Section Component with background image
const HeroSection = () => {
  useEffect(() => {
    // Preload the hero background image
    const img = new Image();
    img.src = require('./optimized/First_Picture.webp');
  }, []);

  return (
    <section 
      id="accueil" 
      className="min-h-screen flex items-center justify-center pt-20 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${require('./First_Picture.jpg')})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/50"></div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in playfair-display">
            Prise en charge 360°
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto montserrat-medium">
            Réapprendre à manger, rétablir l'équilibre, et reconstruire son mode de vie
          </p>
        </div>
        <div className="mt-16 text-center">
          <ChevronDown className="w-8 h-8 text-white animate-bounce mx-auto" />
        </div>
      </div>
    </section>
  );
};

// Quote Section Component
const QuoteSection = ({ quote, author, bgColor = "bg-[#D6E2B4]" }) => {
  return (
    <section className={`${bgColor} py-16`}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <blockquote className="text-3xl md:text-4xl font-bold italic text-[#3D5919] mb-4 playfair-display">
            {quote}
          </blockquote>
          {author && <p className="text-lg text-[#3D5919] playfair-display">— {author}</p>}
        </div>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  return (
    <section id="qui-suis-je" className="py-20 bg-[#FFFFD]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-[#3D5919] playfair-display">Qui suis-je ?</h2>
            <p className="text-lg text-gray-700 montserrat-medium">
              Je suis <span className="font-bold text-[#3D5919]">Rim Ajibe</span>, Diététicienne Clinicienne & Nutritionniste.
            </p>
            <p className="text-lg text-gray-700 montserrat-medium">
              Mon approche repose sur une <span className="font-bold">conviction</span> simple :
            </p>
            <p className="text-lg italic text-[#3D5919] p-4 rounded-lg shadow-lg playfair-display">
              L'alimentation doit nourrir, soutenir la santé et apporter du réconfort, jamais devenir une source de stress ou de confusion.
            </p>
            <p className="text-lg text-gray-700 montserrat-medium">
              Il est essentiel de <span className="font-bold">traiter les causes profondes des déséquilibres</span>, plutôt que de simplement <span className="font-bold">masquer les symptômes</span>. 
              <span className="italic underline"> C'est en agissant à la racine que l'on obtient des résultats durables et véritables.</span>
            </p>
          </div>
          <div className="relative">
            <OptimizedImage 
              src={require('./optimized/rim.webp')}
              fallbackSrc={require('./rim.jpg')}
              alt="Dt. Rim Ajibe" 
              className="rounded-full shadow-xl w-full max-w-md mx-auto object-cover aspect-square"
              priority={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Philosophy Section Component
const PhilosophySection = () => {
  return (
    <section 
    className="py-20 bg-[#3D5919] text-white relative bg-cover bg-center"
    style={{ backgroundImage: `url(${require('./extra3.jpg')})` }}
     >
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center playfair-display">Ma philosophie</h2>
        <div className="max-w-4xl mx-auto space-y-8">
          <p className="text-2xl font-bold text-center mb-8 montserrat-medium">
            Je ne défends aucune tendance alimentaire. Je défends ce qui fonctionne pour vous.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 playfair-display">Approche scientifique</h3>
              <p className="montserrat-medium">Ma pratique repose sur des recommandations scientifiques fiables et actualisées. Je ne catégorise ni les glucides, ni les lipides, ni aucun type d'alimentation.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 playfair-display">Personnalisation</h3>
              <p className="montserrat-medium">Chaque personne est unique, et mon rôle est de m'adapter à votre état de santé, vos besoins réels, et vos objectifs.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 playfair-display">Mission</h3>
              <p className="montserrat-medium">Je vous accompagne pour restaurer la physiologie naturelle de votre corps et traiter les causes profondes de vos symptômes. Cela passe par un travail solide sur les bases de la nutrition, dans une logique de compréhension, pas de restriction.</p>
            </div>
          </div>
          <blockquote className="text-xl italic text-center mt-8 p-6 bg-white/10 rounded-lg playfair-display">
            "Il n'existe pas un régime parfait valable pour tous. Ce qui fonctionne, c'est ce qui est aligné avec votre corps.
            <br /><br />
            Que ce soit une alimentation méditerranéenne, un jeûne intermittent, une approche cétogène ou autre... Ce n'est ni une mode, ni un choix arbitraire.
            <br /><br />
            C'est votre santé qui nous guide."
            <br /><br />
            Dt. Rim Ajibe
          </blockquote>
          <div className="text-center mt-8">
            <button onClick={() => window.open('https://calendly.com/dieteticienne-ajibe-rim/consultation-gratuite?primary_color=3D5919&text_color=000000&background_color=ffffff&hide_event_type_details=1&hide_gdpr_banner=1', '_blank')} className="bg-[#D6E2B4] text-[#3D5919] px-4 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-lg hover:bg-white transition-all font-bold montserrat-medium border-none cursor-pointer">Je prends mon rendez-vous</button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Section Component
const ServicesSection = () => {
  const [expandedService1, setExpandedService1] = useState(false);
  const [expandedService2, setExpandedService2] = useState(false);
  const [expandedService3, setExpandedService3] = useState(false);

  const services = [
    {
      title: "Prise et Perte de Poids",
      icon: Scale,
      image: './Services_Prise_et_perte_de_poids.jpg',
      details: "En cas de troubles émotionnels ou psychologiques liés au poids, le suivi est possible uniquement si un accompagnement psychologique est déjà en place."
    },
    {
      title: "Nutrition Thérapeutique",
      icon: Heart,
      image: './Services_Nutrition_thérapeutique.jpg',
      details: "Suivi possible pour la majorité des maladies chroniques; si les recommandations et traitements médicaux sont respectés. Le suivi ne s'adresse pas aux femmes enceintes."
    },
    {
      title: "Nutrition Sportive",
      icon: Target,
      image: './Services_Nutrition_sportive.jpg',
      details: "Pour débutants et sportifs de haut niveau, sauf en cas de dopage ou d'objectifs contraires au bien-être physique."
    }
  ];

  return (
    <section id="services" className="py-20 bg-[#FDFCE9]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-[#3D5919] text-center mb-12 playfair-display">
          J'accompagne les femmes, les hommes et les enfants pour :
        </h2>
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Service 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
            {services[0].image && (
              <div className="h-64 overflow-hidden bg-gray-100">
                <OptimizedImage 
                  src={require('./optimized/Services_Prise_et_perte_de_poids.webp')} 
                  fallbackSrc={require('./Services_Prise_et_perte_de_poids.png')}
                  alt={services[0].title}
                  className="w-full h-full object-cover scale-95 hover:scale-110 transition-transform duration-300"
                />
              </div>
            )}
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center mb-4">
                <div className="bg-[#D6E2B4] p-3 rounded-full mr-4">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#3D5919] playfair-display">{services[0].title}</h3>
              </div>
              <div className="mt-auto">
                <button
                  onClick={() => setExpandedService1(!expandedService1)}
                  className="text-[#3D5919] hover:text-[#2A3F0F] font-semibold flex items-center montserrat-medium"
                >
                  {expandedService1 ? 'Masquer' : 'Voir les détails'} 
                  {expandedService1 ? <Minus className="w-4 h-4 ml-2" /> : <Plus className="w-4 h-4 ml-2" />}
                </button>
                {expandedService1 && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 montserrat-medium leading-relaxed">{services[0].details}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Service 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
            {services[1].image && (
              <div className="h-64 overflow-hidden bg-gray-100">
               <OptimizedImage 
                src={require('./optimized/Services_Nutrition_thérapeutique.webp')} 
                fallbackSrc={require('./Services_Nutrition_thérapeutique.jpg')}
                alt={services[1].title}
                className="w-full h-full object-cover scale-95 hover:scale-110 transition-transform duration-300"
              />
              </div>
            )}
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center mb-4">
                <div className="bg-[#D6E2B4] p-3 rounded-full mr-4">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#3D5919] playfair-display">{services[1].title}</h3>
              </div>
              <div className="mt-auto">
                <button
                  onClick={() => setExpandedService2(!expandedService2)}
                  className="text-[#3D5919] hover:text-[#2A3F0F] font-semibold flex items-center montserrat-medium"
                >
                  {expandedService2 ? 'Masquer' : 'Voir les détails'} 
                  {expandedService2 ? <Minus className="w-4 h-4 ml-2" /> : <Plus className="w-4 h-4 ml-2" />}
                </button>
                {expandedService2 && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 montserrat-medium leading-relaxed">{services[1].details}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Service 3 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
            {services[2].image && (
              <div className="h-64 overflow-hidden bg-gray-100">
                <OptimizedImage 
                  src={require('./optimized/Services_Nutrition_sportive.webp')} 
                  fallbackSrc={require('./Services_Nutrition_sportive.jpg')}
                  alt={services[2].title}
                  className="w-full h-full object-cover scale-95 hover:scale-110 transition-transform duration-300"
                />
              </div>
            )}
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center mb-4">
                <div className="bg-[#D6E2B4] p-3 rounded-full mr-4">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#3D5919] playfair-display">{services[2].title}</h3>
              </div>
              <div className="mt-auto">
                <button
                  onClick={() => setExpandedService3(!expandedService3)}
                  className="text-[#3D5919] hover:text-[#2A3F0F] font-semibold flex items-center montserrat-medium"
                >
                  {expandedService3 ? 'Masquer' : 'Voir les détails'} 
                  {expandedService3 ? <Minus className="w-4 h-4 ml-2" /> : <Plus className="w-4 h-4 ml-2" />}
                </button>
                {expandedService3 && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 montserrat-medium leading-relaxed">{services[2].details}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .playfair-display {
          font-family: 'Playfair Display', serif;
        }
        .montserrat-medium {
          font-family: 'Montserrat', sans-serif;
          font-weight: 500;
        }
      `}</style>
    </section>
  );
};

// Benefits Section Component
const BenefitsSection = () => {
  const [expandedBenefit1, setExpandedBenefit1] = useState(false);
  const [expandedBenefit2, setExpandedBenefit2] = useState(false);
  const [expandedBenefit3, setExpandedBenefit3] = useState(false);

  const benefits = [
    {
      title: "Analyse & Compréhension",
      buttonText: "Savoir plus",
      details: [
        "Analyse complète de votre dossier : antécédents, maladies, traitements et mode de vie",
        "Prise en compte de votre état de santé global, symptômes, traitements et contexte médical",
        "Identification des erreurs alimentaires et des causes profondes",
        "Définition précise de vos objectifs et de vos besoins réels"
      ]
    },
    {
      title: "Programme sur-mesure évolutif",
      buttonText: "Détails sur LE programme",
      details: [
        "Programme personnalisé renouvelé tous les 15 jours",
        "Plans détaillés : repas, quantités, alternatives, idées recettes...",
        "Programme axé sur le traitement des causes profondes",
        "Ajustements réguliers selon vos retours et votre évolution"
      ]
    },
    {
      title: "Outils concrets & guidance",
      buttonText: "Savoir plus",
      details: [
        "E-book recettes et snacks healthy tous les 15 jours",
        "E-book sport (si votre santé le permet)",
        "Accès à une approche nutritionnelle claire et scientifique",
        "Accès à des vidéos explicatives et outils pratiques",
        "Disponibilité 5 jours /7 pour répondre à vos questions et ajuster votre plan"
      ]
    }
  ];

  return (
    <section className="py-20 bg-[#D6E2B4]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-[#3D5919] text-center mb-12 playfair-display">Vous bénéficiez de :</h2>
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Benefit 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-[#3D5919] mb-4 playfair-display">{benefits[0].title}</h3>
              <button
                onClick={() => setExpandedBenefit1(!expandedBenefit1)}
                className="text-[#3D5919] hover:text-[#2A3F0F] font-semibold flex items-center montserrat-medium"
              >
                {expandedBenefit1 ? 'Masquer' : benefits[0].buttonText}
                {expandedBenefit1 ? <Minus className="w-4 h-4 ml-2" /> : <Plus className="w-4 h-4 ml-2" />}
              </button>
              {expandedBenefit1 && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <ul className="space-y-2">
                    {benefits[0].details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-600 montserrat-medium">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-[#3D5919] mb-4 playfair-display">{benefits[1].title}</h3>
              <button
                onClick={() => setExpandedBenefit2(!expandedBenefit2)}
                className="text-[#3D5919] hover:text-[#2A3F0F] font-semibold flex items-center montserrat-medium"
              >
                {expandedBenefit2 ? 'Masquer' : benefits[1].buttonText}
                {expandedBenefit2 ? <Minus className="w-4 h-4 ml-2" /> : <Plus className="w-4 h-4 ml-2" />}
              </button>
              {expandedBenefit2 && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <ul className="space-y-2">
                    {benefits[1].details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-600 montserrat-medium">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-[#3D5919] mb-4 playfair-display">{benefits[2].title}</h3>
              <button
                onClick={() => setExpandedBenefit3(!expandedBenefit3)}
                className="text-[#3D5919] hover:text-[#2A3F0F] font-semibold flex items-center montserrat-medium"
              >
                {expandedBenefit3 ? 'Masquer' : benefits[2].buttonText}
                {expandedBenefit3 ? <Minus className="w-4 h-4 ml-2" /> : <Plus className="w-4 h-4 ml-2" />}
              </button>
              {expandedBenefit3 && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <ul className="space-y-2">
                    {benefits[2].details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-600 montserrat-medium">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <button onClick={() => window.open('https://calendly.com/dieteticienne-ajibe-rim/consultation-gratuite?primary_color=3D5919&text_color=000000&background_color=ffffff&hide_event_type_details=1&hide_gdpr_banner=1', '_blank')} className="bg-[#3D5919] text-[#FDFCE9] px-8 py-4 rounded-full text-lg hover:bg-[#3D5919] hover:text-white transition-all font-bold montserrat-medium border-none cursor-pointer">Je prends mon rendez-vous</button>
        </div>
      </div>
    </section>
  );
};

// Pricing Section Component
const PricingSection = () => {
  const plans = [
    { duration: "1 mois", type: "Basique", price: "600 MAD", color: "bg-[#D6E2B4]" },
    { duration: "2 mois", type: "Optimal", price: "1000 MAD", color: "bg-[#3D5919]", popular: true },
    { duration: "3 mois", type: "Ultime", price: "1500 MAD", color: "bg-[#D6E2B4]" }
  ];

  return (
    <section className="py-20 bg-[#FDFCE9]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-[#3D5919] text-center mb-4 playfair-display">Formules et Tarifs</h2>
        <p className="text-[#3D5919] text-center mb-12 italic montserrat-medium">**NOTE IMPORTANTE : Le paiement se fait en une seule fois.</p>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`rounded-lg p-8 text-center transform hover:scale-105 transition-transform ${plan.popular ? 'bg-white text-[#3D5919] scale-105 shadow-xl' : 'bg-[#D6E2B4] text-[#3D5919] shadow-lg'}`}>
              {plan.popular && (
                <div className="bg-[#3D5919] text-white text-sm px-4 py-1 rounded-full inline-block mb-4 montserrat-medium">
                  Plus populaire
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2 playfair-display">{plan.duration}</h3>
              <p className="text-xl mb-4 montserrat-medium">{plan.type}</p>
              <p className="text-4xl font-bold mb-6 playfair-display">{plan.price}</p>
              <button 
                onClick={() => window.open('https://calendly.com/dieteticienne-ajibe-rim/consultation-gratuite?primary_color=3D5919&text_color=000000&background_color=ffffff&hide_event_type_details=1&hide_gdpr_banner=1', '_blank')}
                className={`block w-full py-3 px-6 rounded-full font-semibold transition-colors montserrat-medium ${plan.popular ? 'bg-[#3D5919] text-white hover:bg-[#2A3F0F]' : 'bg-white text-[#3D5919] hover:bg-gray-100'}`}
              >
                Choisir
              </button>
            </div>
          ))}
        </div>
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-[#D6E2B4] to-[#E8F2CC] rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-[#3D5919] mb-4 playfair-display">
                Vous hésitez encore ?
              </h3>
              <p className="text-[#3D5919] mb-6 montserrat-medium">
                Commencez par une consultation de découverte pour déterminer ensemble le meilleur plan pour vous
              </p>
              <button 
                onClick={() => window.open('https://calendly.com/dieteticienne-ajibe-rim/consultation-gratuite?primary_color=3D5919&text_color=000000&background_color=ffffff&hide_event_type_details=1&hide_gdpr_banner=1', '_blank')}
                className="inline-flex items-center bg-[#3D5919] text-white px-8 py-4 rounded-full text-lg hover:bg-[#2A3F0F] transition-all transform hover:scale-105 font-bold montserrat-medium shadow-lg border-none cursor-pointer"
              >
                Je prends mon rendez-vous
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Important Notice Section Component
const ImportantNoticeSection = () => {
  return (
    <section className="py-20 bg-[#D6E2B4]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-[#FDFCE9] rounded-lg shadow-xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3D5919] mb-8 playfair-display">IMPORTANT... AVANT DE COMMENCER !</h2>
          <div className="space-y-6 text-gray-700 montserrat-medium">
            <p className="text-lg">
              Si vous choisissez de travailler ensemble...c'est parce que vous savez que vous méritez un accompagnement sur-mesure, 
              fondé sur des solutions concrètes et adaptées à VOTRE vie — et que vous souhaitez enfin comprendre ce dont votre corps a vraiment besoin.
            </p>
            <p className="text-lg">
              Mais surtout, vous acceptez que <span className="font-bold">vous êtes l'acteur·rice</span> clé de votre transformation. 
              <span className="font-bold"> Personne ne peut faire ce chemin à votre place,</span> et c'est ce pouvoir entre vos mains qui fait toute la différence.
            </p>
            <p className="text-lg">
              Pour avancer, il faudra de <span className="font-bold">la patience, un engagement sincère, une communication transparente et de la durabilité.</span> 
              Je ne suis pas là pour juger, ni pour simplement célébrer vos succès. <span className="italic">Je suis là pour vous soutenir, surtout quand c'est difficile, et vous aider à garder le cap.</span>
            </p>
            <p className="text-lg">
              Travailler ensemble, c'est choisir une démarche scientifique, loin des idées reçues et des conseils douteux qui vous ont freiné jusque-là. 
              <span className="italic font-bold text-[#3D5919]"> Cette confiance mutuelle est la force qui vous mènera vers des résultats durables et personnalisés.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// FAQ Section Component
const FAQSection = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    { 
      question: "Le suivi est-il adapté à tout le monde ?",
      answer: "Ce suivi ne convient pas à ceux qui ne sont pas prêts à changer leurs habitudes et à faire de leur santé une priorité. Il n'est pas adapté à ceux qui veulent simplement essayer sans réelle intention, ni à ceux qui pensent que le rôle d'un diététicien est de convaincre, de sanctionner ou d'approuver systématiquement les choix personnels. Ce sont les patients qui sont acteurs de leur progression : je guide, j'accompagne, mais c'est à eux de prendre l'initiative."
    },
    { 
      question: "Combien de temps faut-il pour voir des résultats ?",
      answer: "Chaque corps réagit différemment. Il est impossible de donner un délai précis, mais plus vous êtes régulier(ère) et impliqué(e), plus les résultats apparaissent rapidement. Un changement physique visible et une bonne adaptation au plan nécessitent au moins 3 mois d'application."
    },
    { 
      question: "Et si je ne veux pas consommer de féculents ?",
      answer: "Les féculents, bien choisis, ne font ni grossir ni nuisent à la santé. S'ils figurent dans votre plan, c'est qu'ils sont nécessaires. Leur retrait ne se fait que pour des raisons médicales et toujours de manière encadrée. Je reste ouverte à toutes les approches validées par la science, y compris le keto, si je considère que c'est pertinent pour votre santé. Chaque plan est adapté à vos besoins, vos objectifs et votre physiologie."
    },
    { 
      question: "Combien je vais perdre de kilogrammes par semaine ?",
      answer: "Personne ne peut prédire un résultat exact. La perte de poids dépend de nombreux facteurs : adhésion au plan, métabolisme, âge, antécédents, hormones, maladies...etc. Selon les recommandations officielles (ex :HAS, ANSES), une perte progressive et saine est de l'ordre de 500 g à 1kg par semaine. Les résultats prennent du temps et demandent de la patience."
    },
    { 
      question: "Je n'ai pas le temps pour cuisiner, que conseillez-vous ?",
      answer: "Pas de solution miracle : apprendre à cuisiner simplement fait partie du processus. Je vous guide aussi pour savoir choisir les bons plats à l'extérieur quand c'est nécessaire."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-[#D6E2B4]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-[#3D5919] text-center mb-12 playfair-display">Questions Fréquentes</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-[#3D5919] montserrat-medium">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-[#3D5919] transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`} />
              </button>
              {expandedFaq === index && (
                <div className="px-6 py-4 bg-gray-50 text-gray-700 animate-fade-in montserrat-medium">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button onClick={() => window.open('https://calendly.com/dieteticienne-ajibe-rim/consultation-gratuite?primary_color=3D5919&text_color=000000&background_color=ffffff&hide_event_type_details=1&hide_gdpr_banner=1', '_blank')} className="bg-[#3D5919] text-white px-4 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-lg hover:bg-[#2A3F0F] transition-all transform hover:scale-105 montserrat-medium border-none cursor-pointer">Je prends mon rendez-vous</button>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section Component
const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    { text: "J'ai fait plusieurs suivis avant et à chaque fois les plans me stressaient. Là, c'est la première fois que je me sens à l'aise, comme si je l'avais fait moi-même. Merci beaucoup.", author: "O.L" },
    { text: "Au début si tu te rappelles j'avais peur de ne pas perdre et là je perds 1kg chaque 10 jours. Incroyable pour moi.", author: "N.M" },
    { text: "En même pas un mois j'ai réussi à diminuer ma peur des féculents que j'avais depuis super longtemps.", author: "R.F" },
    { text: "Au début c'était dur, mais comme tu m'as dit pas de miracle, que de la patience et discipline. Et franchement ça marche.", author: "S.B" },
    { text: "Expérience positive, j'ai perdu 3kg en 28 jours et le plus beau c'est que toute la famille est revenue à l'équilibre.", author: "Z.I" },
    { text: "En un mois j'ai perdu 4 cm de tour de taille, hyper contente et ça continue.", author: "G.E" },
    { text: "Tbarkallah 3lik, le programme est clair, les conseils à côté super utiles, et surtout j'ai adoré comment tu m'as aidée à corriger mes assiettes.", author: "J.K" },
    { text: "Le plan me va trop bien, diversifié, rapide, facile à préparer, et surtout ça donne un vrai résultat hamdoulilah.", author: "A.B" }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#FDFCE9] to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-[#D6E2B4] rounded-full opacity-10 blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#3D5919] mb-4 playfair-display">
            Vos témoignages!
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#3D5919] to-[#3D5919] mx-auto rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main testimonial card */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
              
              {/* Content */}
              <div className="relative z-10 text-center py-8 px-4 sm:px-8 md:px-12">
                <blockquote className="text-lg sm:text-xl md:text-2xl text-gray-700 italic mb-8 leading-relaxed montserrat-medium">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                
                {/* Author */}
                <div className="flex items-center justify-center">
                  <div className="w-8 sm:w-16 h-0.5 bg-[#D6E2B4] mr-2 sm:mr-4"></div>
                  <p className="text-base sm:text-lg font-bold text-[#3D5919] playfair-display">
                    {testimonials[currentTestimonial].author}
                  </p>
                  <div className="w-8 sm:w-16 h-0.5 bg-[#D6E2B4] ml-2 sm:ml-4"></div>
                </div>
              </div>
              
              {/* Navigation arrows - adjusted for mobile */}
              <button
                onClick={prevTestimonial}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 p-2 sm:p-3 bg-[#D6E2B4] hover:bg-[#3D5919] text-[#3D5919] hover:text-white rounded-full transition-all duration-300 group z-20"
                aria-label="Témoignage précédent"
              >
                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 p-2 sm:p-3 bg-[#D6E2B4] hover:bg-[#3D5919] text-[#3D5919] hover:text-white rounded-full transition-all duration-300 group z-20"
                aria-label="Témoignage suivant"
              >
                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
            
            {/* Progress indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`transition-all duration-300 ${
                    currentTestimonial === index 
                      ? 'w-8 h-2 bg-[#3D5919] rounded-full' 
                      : 'w-2 h-2 bg-gray-300 hover:bg-gray-400 rounded-full'
                  }`}
                  aria-label={`Aller au témoignage ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-16">
          <button 
            onClick={() => window.open('https://calendly.com/dieteticienne-ajibe-rim/consultation-gratuite?primary_color=3D5919&text_color=000000&background_color=ffffff&hide_event_type_details=1&hide_gdpr_banner=1', '_blank')}
            className="inline-block bg-gradient-to-r from-[#3D5919] to-[#2A3F0F] text-white px-8 py-4 rounded-full text-lg hover:shadow-2xl transition-all transform hover:scale-105 font-bold montserrat-medium border-none cursor-pointer"
          >
            Je prends mon rendez-vous
          </button>
        </div>
      </div>

      <style jsx>{`
        .playfair-display {
          font-family: 'Playfair Display', serif;
        }
        .montserrat-medium {
          font-family: 'Montserrat', sans-serif;
          font-weight: 500;
        }
      `}</style>
    </section>
  );
};

// Resources Section Component
const ResourcesSection = () => {
  return (
    <section id="ressources" className="py-20 bg-[#FDFCE9]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-[#3D5919] text-center mb-12 playfair-display">Ressources</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="bg-[#D6E2B4] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-[#3D5919]" />
            </div>
            <h3 className="text-xl font-bold text-[#3D5919] mb-4 playfair-display">E-books Nutrition</h3>
            <p className="text-gray-600 mb-4 montserrat-medium">Recettes saines et guides nutritionnels adaptés à votre mode de vie</p>
            <a href="#" className="text-[#3D5919] hover:text-[#2A3F0F] font-semibold montserrat-medium">En savoir plus →</a>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="bg-[#D6E2B4] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Clock className="w-8 h-8 text-[#3D5919]" />
            </div>
            <h3 className="text-xl font-bold text-[#3D5919] mb-4 playfair-display">Programmes Sport</h3>
            <p className="text-gray-600 mb-4 montserrat-medium">Exercices adaptés à votre condition physique et vos objectifs</p>
            <a href="#" className="text-[#3D5919] hover:text-[#2A3F0F] font-semibold montserrat-medium">En savoir plus →</a>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="bg-[#D6E2B4] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Heart className="w-8 h-8 text-[#3D5919]" />
            </div>
            <h3 className="text-xl font-bold text-[#3D5919] mb-4 playfair-display">Outils Pratiques</h3>
            <p className="text-gray-600 mb-4 montserrat-medium">Vidéos explicatives et conseils pour votre quotidien</p>
            <a href="#" className="text-[#3D5919] hover:text-[#2A3F0F] font-semibold montserrat-medium">En savoir plus →</a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Blog Section Component
const BlogSection = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const blogPosts = [
    {
      id: 1,
      title: "Les bases d'une alimentation équilibrée",
      excerpt: "Découvrez les principes fondamentaux pour une nutrition saine et durable.",
      date: "15 Janvier 2025",
      image: "🥗",
      category: "Nutrition",
      readTime: "5 min",
      content: "Une alimentation équilibrée repose sur la variété et la modération. Il est essentiel d'inclure tous les groupes alimentaires : fruits et légumes, protéines, glucides complexes, et bonnes graisses. L'hydratation joue également un rôle crucial. Privilégiez les aliments non transformés et écoutez les signaux de votre corps.",
      tags: ["équilibre", "nutrition", "santé"]
    },
    {
      id: 2,
      title: "Mythe ou réalité : les féculents font-ils grossir ?",
      excerpt: "Démystifions ensemble les idées reçues sur les glucides complexes.",
      date: "10 Janvier 2025",
      image: "🍞",
      category: "Mythes",
      readTime: "7 min",
      content: "Les féculents ne font pas grossir par eux-mêmes. C'est la quantité, la qualité et l'accompagnement qui comptent. Les glucides complexes sont essentiels pour l'énergie et le bon fonctionnement du cerveau. Choisissez des féculents complets et adaptez les portions à vos besoins énergétiques.",
      tags: ["féculents", "glucides", "perte de poids"]
    },
    {
      id: 3,
      title: "Comment maintenir sa motivation sur le long terme",
      excerpt: "Les clés psychologiques pour réussir votre transformation nutritionnelle.",
      date: "5 Janvier 2025",
      image: "💪",
      category: "Psychologie",
      readTime: "6 min",
      content: "La motivation fluctue naturellement. L'important est de créer des habitudes durables plutôt que de dépendre uniquement de la motivation. Fixez-vous des objectifs réalistes, célébrez les petites victoires, et n'hésitez pas à demander du soutien. La patience et la bienveillance envers soi-même sont essentielles.",
      tags: ["motivation", "habitudes", "psychologie"]
    },
    {
      id: 4,
      title: "Hydratation : combien d'eau boire par jour ?",
      excerpt: "L'importance de l'hydratation dans votre équilibre nutritionnel.",
      date: "1 Janvier 2025",
      image: "💧",
      category: "Hydratation",
      readTime: "4 min",
      content: "Les besoins en eau varient selon l'âge, l'activité physique et le climat. En général, 1,5 à 2L par jour sont recommandés. L'eau aide à la digestion, au transport des nutriments et à l'élimination des déchets. Écoutez votre soif et observez la couleur de vos urines comme indicateur d'hydratation.",
      tags: ["hydratation", "eau", "santé"]
    },
    {
      id: 5,
      title: "Gestion du stress et alimentation émotionnelle",
      excerpt: "Comment le stress influence nos choix alimentaires et que faire.",
      date: "28 Décembre 2024",
      image: "🧘‍♀️",
      category: "Bien-être",
      readTime: "8 min",
      content: "Le stress chronique peut perturber nos habitudes alimentaires. Il est important de reconnaître les signaux de faim émotionnelle versus physique. Des techniques de gestion du stress comme la méditation, la respiration profonde et l'activité physique peuvent aider à retrouver un rapport sain à l'alimentation.",
      tags: ["stress", "émotions", "bien-être"]
    },
    {
      id: 6,
      title: "Nutrition pendant l'exercice physique",
      excerpt: "Optimiser votre alimentation avant, pendant et après l'effort.",
      date: "20 Décembre 2024",
      image: "🏃‍♀️",
      category: "Sport",
      readTime: "9 min",
      content: "L'alimentation autour de l'exercice doit être adaptée à l'intensité et à la durée de l'effort. Avant : privilégiez les glucides. Pendant : hydratez-vous régulièrement. Après : combinez protéines et glucides pour la récupération. La timing et la composition des repas jouent un rôle crucial dans les performances.",
      tags: ["sport", "performance", "récupération"]
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const postsPerPage = 3;

  const categories = ['Tous', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = selectedCategory === 'Tous' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleReadMore = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  return (
    <section id="blog" className="py-20 bg-[#D6E2B4]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-[#3D5919] text-center mb-8 playfair-display">Blog</h2>
        <p className="text-center text-[#3D5919] mb-12 montserrat-medium max-w-2xl mx-auto">
          Découvrez mes conseils, astuces et réflexions pour une vie plus saine et équilibrée
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full transition-all montserrat-medium ${
                selectedCategory === category
                  ? 'bg-[#3D5919] text-white'
                  : 'bg-white text-[#3D5919] hover:bg-[#3D5919] hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {currentPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{post.image}</span>
                  <span className="bg-[#D6E2B4] text-[#3D5919] px-3 py-1 rounded-full text-xs font-semibold montserrat-medium">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#3D5919] mb-3 playfair-display">{post.title}</h3>
                <p className="text-gray-600 mb-4 montserrat-medium">{post.excerpt}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded montserrat-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500 montserrat-medium">
                    <span>{post.date}</span> • <span>{post.readTime}</span>
                  </div>
                  <button 
                    onClick={() => handleReadMore(post)}
                    className="text-[#3D5919] hover:text-[#2A3F0F] font-semibold montserrat-medium flex items-center group"
                  >
                    Lire plus 
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mb-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-white text-[#3D5919] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#3D5919] hover:text-white transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 rounded-full transition-all montserrat-medium ${
                  currentPage === index + 1
                    ? 'bg-[#3D5919] text-white'
                    : 'bg-white text-[#3D5919] hover:bg-[#3D5919] hover:text-white'
                }`}
              >
                {index + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-white text-[#3D5919] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#3D5919] hover:text-white transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="text-center">
          <button onClick={() => window.open('https://calendly.com/dieteticienne-ajibe-rim/consultation-gratuite?primary_color=3D5919&text_color=000000&background_color=ffffff&hide_event_type_details=1&hide_gdpr_banner=1', '_blank')} className="bg-[#3D5919] text-white px-4 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-lg hover:bg-[#2A3F0F] transition-all transform hover:scale-105 montserrat-medium border-none cursor-pointer">Je prends mon rendez-vous</button>
        </div>
      </div>

      {/* Blog Post Modal */}
      {selectedPost && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg max-w-2xl max-h-[90vh] overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{selectedPost.image}</span>
            <div>
              <span className="bg-[#D6E2B4] text-[#3D5919] px-3 py-1 rounded-full text-sm font-semibold montserrat-medium">
                {selectedPost.category}
              </span>
              <h2 className="text-2xl font-bold text-[#3D5919] mt-2 playfair-display">{selectedPost.title}</h2>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex items-center gap-4 mt-4 text-sm text-gray-500 montserrat-medium">
          <span>{selectedPost.date}</span>
          <span>•</span>
          <span>{selectedPost.readTime}</span>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-700 leading-relaxed mb-6 montserrat-medium">{selectedPost.content}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedPost.tags.map((tag, index) => (
            <span key={index} className="bg-[#D6E2B4] text-[#3D5919] px-3 py-1 rounded-full text-sm montserrat-medium">
              #{tag}
            </span>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={closeModal}
            className="bg-[#3D5919] text-white px-4 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-lg hover:bg-[#2A3F0F] transition-all transform hover:scale-105 montserrat-medium inline-block w-full max-w-xs sm:max-w-md md:max-w-lg"
          >
            Prendre rendez-vous pour en savoir plus
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </section>
  );
};

// Footer Component
const Footer = ({ onNavigate, currentPage }) => {
  const [newsletterData, setNewsletterData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription:', newsletterData);
    alert('Merci pour votre inscription à la newsletter !');
    setNewsletterData({ firstName: '', lastName: '', email: '' });
  };

  const handleNewsletterChange = (e) => {
    setNewsletterData({
      ...newsletterData,
      [e.target.name]: e.target.value
    });
  };

  const handleNavigation = (target) => {
    if (currentPage !== 'home') {
      // If we're not on home page, first go to home, then scroll to section
      onNavigate('home');
      // Use setTimeout to ensure the home page loads before scrolling
      setTimeout(() => {
        const element = document.getElementById(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If we're already on home page, just scroll to section
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#3D5919] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Brand Column */}
          <div>
            <h3 className="text-xl font-bold mb-3 agrandir-wide">Dt. Rim Ajibe</h3>
            <p className="text-gray-300 text-sm mb-3 montserrat-medium">
              Diététicienne Clinicienne & Nutritionniste
            </p>
            <div className="space-y-2 mb-3">
              <a href="tel:+212614216149" className="flex items-center text-gray-300 hover:text-white transition-colors text-sm">
                <Phone className="w-4 h-4 mr-2" />
                +212 614-216149
              </a>
              <a href="mailto:dieteticienne.ajibe.rim@gmail.com" className="flex items-center text-gray-300 hover:text-white transition-colors text-sm break-all">
                <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                dieteticienne.ajibe.rim@gmail.com
              </a>
            </div>
            <div className="flex space-x-3">
              <a href="https://www.instagram.com/diet.rim.ajibe/" target="_blank" rel="noopener noreferrer" className="hover:text-[#D6E2B4] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/rim-ajibe-22a191338" target="_blank" rel="noopener noreferrer" className="hover:text-[#D6E2B4] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-lg font-bold mb-3 playfair-display">Navigation</h4>
            <ul className="space-y-2 text-sm montserrat-medium">
              <li><button onClick={() => handleNavigation('accueil')} className="hover:text-[#D6E2B4] transition-colors bg-transparent border-none cursor-pointer text-left w-full montserrat-medium">Accueil</button></li>
              <li><button onClick={() => handleNavigation('services')} className="hover:text-[#D6E2B4] transition-colors bg-transparent border-none cursor-pointer text-left w-full montserrat-medium">Services</button></li>
              <li><button onClick={() => handleNavigation('qui-suis-je')} className="hover:text-[#D6E2B4] transition-colors bg-transparent border-none cursor-pointer text-left w-full montserrat-medium">Qui suis-je ?</button></li>
              <li><button onClick={() => onNavigate('resources')} className="hover:text-[#D6E2B4] transition-colors bg-transparent border-none cursor-pointer text-left w-full montserrat-medium">Ressources</button></li>
              <li><button onClick={() => onNavigate('blog')} className="hover:text-[#D6E2B4] transition-colors bg-transparent border-none cursor-pointer text-left w-full montserrat-medium">Blog</button></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-lg font-bold mb-3 playfair-display">Contact</h4>
            <p className="text-gray-300 text-xs mb-4 montserrat-medium">
              Prenez rendez-vous pour votre consultation
            </p>
            <div className="space-y-2"> 
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  name="firstName"
                  value={newsletterData.firstName}
                  onChange={handleNewsletterChange}
                  placeholder="Nom"
                  className="w-full px-3 py-2 bg-white text-gray-800 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-[#D6E2B4] montserrat-medium placeholder:text-gray-400"
                />
                <input
                  type="text"
                  name="lastName"
                  value={newsletterData.lastName}
                  onChange={handleNewsletterChange}
                  placeholder="Prénom"
                  className="w-full px-3 py-2 bg-white text-gray-800 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-[#D6E2B4] montserrat-medium placeholder:text-gray-400"
                />
              </div>
              <input
                type="email"
                name="email"
                value={newsletterData.email}
                onChange={handleNewsletterChange}
                placeholder="Email"
                className="w-full px-3 py-2 bg-white text-gray-800 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-[#D6E2B4] montserrat-medium placeholder:text-gray-400"
              />
              <button
                onClick={handleNewsletterSubmit}
                className="w-full bg-white text-[#3D5919] px-4 py-2 rounded-full hover:bg-[#D6E2B4] transition-colors font-bold text-xs montserrat-medium"
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-white/10 text-center">
          <p className="text-xs text-gray-300 montserrat-medium">
            © 2025 Dt Rim Ajibe. Tous droits réservés. Made by{' '}
            <a 
              href="https://nerdsdev.pro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-[#D6E2B4] transition-colors font-semibold"
            >
              Nerdsdev
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        .playfair-display {
          font-family: 'Playfair Display', serif;
        }
        .montserrat-medium {
          font-family: 'Montserrat', sans-serif;
          font-weight: 500;
        }
      `}</style>
    </footer>
  );
};

// Main App Component
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'resources', 'blog'

  useEffect(() => {
    // Preload critical images
    preloadImages();
    
    // Monitor image loading performance
    setTimeout(() => {
      reportImagePerformance();
    }, 1000);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking on links
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', () => setIsMenuOpen(false));
    });
    return () => {
      links.forEach(link => {
        link.removeEventListener('click', () => setIsMenuOpen(false));
      });
    };
  }, []);

  // Handle navigation to dedicated pages
  const handleNavigation = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    
    // Scroll to top when navigating to resources or blog pages
    if (page === 'resources' || page === 'blog') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle back navigation
  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  // Render the appropriate content based on current page
  const renderContent = () => {
    switch (currentPage) {
      case 'resources':
        return <ResourcesPage />;
      case 'blog':
        return <BlogPage />;
      default:
        return (
          <>
            <HeroSection />
            
            <QuoteSection 
              quote="Je vous montre le chemin...et c'est vous qui avancez. Car, le changement demande de l'implication!" 
              author=""
            />
            
            <AboutSection />
            
            <QuoteSection 
              quote="Je vous accompagne avec bienveillance pour retrouver un équilibre durable entre votre corps et votre alimentation." 
              author="Dt. Rim Ajibe"
              bgColor="bg-[#FDFCE9]"
            />
            
            <PhilosophySection />
            
            <QuoteSection 
              quote="Les changements temporaires donnent des résultats temporaires... C'est l'équilibre sur le long terme qui transforme !"
              bgColor="bg-[#D6E2B4]"
            />
            
            <ServicesSection />
            
            <BenefitsSection />
            
            <PricingSection />
            
            <ImportantNoticeSection />
            
            <TestimonialsSection />
            
            <FAQSection />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCE9]">
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      {/* Agrandir Wide Font */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Agrandir+Wide:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <Header scrolled={scrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} onNavigate={handleNavigation} currentPage={currentPage} />
      
      {renderContent()}
      
      <Footer onNavigate={handleNavigation} currentPage={currentPage} />

      <style jsx>{`
        .playfair-display {
          font-family: 'Playfair Display', serif;
        }
        .montserrat-medium {
          font-family: 'Montserrat', sans-serif;
          font-weight: 500;
        }
        .agrandir-wide {
          font-family: 'Agrandir Wide', sans-serif;
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
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};


export default App;