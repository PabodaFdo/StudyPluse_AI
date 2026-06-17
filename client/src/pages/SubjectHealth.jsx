import { useState } from 'react';
import { HeartPulse, Activity, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { subjectHealthService } from '../services/subjectHealth.service';

const defaultFormData = {
  subjectName: "",
  attendancePercentage: "",
  averageMark: "",
  quizAverage: "",
  studyHoursThisWeek: "",
  focusSessionsCompleted: "",
  notesCount: "",
  missedDeadlines: ""
};

const SubjectHealth = () => {
  const [formData, setFormData] = useState(defaultFormData);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleReset = () => {
    setFormData(defaultFormData);
    setResult(null);
    setError(null);
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = {
        subjectName: formData.subjectName,
        attendancePercentage: Number(formData.attendancePercentage),
        averageMark: Number(formData.averageMark),
        quizAverage: Number(formData.quizAverage),
        studyHoursThisWeek: Number(formData.studyHoursThisWeek),
        focusSessionsCompleted: Number(formData.focusSessionsCompleted),
        notesCount: Number(formData.notesCount),
        missedDeadlines: Number(formData.missedDeadlines),
      };

      const data = await subjectHealthService.calculateSubjectHealth(payload);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to calculate subject health score.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColorClass = (status) => {
    switch (status) {
      case 'Healthy':
        return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'Needs Attention':
        return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'Critical':
        return 'text-red-500 bg-red-500/10 border-red-500/20';
      default:
        return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Healthy': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'Needs Attention': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'Critical': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Subject Health"
        subtitle="Analyze your subject health score based on your study habits and performance."
        icon={HeartPulse}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="glass-card p-6 border border-white/5 bg-white/[0.02] dark:bg-slate-900/50 rounded-2xl">
          <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-4">Calculate Score</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-700 dark:text-gray-300 mb-1">Subject Name</label>
              <input 
                type="text" 
                name="subjectName" 
                value={formData.subjectName} 
                onChange={handleChange} 
                required
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-700 dark:text-gray-300 mb-1">Attendance (%)</label>
                <input 
                  type="number" 
                  name="attendancePercentage" 
                  value={formData.attendancePercentage} 
                  onChange={handleChange} 
                  required
                  min="0" max="100"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 dark:text-gray-300 mb-1">Avg Mark (%)</label>
                <input 
                  type="number" 
                  name="averageMark" 
                  value={formData.averageMark} 
                  onChange={handleChange} 
                  required
                  min="0" max="100"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 dark:text-gray-300 mb-1">Quiz Avg (%)</label>
                <input 
                  type="number" 
                  name="quizAverage" 
                  value={formData.quizAverage} 
                  onChange={handleChange} 
                  required
                  min="0" max="100"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 dark:text-gray-300 mb-1">Study Hours</label>
                <input 
                  type="number" 
                  name="studyHoursThisWeek" 
                  value={formData.studyHoursThisWeek} 
                  onChange={handleChange} 
                  required
                  min="0"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 dark:text-gray-300 mb-1">Focus Sessions</label>
                <input 
                  type="number" 
                  name="focusSessionsCompleted" 
                  value={formData.focusSessionsCompleted} 
                  onChange={handleChange} 
                  required
                  min="0"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 dark:text-gray-300 mb-1">Notes Count</label>
                <input 
                  type="number" 
                  name="notesCount" 
                  value={formData.notesCount} 
                  onChange={handleChange} 
                  required
                  min="0"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-700 dark:text-gray-300 mb-1">Missed Deadlines</label>
                <input 
                  type="number" 
                  name="missedDeadlines" 
                  value={formData.missedDeadlines} 
                  onChange={handleChange} 
                  required
                  min="0"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mt-4">
              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Calculating...' : 'Calculate Health'}
              </button>

              <button
                type="button"
                onClick={handleReset}
                disabled={loading}
                className="rounded-xl border border-slate-300 bg-white/80 px-4 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                Reset
              </button>
            </div>
            
            {error && (
              <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm text-center">
                {error}
              </div>
            )}
          </form>
        </div>

        {/* Results Section */}
        <div className="glass-card p-6 border border-white/5 bg-white/[0.02] dark:bg-slate-900/50 rounded-2xl flex flex-col">
          <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-4">Analysis Results</h3>
          
          {!result ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 space-y-3">
              <Activity className="w-12 h-12 opacity-50" />
              <p className="text-sm">Enter your metrics to see your subject health analysis.</p>
            </div>
          ) : (
            <div className="space-y-6 flex-1 overflow-y-auto pr-2">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10">
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">{result.subjectName || 'Subject'}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Health Score: {Math.round(result.healthScore)}%</p>
                </div>
                <div className={`px-3 py-1.5 rounded-full border flex items-center gap-2 font-medium text-sm ${getStatusColorClass(result.status)}`}>
                  {getStatusIcon(result.status)}
                  {result.status}
                </div>
              </div>

              {result.strengths?.length > 0 && (
                <div>
                  <h5 className="font-medium text-sm text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> Strengths
                  </h5>
                  <ul className="list-disc list-inside text-sm text-slate-700 dark:text-gray-300 space-y-1">
                    {result.strengths.map((str, idx) => (
                      <li key={idx}>{str}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.concerns?.length > 0 && (
                <div>
                  <h5 className="font-medium text-sm text-red-600 dark:text-red-400 mb-2 flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Concerns
                  </h5>
                  <ul className="list-disc list-inside text-sm text-slate-700 dark:text-gray-300 space-y-1">
                    {result.concerns.map((con, idx) => (
                      <li key={idx}>{con}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.recommendations?.length > 0 && (
                <div>
                  <h5 className="font-medium text-sm text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" /> Recommendations
                  </h5>
                  <ul className="list-disc list-inside text-sm text-slate-700 dark:text-gray-300 space-y-1">
                    {result.recommendations.map((rec, idx) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectHealth;
