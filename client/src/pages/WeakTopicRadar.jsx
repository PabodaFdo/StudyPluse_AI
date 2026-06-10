import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { Radar as RadarIcon, Award, Sparkles, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../components/PageHeader';
import ChartCard from '../components/ChartCard';
import Badge from '../components/Badge';
import Button from '../components/Button';

const radarData = [
  { subject: 'Calculus III', mastery: 85, threshold: 70 },
  { subject: 'Quantum Physics', mastery: 60, threshold: 70 },
  { subject: 'Data Structures', mastery: 90, threshold: 70 },
  { subject: 'Organic Chem', mastery: 45, threshold: 70 },
  { subject: 'Academic Writing', mastery: 80, threshold: 70 },
];

const WeakTopicRadar = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Weak Topic Radar"
        subtitle="Visual map of academic competencies based on simulated quiz scores and focus hours."
        icon={RadarIcon}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recharts Radar Chart */}
        <ChartCard
          title="Mastery Distribution"
          subtitle="Comparing current topic masteries to standard baseline levels (70%)"
          className="lg:col-span-2"
        >
          <div className="h-[280px] w-full mt-4 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.05)" />
                <PolarAngleAxis dataKey="subject" stroke="#64748b" fontSize={11} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#64748b" fontSize={9} />
                <Radar name="My Mastery" dataKey="mastery" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
                <Radar name="Passing Threshold" dataKey="threshold" stroke="#ef4444" fill="#ef4444" fillOpacity={0} strokeDasharray="4 4" />
                <Tooltip
                  contentStyle={{
                    background: '#1e293b',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Action Panel */}
        <div className="glass-card p-5 border border-white/5 bg-white/[0.02] flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-base">Vulnerability Alert</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Organic Chemistry mastery is currently at 45%, which lies significantly below the 70% passing threshold.
            </p>

            <div className="p-3 bg-danger-500/5 border border-danger-500/20 rounded-xl space-y-1">
              <span className="text-[10px] text-danger-400 font-bold uppercase tracking-wider block">RECOMMENDED REMEDIAL MODULE</span>
              <p className="text-xs text-white font-semibold">Organic Chemistry Chapter 6 Spaced Practice</p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 space-y-2">
            <Button
              onClick={() => toast.success('Remedial quiz created!')}
              className="w-full justify-center gap-1.5"
            >
              <Sparkles className="h-4 w-4" /> Generate Remedial Quiz
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeakTopicRadar;
