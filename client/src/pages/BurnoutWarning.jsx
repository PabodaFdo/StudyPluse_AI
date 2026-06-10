import { Flame, ShieldAlert, Heart, Calendar } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ProgressBar from '../components/ProgressBar';
import Badge from '../components/Badge';

const BurnoutWarning = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Burnout Warning"
        subtitle="Understand stress triggers and sleep deficits analyzed from your activity logs."
        icon={Flame}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Burnout Score */}
        <div className="glass-card p-6 border-warning-500/20 border bg-gradient-to-br from-warning-500/5 to-navy-900 text-center space-y-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-warning-500/15 text-warning-400">
            <Flame className="h-6 w-6 animate-pulse-soft" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">BURNOUT RISK STATUS</span>
            <h3 className="text-2xl font-extrabold text-warning-400 mt-1">Moderate Risk (45%)</h3>
            <p className="text-xs text-gray-500 mt-0.5">Calculated: 1 hour ago</p>
          </div>
          <div className="pt-2">
            <ProgressBar value={45} color="yellow" label="Stress Index" />
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="lg:col-span-2 glass-card p-6 border border-white/5 bg-white/[0.02] space-y-4">
          <h3 className="font-bold text-white text-base">Stress Indicators</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Sleep Deficit</span>
              <p className="text-lg font-bold text-white">5.8h / night</p>
              <p className="text-[10px] text-danger-400">Below recommended 7-8 hours</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Weekly Focus</span>
              <p className="text-lg font-bold text-white">24.5 Hours</p>
              <p className="text-[10px] text-success-400">High focus productivity</p>
            </div>
          </div>
        </div>
      </div>

      {/* Strategies */}
      <div className="glass-card p-5 border border-white/5 bg-white/[0.02] space-y-4">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <Heart className="h-4.5 w-4.5 text-danger-400" /> Suggested Rebalancing Steps
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 text-xs">
          {[
            { title: 'Take a break today', desc: 'Replace your next 25-minute study block with a wellness walk. Maintain your garden by watering flowers instead.' },
            { title: 'Improve Sleep Consistency', desc: 'Avoid focus sessions after 10 PM. Set reminders to trigger wind-down alarms.' }
          ].map((s, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <h4 className="font-semibold text-white">{s.title}</h4>
              <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BurnoutWarning;
