import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HeartPulse, ShieldAlert, Award } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ChartCard from '../components/ChartCard';
import Badge from '../components/Badge';

const healthData = [
  { subject: 'Calculus III', health: 88 },
  { subject: 'Quantum Physics', health: 76 },
  { subject: 'Data Structures', health: 92 },
  { subject: 'Organic Chem', health: 48 },
];

const SubjectHealth = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Subject Health"
        subtitle="Review individual course health indices computed from quizzes, logs, and wellness inputs."
        icon={HeartPulse}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recharts Bar Chart */}
        <ChartCard
          title="Subject Health Index (%)"
          subtitle="Measures consistent study activity and performance ratings"
          className="lg:col-span-2"
        >
          <div className="h-[250px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={healthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="subject" stroke="#64748b" fontSize={11} tickLine={false} />
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
                <Bar dataKey="health" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Status widget */}
        <div className="glass-card p-5 border border-white/5 bg-white/[0.02] space-y-4">
          <h3 className="font-semibold text-white text-base">Health Summary</h3>
          <div className="space-y-3 pt-2">
            {[
              { subject: 'Data Structures & Algorithms', desc: 'Excellent consistency & high quiz averages.', status: 'Optimal (92%)', color: 'green' },
              { subject: 'Organic Chemistry', desc: 'Urgent focus needed. Spaced review lags.', status: 'Critical (48%)', color: 'red' },
            ].map((h, i) => (
              <div key={i} className="p-3.5 bg-white/[0.01] border border-white/5 rounded-xl space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-200">{h.subject}</span>
                  <Badge color={h.color}>{h.status}</Badge>
                </div>
                <p className="text-[10px] text-gray-500 leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectHealth;
