import { useState } from 'react';
import { Smile, Sparkles, HeartPulse, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import TextArea from '../components/TextArea';
import Badge from '../components/Badge';

const MoodCheckIn = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [journal, setJournal] = useState('');
  const [history, setHistory] = useState([
    { date: 'Yesterday', mood: '😊 Focused', note: 'Had a long library session, did 4 Pomodoros.' },
    { date: 'June 7, 2026', mood: '😴 Tired', note: 'Calculus review was heavy, went to sleep late.' },
  ]);

  const moods = [
    { label: 'Energized', emoji: '⚡', color: 'purple' },
    { label: 'Focused', emoji: '😊', color: 'blue' },
    { label: 'Relaxed', emoji: '😌', color: 'green' },
    { label: 'Tired', emoji: '😴', color: 'yellow' },
    { label: 'Stressed', emoji: '🤯', color: 'red' },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    if (!selectedMood) {
      toast.error('Please select a mood emoji first');
      return;
    }
    const newLog = {
      date: 'Just Now',
      mood: `${selectedMood.emoji} ${selectedMood.label}`,
      note: journal || 'No comments left.',
    };
    setHistory([newLog, ...history]);
    setSelectedMood(null);
    setJournal('');
    toast.success('Mood logged successfully! +20 XP');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mood Check-in"
        subtitle="Log your daily feelings to calibrate stress predictions and maintain subject health."
        icon={Smile}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Form log */}
        <div className="lg:col-span-2 glass-card p-5 border border-white/5 bg-white/[0.02] space-y-6">
          <h3 className="font-bold text-white text-base">How are you feeling today?</h3>
          
          <div className="grid grid-cols-5 gap-3">
            {moods.map((m) => (
              <button
                key={m.label}
                onClick={() => setSelectedMood(m)}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center cursor-pointer transition ${
                  selectedMood?.label === m.label
                    ? 'border-brand-500 bg-brand-500/10'
                    : 'border-white/5 bg-white/[0.01] hover:bg-white/[0.03]'
                }`}
              >
                <span className="text-3xl">{m.emoji}</span>
                <span className="text-[10px] font-bold text-gray-400 mt-1.5">{m.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <TextArea
              label="Journal Thoughts (Optional)"
              placeholder="What made you feel this way? Any academic hurdles?"
              rows={4}
              value={journal}
              onChange={(e) => setJournal(e.target.value)}
            />

            <Button type="submit" className="w-full justify-center gap-1.5">
              <Send className="h-4 w-4" /> Save Mood Entry
            </Button>
          </form>
        </div>

        {/* History Panel */}
        <div className="glass-card p-5 border border-white/5 bg-white/[0.02] space-y-4">
          <h3 className="font-semibold text-white text-base">Check-in Logs</h3>
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {history.map((h, i) => (
              <div key={i} className="p-3.5 bg-white/[0.01] border border-white/5 rounded-xl space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <Badge color="purple">{h.mood}</Badge>
                  <span className="text-[10px] text-gray-500">{h.date}</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mt-1">{h.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodCheckIn;
