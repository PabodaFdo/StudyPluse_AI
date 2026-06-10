import { useState } from 'react';
import { Swords, CheckSquare, Square, Award } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import Badge from '../components/Badge';
import ProgressBar from '../components/ProgressBar';
import AnimatedCharacter from '../components/AnimatedCharacter';

const StudyQuests = () => {
  const [dailyQuests, setDailyQuests] = useState([
    { id: 1, title: 'Pomodoro Focus', desc: 'Complete one 25-minute focus session.', reward: '20 XP, 1 Water Drop', completed: true },
    { id: 2, title: 'Active Synthesis', desc: 'Revise one smart note summary sheet.', reward: '15 XP, 1 Seed', completed: false },
    { id: 3, title: 'Adaptive Mind', desc: 'Answer five AI-generated quiz questions.', reward: '30 XP, 1 Fertilizer', completed: false },
    { id: 4, title: 'Mindfulness Check', desc: 'Complete one mood check-in journal entry.', reward: '10 XP', completed: false },
  ]);

  const [weeklyQuests, setWeeklyQuests] = useState([
    { id: 101, title: 'Focus Marathon', desc: 'Complete five Pomodoro focus sessions.', progress: 3, total: 5, reward: '100 XP, 5 Water Drops', claimed: false },
    { id: 102, title: 'Quiz Mastery', desc: 'Score above 70% in two adaptive quizzes.', progress: 1, total: 2, reward: '80 XP, 3 Seeds', claimed: false },
    { id: 103, title: 'Folder Maintenance', desc: 'Revise five smart note sheets.', progress: 5, total: 5, reward: '120 XP, 2 Fertilizers', claimed: true },
    { id: 104, title: 'Healthy Balance', desc: 'Improve one subject health score index.', progress: 0, total: 1, reward: '90 XP, 1 Rare Seed', claimed: false },
  ]);

  const toggleDaily = (id) => {
    setDailyQuests(
      dailyQuests.map((q) => {
        if (q.id === id) {
          const nextState = !q.completed;
          if (nextState) {
            toast.success(`Daily Quest Complete! +10 GP. Reward: ${q.reward}`);
          }
          return { ...q, completed: nextState };
        }
        return q;
      })
    );
  };

  const claimWeekly = (id) => {
    setWeeklyQuests(
      weeklyQuests.map((q) => {
        if (q.id === id) {
          if (q.progress < q.total) {
            toast.error('Quest is not fully completed yet!');
            return q;
          }
          toast.success(`Weekly Quest Claimed! Reward: ${q.reward}`);
          return { ...q, claimed: true };
        }
        return q;
      })
    );
  };

  return (
    <div className="space-y-6 text-text-main relative">
      <PageHeader
        title="Study Quests"
        subtitle="Complete daily and weekly gamified quests to earn items for your Study Garden."
        icon={Swords}
      />

      {/* Top Banner with Mascot */}
      <div className="liquid-card p-6 bg-gradient-to-r from-purple/10 to-pink/5 mb-6">
        <div className="liquid-card-content flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-base font-extrabold text-text-main">Complete today's quests to help your Study Garden bloom</h3>
            <p className="text-xs text-text-muted font-bold">
              Each logged achievement allocates fertilizer or rare seeds to nurture your flowers.
            </p>
          </div>
          <div className="flex-shrink-0">
            <AnimatedCharacter
              src="/src/assets/characters/study-girl-quest.png"
              variant="quest"
              size="md"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Daily Quests */}
        <div className="liquid-card p-5">
          <div className="liquid-card-content space-y-4">
            <div className="flex justify-between items-center border-b border-lavender/10 pb-2">
              <h3 className="font-extrabold text-sm sm:text-base text-text-main">Daily Missions</h3>
              <Badge color="purple">Reset: 14h</Badge>
            </div>

            <div className="space-y-3">
              {dailyQuests.map((q) => (
                <button
                  key={q.id}
                  onClick={() => toggleDaily(q.id)}
                  className={`w-full flex items-start justify-between gap-4 p-4 rounded-2xl border transition text-left cursor-pointer ${
                    q.completed
                      ? 'border-success-500/20 bg-mint/30 dark:bg-success-900/30'
                      : 'border-lavender/10 dark:border-white/10 bg-white dark:bg-slate-900/80 hover:bg-cream dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0 text-purple">
                      {q.completed ? '●' : '○'}
                    </div>
                    <div>
                      <h4 className={`text-xs font-bold ${q.completed ? 'text-text-muted line-through' : 'text-text-main'}`}>
                        {q.title}
                      </h4>
                      <p className="text-[10px] text-text-muted mt-0.5 leading-relaxed">{q.desc}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-[9px] font-bold text-purple block">{q.reward}</span>
                    <Badge color={q.completed ? 'green' : 'gray'} className="mt-1">
                      {q.completed ? 'Complete' : 'Active'}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Quests */}
        <div className="liquid-card p-5">
          <div className="liquid-card-content space-y-4">
            <div className="flex justify-between items-center border-b border-lavender/10 pb-2">
              <h3 className="font-extrabold text-sm sm:text-base text-text-main">Weekly Milestones</h3>
              <Badge color="blue">Week 2</Badge>
            </div>

            <div className="space-y-3">
              {weeklyQuests.map((q) => {
                const isFinished = q.progress >= q.total;
                return (
                  <div
                    key={q.id}
                    className={`flex flex-col p-4 rounded-2xl border ${
                      q.claimed
                        ? 'border-success-500/20 bg-mint/10 dark:bg-success-900/20 opacity-70'
                        : 'border-lavender/10 dark:border-white/10 bg-white dark:bg-slate-900/80'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="text-xs font-bold text-text-main">{q.title}</h4>
                        <p className="text-[10px] text-text-muted mt-0.5 leading-relaxed">{q.desc}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-[9px] font-bold text-purple block">{q.reward}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <ProgressBar value={(q.progress / q.total) * 100} color="purple" showPercent={false} />
                        <span className="text-[9px] text-text-muted font-bold block mt-1">
                          Progress: {q.progress} / {q.total}
                        </span>
                      </div>
                      {!q.claimed ? (
                        <Button
                          size="sm"
                          disabled={!isFinished}
                          onClick={() => claimWeekly(q.id)}
                          variant={isFinished ? 'clay' : 'secondary'}
                          className="text-[10px] py-1.5 px-3"
                        >
                          Claim Reward
                        </Button>
                      ) : (
                        <Badge color="green">Claimed</Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyQuests;
