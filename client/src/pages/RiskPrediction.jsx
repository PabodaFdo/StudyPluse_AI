import { ShieldAlert, CheckCircle, TrendingUp, AlertTriangle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import Badge from '../components/Badge';

const RiskPrediction = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="ML Risk Prediction"
        subtitle="Early academic failure warning predictions evaluated by StudyPulse ML Service."
        icon={ShieldAlert}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Risk Card */}
        <div className="glass-card p-6 border-danger-500/20 border bg-gradient-to-br from-danger-500/5 to-navy-900 text-center space-y-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-danger-500/15 text-danger-400">
            <AlertTriangle className="h-6 w-6 animate-pulse-soft" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">PREDICTED RISK STATUS</span>
            <h3 className="text-2xl font-extrabold text-danger-400 mt-1">At Risk (76%)</h3>
            <p className="text-xs text-gray-500 mt-0.5">Calculated: 2 hours ago</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl text-xs text-gray-400 leading-relaxed text-left">
            <span className="font-semibold text-white block mb-1">Early Warning Indicators:</span>
            Organic Chemistry average quiz score is below 60% and focus session minutes dropped by 45% compared to baseline.
          </div>
        </div>

        {/* Factors Breakdown */}
        <div className="lg:col-span-2 glass-card p-6 border border-white/5 bg-white/[0.02] space-y-4">
          <h3 className="font-bold text-white text-base">Key Academic Indicators</h3>
          <div className="space-y-3">
            {[
              { label: 'Organic Chemistry (CHEM 202)', score: '56% Quiz Avg', status: 'High Risk', color: 'red' },
              { label: 'Quantum Mechanics (PHYS 410)', score: '78% Quiz Avg', status: 'Medium Risk', color: 'yellow' },
              { label: 'Calculus III (MATH 301)', score: '88% Quiz Avg', status: 'Low Risk', color: 'green' },
              { label: 'Data Structures (CS 210)', score: '94% Quiz Avg', status: 'Low Risk', color: 'green' }
            ].map((ind, idx) => (
              <div key={idx} className="flex justify-between items-center p-3.5 bg-white/[0.01] border border-white/5 rounded-xl">
                <div>
                  <h4 className="text-xs font-semibold text-gray-200">{ind.label}</h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">{ind.score}</p>
                </div>
                <span className={`status-badge ${ind.color === 'red' ? 'status-danger' : ind.color === 'yellow' ? 'status-warning' : 'status-success'}`}>{ind.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="glass-card p-5 border border-white/5 bg-white/[0.02] space-y-4">
        <h3 className="font-bold text-white text-base">AI Correction Strategy</h3>
        <div className="grid gap-4 sm:grid-cols-3 text-xs">
          {[
            { title: 'Create Spaced Review', desc: 'Synthesize Organic Chemistry chapter 6 PDF to generate 15 target cards.', action: 'Create Cards' },
            { title: 'Increase Focus Time', desc: 'Schedule 2 Pomodoro focus sessions (50 mins total) for physics homework.', action: 'Start Timer' },
            { title: 'Complete Quests', desc: 'Solve 3 daily wellness/mood check-in quests to boost subject health metrics.', action: 'View Quests' }
          ].map((rec, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between">
              <div>
                <h4 className="font-semibold text-gray-200">{rec.title}</h4>
                <p className="text-gray-500 text-[10px] mt-1 leading-relaxed">{rec.desc}</p>
              </div>
              <button className="text-brand-400 hover:text-brand-300 font-bold mt-4 self-start">
                {rec.action} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskPrediction;
