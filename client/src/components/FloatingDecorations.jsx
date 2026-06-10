const FloatingDecorations = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* CSS Clouds */}
      <div className="absolute top-12 left-10 w-24 h-10 bg-white/40 rounded-full blur-[2px] animate-pulse-soft hidden md:block" />
      <div className="absolute top-36 right-16 w-32 h-12 bg-white/30 rounded-full blur-[3px] animate-pulse-soft hidden md:block" />

      {/* Floating Stars */}
      <div className="absolute top-1/4 left-1/5 text-purple/20 text-lg animate-bounce duration-1000">✦</div>
      <div className="absolute top-1/3 right-1/4 text-pink/30 text-xl animate-bounce duration-1000">✦</div>
      <div className="absolute bottom-1/4 left-12 text-yellow/30 text-2xl animate-bounce duration-1000">★</div>

      {/* Floating Leaves */}
      <div className="absolute bottom-12 left-1/3 text-mint/45 text-2xl animate-pulse-soft">🍃</div>
      <div className="absolute bottom-32 right-12 text-mint/30 text-xl animate-pulse-soft">🌿</div>

      {/* Circle Orbs */}
      <div className="absolute top-10 right-1/3 w-8 h-8 rounded-full bg-pink/10 border border-pink/20 animate-pulse-soft" />
      <div className="absolute bottom-20 left-20 w-12 h-12 rounded-full bg-lavender/10 border border-lavender/25 animate-pulse-soft" />
    </div>
  );
};

export default FloatingDecorations;
