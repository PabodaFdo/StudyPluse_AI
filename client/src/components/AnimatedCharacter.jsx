import { useState } from 'react';
import { motion } from 'framer-motion';

const fallbackEmojis = {
  welcome: '👩‍🎓',
  reading: '📚',
  focus: '🎧',
  garden: '🌱',
  quest: '⭐',
  plant: '🪴',
};

const AnimatedCharacter = ({
  src,
  alt = 'StudyPulse AI Mascot',
  size = 'md',
  variant = 'welcome',
  className = '',
  showGlow = true,
  floating = true,
}) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: 'w-16 h-16 text-3xl',
    md: 'w-28 h-28 text-5xl',
    lg: 'w-44 h-44 text-7xl',
    xl: 'w-56 h-56 text-8xl',
  };

  const floatTransition = floating
    ? {
        y: {
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        },
      }
    : {};

  const floatAnimation = floating
    ? {
        y: [0, -10, 0],
      }
    : {};

  return (
    <motion.div
      animate={floatAnimation}
      transition={floatTransition}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`relative flex items-center justify-center select-none ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      {/* Background Glow */}
      {showGlow && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple/20 via-pink/20 to-lavender/10 blur-xl -z-10" />
      )}

      {/* Main Mascot Rendering */}
      {!hasError && src ? (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(139,92,246,0.15)]"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center rounded-3xl bg-white/60 border-2 border-white shadow-sm font-bold text-center">
          <span className="animate-bounce block">{fallbackEmojis[variant] || '🌱'}</span>
        </div>
      )}
    </motion.div>
  );
};

export default AnimatedCharacter;
export { fallbackEmojis };
