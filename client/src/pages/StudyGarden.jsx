import { useState } from 'react';
import { Flower2, Droplet, Sparkles, Sprout } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import Badge from '../components/Badge';
import AnimatedCharacter from '../components/AnimatedCharacter';

const StudyGarden = () => {
  const [growthPoints, setGrowthPoints] = useState(145);
  const [currentStageIdx, setCurrentStageIdx] = useState(3); // Healthy Plant

  const stages = [
    { name: 'Seed', icon: '🧎' },
    { name: 'Small Sprout', icon: '🌱' },
    { name: 'Growing Plant', icon: '🌿' },
    { name: 'Healthy Plant', icon: '🪴' },
    { name: 'Flower Buds', icon: '🪻' },
    { name: 'Blooming Flowers', icon: '🌸' },
  ];

  const handleWater = () => {
    setGrowthPoints((prev) => prev + 15);
    toast.success('Watered plant! +15 Growth Points');
    checkLevelUp(15);
  };

  const handleFertilize = () => {
    setGrowthPoints((prev) => prev + 40);
    toast.success('Fertilized plant! +40 Growth Points');
    checkLevelUp(40);
  };

  const checkLevelUp = (pointsAdded) => {
    const nextVal = growthPoints + pointsAdded;
    if (nextVal >= 200 && currentStageIdx < stages.length - 1) {
      setCurrentStageIdx((prev) => prev + 1);
      setGrowthPoints(nextVal - 200);
      toast('Your plant sprouted to the next stage!', { icon: '✨' });
    }
  };

  const activeStage = stages[currentStageIdx];

  return (
    <div className="space-y-6 text-text-main relative">
      <PageHeader
        title="Study Garden"
        subtitle="Grow virtual flowers by completing focus sessions and daily study targets."
        icon={Flower2}
      />

      <div className="grid gap-6 lg:grid-cols-3 z-10 relative">
        {/* Garden view */}
        <div className="liquid-card p-6 min-h-[350px] bg-gradient-to-br from-white to-[#f4ecff]/50 relative">
          <div className="liquid-card-content flex flex-col sm:flex-row items-center justify-center gap-8 w-full h-full">
            {/* Floating leaf elements */}
            <span className="absolute top-10 left-10 text-xl opacity-30 animate-pulse-soft">🌿</span>
            <span className="absolute bottom-12 right-12 text-xl opacity-30 animate-pulse-soft">🌸</span>

            {/* Plant Buddy Mascot */}
            <div className="flex flex-col items-center">
              <AnimatedCharacter
                src="/src/assets/characters/plant-buddy.png"
                variant="plant"
                size="lg"
              />
              <span className="text-[10px] text-text-muted font-bold mt-2">GARDEN COMPANION</span>
            </div>

            <div className="text-center space-y-4">
              <div className="text-7xl animate-bounce duration-1000 mb-6 mt-4">{activeStage.icon}</div>
              <div>
                <span className="status-badge status-success">{activeStage.name}</span>
              </div>
              <p className="text-xs text-text-muted font-bold mt-2">
                Next Stage: {currentStageIdx < stages.length - 1 ? stages[currentStageIdx + 1].name : 'Max stage reached!'}
              </p>
            </div>
          </div>
        </div>

        {/* Plant Controls */}
        <div className="liquid-card p-6 relative overflow-hidden">
          <div className="liquid-card-content flex flex-col justify-between space-y-6 h-full">
            {/* Floating Character in Controls */}
            <div className="absolute -top-4 -right-4 opacity-20">
              <AnimatedCharacter
                src="/src/assets/characters/study-girl-garden.png"
                variant="garden"
                size="sm"
              />
            </div>

            <div className="space-y-4 z-10 relative">
              <div className="flex justify-between items-start border-b border-lavender/10 pb-3">
                <div>
                  <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">active seedling</span>
                  <h3 className="text-lg font-extrabold text-text-main">Mint Lace Fern</h3>
                </div>
                <span className="text-3xl text-purple">🪴</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-text-muted">Total Growth Points</span>
                  <span className="text-purple">{growthPoints} GP</span>
                </div>
                <ProgressBar value={(growthPoints / 200) * 100} color="green" showPercent={true} />
                <p className="text-[10px] text-text-muted font-semibold">
                  Needs 200 GP to transition into the next stage.
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-lavender/10 z-10 relative">
              <Button onClick={handleWater} className="w-full justify-center gap-2" variant="clay">
                <Droplet className="h-4 w-4" /> Water Plant (+15 GP)
              </Button>
              <Button onClick={handleFertilize} className="w-full justify-center gap-2" variant="secondary">
                <Sparkles className="h-4 w-4" /> Apply Fertilizer (+40 GP)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyGarden;
export { Droplet };
