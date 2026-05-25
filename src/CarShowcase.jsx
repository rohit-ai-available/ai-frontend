
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Gauge, Fuel, Zap, Shield, Star, ArrowRight } from 'lucide-react';

// Car data with high-quality Unsplash images
const cars = [
  {
    id: 1,
    name: "Porsche 911 GT3",
    tagline: "Pure Performance, Unmatched Precision",
    image: "https://images.unsplash.com/photo-1679478878852-bb238b7db287?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNhcnMlMjBwb3JzY2hlJTIwOTExfGVufDB8fDB8fHww",
    specs: { hp: "502 HP", speed: "0-60 in 3.2s", engine: "4.0L Flat-6" },
    price: "$169,700",
    color: "from-orange-500 to-red-600"
  },
  {
    id: 2,
    name: "Mercedes-AMG GT",
    tagline: "Luxury Meets Adrenaline",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1920&q=80",
    specs: { hp: "577 HP", speed: "0-60 in 3.1s", engine: "4.0L V8 Biturbo" },
    price: "$118,600",
    color: "from-blue-500 to-cyan-400"
  },
  {
    id: 3,
    name: "BMW M4 Competition",
    tagline: "The Ultimate Driving Machine",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1920&q=80",
    specs: { hp: "503 HP", speed: "0-60 in 3.4s", engine: "3.0L I6 Twin-Turbo" },
    price: "$84,100",
    color: "from-emerald-500 to-teal-400"
  }
];

const CarShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % cars.length);
      }, 5000);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % cars.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + cars.length) % cars.length);
  };

  const handleDotClick = (index) => {
    setIsAutoPlaying(false);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const currentCar = cars[currentIndex];

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.1
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    })
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" }
    })
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Image with Parallax Effect */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 }
          }}
          className="absolute inset-0"
        >
          {/* Image with overlay gradient */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentCar.image})` }}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{ 
              y: [null, Math.random() * -100],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Navigation Header */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            VELOCE<span className="text-red-500">.</span>
          </span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex items-center gap-8"
        >
          {['Models', 'Performance', 'Design', 'Technology'].map((item) => (
            <button 
              key={item}
              className="text-white/70 hover:text-white text-sm font-medium tracking-wide transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full" />
            </button>
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-sm font-semibold hover:bg-white/20 transition-all"
        >
          Book Test Drive
        </motion.button>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex items-center h-[calc(100vh-100px)] px-8 md:px-16 lg:px-24">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div key={currentIndex}>
              {/* Car Name */}
              <motion.h1
                custom={0}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none mb-4"
              >
                {currentCar.name.split(' ').map((word, i) => (
                  <span key={i} className={i === 0 ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400" : "text-red-500"}>
                    {word}{' '}
                  </span>
                ))}
              </motion.h1>

              {/* Tagline */}
              <motion.p
                custom={1}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="text-xl md:text-2xl text-gray-300 font-light mb-8"
              >
                {currentCar.tagline}
              </motion.p>

              {/* Specs Grid */}
              <motion.div
                custom={2}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-3 gap-6 mb-10"
              >
                {[
                  { icon: Zap, label: "Power", value: currentCar.specs.hp },
                  { icon: Gauge, label: "Acceleration", value: currentCar.specs.speed },
                  { icon: Fuel, label: "Engine", value: currentCar.specs.engine }
                ].map((spec, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                    <spec.icon className="w-5 h-5 text-red-400 mb-2" />
                    <p className="text-xs text-gray-400 uppercase tracking-wider">{spec.label}</p>
                    <p className="text-white font-bold text-lg">{spec.value}</p>
                  </div>
                ))}
              </motion.div>

              {/* Price and CTA */}
              <motion.div
                custom={3}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-6"
              >
                <div>
                  <p className="text-gray-400 text-sm">Starting at</p>
                  <p className="text-3xl font-bold text-white">{currentCar.price}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${currentCar.color} text-white rounded-full font-bold text-lg shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-shadow`}
                >
                  Explore Now
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Side Navigation */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
        {cars.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className="group relative flex items-center justify-end"
          >
            <span className={`mr-4 text-sm font-medium transition-all duration-300 ${
              index === currentIndex ? 'text-white opacity-100' : 'text-white/0 group-hover:text-white/50'
            }`}>
              0{index + 1}
            </span>
            <div className={`w-1 rounded-full transition-all duration-500 ${
              index === currentIndex 
                ? 'h-12 bg-red-500' 
                : 'h-3 bg-white/30 hover:bg-white/50'
            }`} />
          </button>
        ))}
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-8 left-8 right-8 z-20 flex items-end justify-between">
        {/* Progress Bar */}
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <span className="text-white/60 text-sm font-mono">0{currentIndex + 1}</span>
          <div className="flex-1 h-0.5 bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-red-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
              key={currentIndex}
            />
          </div>
          <span className="text-white/60 text-sm font-mono">0{cars.length}</span>
        </div>

        {/* Navigation Arrows */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Car Thumbnail Preview */}
      <div className="absolute bottom-8 right-32 z-20 hidden lg:flex gap-3">
        {cars.map((car, index) => (
          <motion.button
            key={car.id}
            onClick={() => handleDotClick(index)}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`relative w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
              index === currentIndex 
                ? 'border-red-500 shadow-lg shadow-red-500/30' 
                : 'border-white/20 opacity-50 hover:opacity-80'
            }`}
          >
            <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
            {index === currentIndex && (
              <motion.div 
                layoutId="activeIndicator"
                className="absolute inset-0 bg-red-500/20"
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};

export default CarShowcase;
