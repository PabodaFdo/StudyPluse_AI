import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, TrendingDown, ArrowUpRight, TrendingUp } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ChartCard from '../components/ChartCard';
import Badge from '../components/Badge';

const riskHistoryData = [
  { week: 'Wk 1', chemistry: 30, mathematics: 12, physics: 25 },
  { week: 'Wk 2', chemistry: 45, mathematics: 15, physics: 30 },
  { week: 'Wk 3', chemistry: 60, mathematics: 10, physics: 28 },
  { week: 'Wk 4', chemistry: 80, mathematics: 8, physics: 35 },
  { week: 'Wk 5', chemistry: 75, mathematics: 9, physics: 40 },
  { week: 'Wk 6', chemistry: 76, mathematics: 8, physics: 32 },
];

const RiskTimeline = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Risk Timeline"
        subtitle="Review how your predicted academic risk score has evolved over the semester."
        icon={Clock}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recharts LineChart */}
        <ChartCard
          title="Historical Course Risk Trends"
          subtitle="Lower percentages are optimal (higher indicates higher failure risk)"
          className="lg:col-span-2"
        >
          <div className="h-[250px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={riskHistoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="week" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: '#1e293b',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Line type="monotone" dataKey="chemistry" name="Chemistry" stroke="#ef4444" strokeWidth={2} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="physics" name="Physics" stroke="#fbbf24" strokeWidth={2} />
                <Line type="monotone" dataKey="mathematics" name="Calculus" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Milestone logs */}
        <div className="glass-card p-5 space-y-4">
          <h3 className="font-semibold text-white text-base">Timeline Events</h3>
          <div className="space-y-3 overflow-y-auto max-h-[250px] pr-1">
            {[
              { title: 'Calculus drop to 8%', date: 'Week 6', text: 'Daily active review check-ins improved understanding.', type: 'success' },
              { title: 'Chemistry spiked to 80%', date: 'Week 4', text: 'Missed two critical lab review sessions.', type: 'danger' },
              { title: 'Physics increased to 40%', date: 'Week 5', text: 'Test preparation duration dropped below average.', type: 'warning' },
            ].map((evt, idx) => (
              <div key={idx} className="p-3 bg-white/[0.01] border border-white/5 rounded-xl space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-200">{evt.title}</span>
                  <span className="text-[10px] text-gray-500">{evt.date}</span>
                </div>
                <p className="text-[10px] text-gray-400 leading-relaxed">{evt.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskTimeline;
