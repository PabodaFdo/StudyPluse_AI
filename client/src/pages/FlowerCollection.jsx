import { Album, Sparkles, Award } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Badge from '../components/Badge';
import AnimatedCharacter from '../components/AnimatedCharacter';

const FlowerCollection = () => {
  const collection = [
    { name: 'Rose', rarity: 'Common', level: 3, icon: '🌹', color: 'text-rose-400', condition: 'Unlocked by finishing Calculus III baseline tasks.' },
    { name: 'Sunflower', rarity: 'Common', level: 2, icon: '🌻', color: 'text-amber-400', condition: 'Unlocked by completing 3 focus sessions.' },
    { name: 'Lotus', rarity: 'Rare', level: 4, icon: '🪷', color: 'text-indigo-400', condition: 'Unlocked by maintaining 90% Subject Health.' },
    { name: 'Cherry Blossom', rarity: 'Epic', level: 1, icon: '🌸', color: 'text-pink-400', condition: 'Unlocked by completing 10 daily quests.' },
    { name: 'Lavender', rarity: 'Rare', level: 5, icon: '🪻', color: 'text-violet-400', condition: 'Unlocked by logging mood checks for 5 days.' },
    { name: 'Orchid', rarity: 'Legendary', level: 0, icon: '💮', color: 'text-fuchsia-400', condition: 'Unlocked only when overall subject health index reaches 95%.' },
  ];

  return (
    <div className="space-y-6 text-text-main">
      <PageHeader
        title="Flower Collection"
        subtitle="Review your unlocked digital flora, rarity tiers, and achievements."
        icon={Album}
      />

      {/* Mascot Achievement Summary */}
      <div className="liquid-card p-6 bg-gradient-to-r from-purple/10 to-pink/5 mb-6">
        <div className="liquid-card-content flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-base font-extrabold text-text-main">Unlock flowers by studying consistently</h3>
            <p className="text-xs text-text-muted font-bold">
              Keep completing daily focus cycles to unlock rare and exotic seedlings for your digital collection!
            </p>
          </div>
          <div className="flex-shrink-0">
            <AnimatedCharacter
              src="/src/assets/characters/plant-buddy.png"
              variant="plant"
              size="md"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {collection.map((f, i) => {
          const isLocked = f.level === 0;
          return (
            <div
              key={i}
              className={`liquid-card p-5 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 ${
                isLocked ? 'opacity-65 bg-white/40' : 'bg-white'
              }`}
            >
              <div className="liquid-card-content flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-4xl ${isLocked ? 'grayscale opacity-30' : f.color}`}>{f.icon}</span>
                    <Badge
                      color={
                        f.rarity === 'Legendary'
                          ? 'purple'
                          : f.rarity === 'Epic'
                          ? 'red'
                          : f.rarity === 'Rare'
                          ? 'blue'
                          : 'green'
                      }
                    >
                      {f.rarity}
                    </Badge>
                  </div>
                  <h3 className="font-extrabold text-text-main text-base mt-2">{f.name}</h3>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">{f.condition}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-lavender/10 flex items-center justify-between text-xs">
                  <span className="text-text-muted font-bold uppercase">status</span>
                  <span className={isLocked ? 'text-text-muted/50' : 'text-purple font-extrabold'}>
                    {isLocked ? 'Locked' : `Level ${f.level} Active`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FlowerCollection;
