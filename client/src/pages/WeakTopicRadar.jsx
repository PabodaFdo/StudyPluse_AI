import { useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { Radar as RadarIcon, AlertTriangle, CheckCircle, Activity, Trash2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ChartCard from '../components/ChartCard';
import { weakTopicService } from '../services/weakTopic.service';

const defaultFormData = {
  topicName: '',
  quizScore: '',
  wrongAnswers: '',
  attemptCount: '',
  timeSpentMinutes: '',
  daysSinceLastStudy: '',
  confidenceLevel: '',
  topicDifficulty: ''
};

const WeakTopicRadar = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  
  // Dynamic radar topics
  const [radarTopics, setRadarTopics] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleReset = () => {
    setFormData(defaultFormData);
    setResult(null);
    setError(null);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = {
        topicName: formData.topicName,
        quizScore: Number(formData.quizScore),
        wrongAnswers: Number(formData.wrongAnswers),
        attemptCount: Number(formData.attemptCount),
        timeSpentMinutes: Number(formData.timeSpentMinutes),
        daysSinceLastStudy: Number(formData.daysSinceLastStudy),
        confidenceLevel: Number(formData.confidenceLevel),
        topicDifficulty: Number(formData.topicDifficulty),
      };

      const data = await weakTopicService.predictWeakTopic(payload);
      setResult(data);

      // Update radar data
      setRadarTopics(prev => {
        const existingIndex = prev.findIndex(t => t.subject.toLowerCase() === data.topicName.toLowerCase());
        const newTopic = {
          subject: data.topicName,
          mastery: payload.quizScore,
          threshold: 70,
          status: data.topicStatus
        };
        
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = newTopic;
          return updated;
        }
        return [...prev, newTopic];
      });

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to predict weak topic.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Weak': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'Moderate': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'Strong': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

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
          title="Predicted Topic Mastery"
          subtitle="Radar updates based on your weak topic predictions."
          className="lg:col-span-2 relative"
        >
          {radarTopics.length > 0 && (
            <button 
              onClick={() => setRadarTopics([])} 
              className="absolute top-5 right-5 z-10 inline-flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-bold text-red-600 transition-colors hover:bg-red-100 dark:border-red-400/40 dark:bg-red-500/10 dark:!text-red-300 dark:hover:bg-red-500/20"
              title="Clear Radar History"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear Radar</span>
            </button>
          )}

          <div className="h-[280px] w-full mt-4 flex items-center justify-center">
            {radarTopics.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 space-y-3">
                <RadarIcon className="w-10 h-10 opacity-30" />
                <p className="text-sm">No topic predictions yet. Submit an assessment to build your radar.</p>
              </div>
            ) : radarTopics.length < 3 ? (
              <div className="flex flex-col items-center justify-center w-full px-4 h-full">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 text-center">
                  Add at least 3 topics to unlock the full radar chart visualization.<br/>
                  Current topics recorded:
                </p>
                <div className="flex flex-wrap gap-4 justify-center w-full">
                  {radarTopics.map((topic, i) => (
                    <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-xl w-44 text-center shadow-sm">
                      <p className="font-bold text-sm text-slate-900 dark:text-white truncate" title={topic.subject}>{topic.subject}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Mastery: {topic.mastery}%</p>
                      <div className={`mt-3 px-2 py-1 text-xs font-semibold rounded-full inline-block ${getStatusColor(topic.status)}`}>
                        {topic.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarTopics}>
                  <PolarGrid stroke="rgba(100,116,139,0.2)" />
                  <PolarAngleAxis dataKey="subject" stroke="#64748b" tick={{ fill: '#c4b5fd', fontSize: 12, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#64748b" tick={{ fill: '#a5b4fc', fontSize: 10 }} />
                  <Radar name="My Mastery" dataKey="mastery" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
                  <Radar name="Passing Threshold" dataKey="threshold" stroke="#ef4444" fill="#ef4444" fillOpacity={0} strokeDasharray="4 4" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '12px',
                      color: '#ffffff',
                      fontSize: '12px'
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </div>
        </ChartCard>

        {/* Action Panel / Vulnerability Alert */}
        <div className="glass-card p-5 border border-white/5 bg-white/[0.02] flex flex-col">
          <div className="space-y-4 flex-1">
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">Vulnerability Alert</h3>
            
            {!result ? (
              <div className="flex flex-col items-center justify-center py-10 text-slate-500 dark:text-slate-400 space-y-3">
                <Activity className="w-10 h-10 opacity-50" />
                <p className="text-xs text-center">Use the form below to predict topic vulnerability.</p>
              </div>
            ) : (
              <div className="space-y-4 overflow-y-auto max-h-[300px] pr-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-900 dark:text-white truncate max-w-[150px]">{result.topicName}</h4>
                  <div className={`px-2.5 py-1 rounded-full border text-xs font-semibold ${getStatusColor(result.topicStatus)}`}>
                    {result.topicStatus} ({Math.round(result.confidence * 100)}%)
                  </div>
                </div>

                <div className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed">
                  {result.topicStatus === 'Weak' && (
                    <p className="text-red-500 font-medium">Critical warning: Immediate remedial action is required for this topic to avoid falling behind.</p>
                  )}
                  {result.topicStatus === 'Moderate' && (
                    <p className="text-amber-500 font-medium">Improvement needed: Additional practice is recommended to solidify concepts.</p>
                  )}
                  {result.topicStatus === 'Strong' && (
                    <p className="text-emerald-500 font-medium">Great job! You demonstrate strong mastery of this topic.</p>
                  )}
                </div>

                {result.reasons?.length > 0 && (
                  <div className="space-y-1 mt-2">
                    <span className="text-[10px] text-slate-500 dark:text-cyan-300 font-bold uppercase tracking-wider block">Key Factors</span>
                    <ul className="list-disc list-inside text-xs text-slate-700 dark:text-slate-100">
                      {result.reasons.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>
                )}

                {result.recommendations?.length > 0 && (
                  <div className="p-3 bg-indigo-500/5 border border-indigo-500/20 rounded-xl space-y-1 mt-2">
                    <span className="text-[10px] text-indigo-500 dark:text-cyan-300 font-bold uppercase tracking-wider block">Recommendations</span>
                    <ul className="list-disc list-inside text-xs text-slate-800 dark:text-slate-100">
                      {result.recommendations.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Prediction Form Section */}
      <div className="glass-card p-6 border border-white/5 bg-white/[0.02] dark:bg-slate-900/50 rounded-2xl">
        <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-4">Topic Assessment</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-sm text-slate-700 dark:text-gray-300 mb-1">Topic Name</label>
              <input type="text" name="topicName" value={formData.topicName} onChange={handleChange} required className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm text-slate-700 dark:text-gray-300 mb-1">Quiz Score (%)</label>
              <input type="number" name="quizScore" value={formData.quizScore} onChange={handleChange} required min="0" max="100" className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm text-slate-700 dark:text-gray-300 mb-1">Wrong Answers</label>
              <input type="number" name="wrongAnswers" value={formData.wrongAnswers} onChange={handleChange} required min="0" className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm text-slate-700 dark:text-gray-300 mb-1">Attempt Count</label>
              <input type="number" name="attemptCount" value={formData.attemptCount} onChange={handleChange} required min="1" className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm text-slate-700 dark:text-gray-300 mb-1">Time Spent (mins)</label>
              <input type="number" name="timeSpentMinutes" value={formData.timeSpentMinutes} onChange={handleChange} required min="0" className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm text-slate-700 dark:text-gray-300 mb-1">Days Since Study</label>
              <input type="number" name="daysSinceLastStudy" value={formData.daysSinceLastStudy} onChange={handleChange} required min="0" className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm text-slate-700 dark:text-gray-300 mb-1">Confidence (1-5)</label>
              <input type="number" name="confidenceLevel" value={formData.confidenceLevel} onChange={handleChange} required min="1" max="5" className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm text-slate-700 dark:text-gray-300 mb-1">Difficulty (1-5)</label>
              <input type="number" name="topicDifficulty" value={formData.topicDifficulty} onChange={handleChange} required min="1" max="5" className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 max-w-md">
            <button type="submit" disabled={loading} className="w-full rounded-xl bg-brand-500 px-4 py-3 font-bold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? 'Predicting...' : 'Predict Weakness'}
            </button>
            <button type="button" onClick={handleReset} disabled={loading} className="w-full rounded-xl border border-slate-300 bg-white/80 px-4 py-3 font-bold text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/15 dark:bg-white/5 dark:!text-cyan-300 dark:hover:bg-white/10 dark:hover:!text-cyan-200">
              Reset Form
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default WeakTopicRadar;
