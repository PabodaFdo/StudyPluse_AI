import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3, Clock, Flame, Calendar, Award } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import Badge from '../components/Badge';

const weeklyFocusData = [
  { day: 'Mon', minutes: 150 },
  { day: 'Tue', minutes: 220 },
  { day: 'Wed', minutes: 90 },
  { day: 'Thu', minutes: 250 },
  { day: 'Fri', minutes: 180 },
  { day: 'Sat', minutes: 330 },
  { day: 'Sun', minutes: 240 },
];

const FocusAnalytics = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Focus Analytics"
        subtitle="Review your study duration trends and focus intensity breakdowns."
        icon={BarChart3}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Clock}
          label="Focus Minutes"
          value="1,460 mins"
          change={8}
          changeType="positive"
          color="purple"
        />
        <StatCard
          icon={Flame}
          label="Active Day Streak"
          value="6 Days"
          change={100}
          changeType="positive"
          color="red"
        />
        <StatCard
          icon={Calendar}
          label="Sessions Completed"
          value="58 Sessions"
          change={12}
          changeType="positive"
          color="blue"
        />
        <StatCard
          icon={Award}
          label="Productivity Rate"
          value="94%"
          change={2}
          changeType="positive"
          color="green"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recharts BarChart */}
        <ChartCard
          title="Daily Study Minutes"
          subtitle="Total minutes spent in focus mode daily"
          className="lg:col-span-2"
        >
          <div className="h-[250px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyFocusData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
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
                <Bar dataKey="minutes" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Breakdown Panel */}
        <div className="glass-card p-5 space-y-4">
          <h3 className="font-semibold text-white text-base">Session Allocation</h3>
          <div className="space-y-4 pt-2">
            {[
              { label: 'Deep Focus Mode', percentage: 70, minutes: 1022, color: 'text-brand-400' },
              { label: 'Short Breaks', percentage: 20, minutes: 292, color: 'text-accent-400' },
              { label: 'Long Breaks', percentage: 10, minutes: 146, color: 'text-success-400' },
            ].map((item, idx) => (
              <div key={idx} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300 font-medium">{item.label}</span>
                  <span className={`font-bold ${item.color}`}>{item.percentage}%</span>
                </div>
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>{item.minutes} minutes logged</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusAnalytics;
