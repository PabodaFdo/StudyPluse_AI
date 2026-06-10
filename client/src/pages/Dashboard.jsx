import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Timer, BookOpen, Clock, Flame, Sparkles, LayoutDashboard,
  Trophy, AlertTriangle, Play, Flower2
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import ProgressBar from '../components/ProgressBar';
import Badge from '../components/Badge';
import Button from '../components/Button';
import AnimatedCharacter from '../components/AnimatedCharacter';

const focusHistoryData = [
  { name: 'Mon', mins: 120 },
  { name: 'Tue', mins: 180 },
  { name: 'Wed', mins: 90 },
  { name: 'Thu', mins: 210 },
  { name: 'Fri', mins: 150 },
  { name: 'Sat', mins: 270 },
  { name: 'Sun', mins: 240 },
];

const healthScoresData = [
  { name: 'Calculus', score: 88 },
  { name: 'Physics', score: 76 },
  { name: 'CS', score: 92 },
  { name: 'Chem', score: 48 },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 text-text-main">
      <PageHeader
        title="Student Portal Dashboard"
        subtitle="Manage focus sessions, note reviews, and cultivate digital plants."
        icon={LayoutDashboard}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column - main activities */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Welcome Card with Mascot */}
          <div className="liquid-card p-6 bg-gradient-to-r from-purple/10 via-pink/5 to-cream border-2 border-white relative overflow-hidden">
            <div className="liquid-card-content flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10 w-full">
              <div className="space-y-2 text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-extrabold text-text-main flex items-center justify-center sm:justify-start gap-2">
                  Good Morning, Student 🌱
                </h2>
                <p className="text-xs sm:text-sm text-text-muted font-bold max-w-sm">
                  Ready to grow your Study Garden today? Completing quests unlocks rare flower seeds.
                </p>
                <div className="pt-2">
                  <Button onClick={() => navigate('/focus-timer')} className="gap-2 flex-shrink-0" size="sm">
                    <Play className="fill-white h-4 w-4" /> Start Focus Session
                  </Button>
                </div>
              </div>

              {/* Mascot in Welcome Banner */}
              <div className="flex-shrink-0">
                <AnimatedCharacter
                  src="/src/assets/characters/study-girl-focus.png"
                  variant="focus"
                  size="md"
                />
              </div>
            </div>
          </div>

          {/* Grid Stats */}
          <div className="grid gap-4 sm:grid-cols-4">
            <StatCard
              icon={Timer}
              label="Focus Sessions"
              value="12 Logged"
              change={15}
              changeType="positive"
              color="purple"
            />
            <StatCard
              icon={BookOpen}
              label="Revised Notes"
              value="8 Sheets"
              change={8}
              changeType="positive"
              color="blue"
            />
            <StatCard
              icon={Clock}
              label="Study Hours"
              value="24.5 Hours"
              change={12}
              changeType="positive"
              color="green"
            />
            <StatCard
              icon={Flame}
              label="Current Streak"
              value="6 Days"
              change={100}
              changeType="positive"
              color="red"
            />
          </div>

          {/* Weekly Focus Chart */}
          <ChartCard
            title="Weekly Focus Overview"
            subtitle="Minutes spent focusing in study intervals"
          >
            <div className="h-[220px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={focusHistoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorFocus" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,92,246,0.08)" />
                  <XAxis dataKey="name" stroke="#6b6388" fontSize={11} tickLine={false} />
                  <YAxis stroke="#6b6388" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: '#ffffff',
                      borderColor: '#b9a7ff',
                      borderRadius: '12px',
                      color: '#241b4b',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                  />
                  <Area type="monotone" dataKey="mins" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorFocus)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Right column - sidebar cards */}
        <div className="space-y-6">
          {/* Study Garden progress with Plant Buddy */}
          <div className="liquid-card p-5">
            <div className="liquid-card-content space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-sm sm:text-base text-text-main flex items-center gap-1.5">
                  <Flower2 className="h-4.5 w-4.5 text-purple" /> Study Garden
                </h3>
                <span className="status-badge status-success">Healthy Plant</span>
              </div>
              
              <div className="p-3 bg-[#f8f3ff] dark:bg-slate-900/80 rounded-2xl border border-lavender/35 dark:border-white/10 flex items-center gap-3">
                <AnimatedCharacter
                  src="/src/assets/characters/plant-buddy.png"
                  variant="plant"
                  size="sm"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-text-main truncate">Mint Lace Fern</p>
                  <p className="text-[10px] text-text-muted">145 Growth Points</p>
                </div>
              </div>
              
              <ProgressBar value={65} color="green" label="Growth Progress" />
              <button onClick={() => navigate('/study-garden')} className="w-full text-xs font-bold text-purple hover:underline text-right block">
                Manage Garden →
              </button>
            </div>
          </div>

          {/* Today's Study Quests with Quest Mascot */}
          <div className="liquid-card p-5 relative overflow-hidden">
            <div className="liquid-card-content space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="font-extrabold text-sm sm:text-base text-text-main">Today's Study Quests</h3>
                <AnimatedCharacter
                  src="/src/assets/characters/study-girl-quest.png"
                  variant="quest"
                  size="sm"
                  className="w-10 h-10"
                />
              </div>
              
              <div className="space-y-2 text-xs">
                {[
                  { quest: 'Complete one 25-min focus session', checked: true },
                  { quest: 'Revise one smart note summary sheet', checked: false },
                  { quest: 'Answer 5 quiz questions', checked: false },
                ].map((q, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f8f3ff] dark:bg-slate-900/80 border border-lavender/20 dark:border-white/10">
                    <span className={`text-base ${q.checked ? 'text-green-500' : 'text-text-muted/40'}`}>
                      {q.checked ? '●' : '○'}
                    </span>
                    <span className={`font-semibold ${q.checked ? 'text-text-muted line-through' : 'text-text-main'}`}>
                      {q.quest}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subject Health Chart */}
          <ChartCard title="Subject Health" className="p-4 sm:p-5">
            <div className="h-[150px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={healthScoresData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,92,246,0.05)" />
                  <XAxis dataKey="name" stroke="#6b6388" fontSize={10} tickLine={false} />
                  <YAxis stroke="#6b6388" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: '#ffffff',
                      borderColor: '#b9a7ff',
                      borderRadius: '12px',
                      color: '#241b4b',
                      fontSize: '11px',
                    }}
                  />
                  <Bar dataKey="score" fill="#ffb6d5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          {/* Risk Prediction Preview */}
          <div className="liquid-card p-5 bg-gradient-to-br from-pink/5 to-white border border-lavender/25">
            <div className="liquid-card-content space-y-3">
              <h3 className="font-extrabold text-sm sm:text-base text-text-main flex items-center gap-1.5">
                <AlertTriangle className="h-4.5 w-4.5 text-danger-500" /> Academic Risk Alerts
              </h3>
              <div className="flex justify-between items-center text-xs p-2.5 rounded-xl bg-pink/15 border border-pink/35">
                <span className="font-bold text-text-main">Organic Chemistry</span>
                <span className="status-badge status-danger">High Risk (76%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
