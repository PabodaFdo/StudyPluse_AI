import { useState, useEffect, useRef } from 'react';
import { Timer, Play, Pause, RotateCcw, AlertTriangle, Coffee } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import Badge from '../components/Badge';

const FocusTimer = () => {
  const [mode, setMode] = useState('focus'); // focus, shortBreak, longBreak
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const modeTimes = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            handleModeComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const handleModeComplete = () => {
    if (mode === 'focus') {
      toast.success('Focus session complete! +25 Focus Minutes added. Take a break.');
      setMode('shortBreak');
      setSecondsLeft(modeTimes.shortBreak);
    } else {
      toast('Break finished! Ready to focus?', { icon: '💪' });
      setMode('focus');
      setSecondsLeft(modeTimes.focus);
    }
  };

  const changeMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setSecondsLeft(modeTimes[newMode]);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(modeTimes[mode]);
    toast('Timer reset');
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Focus Timer"
        subtitle="Pomodoro-style interval session timers to support intensive study cycles."
        icon={Timer}
      />

      <div className="max-w-md mx-auto">
        <div className="glass-card p-8 border border-white/5 bg-white/[0.02] text-center space-y-8">
          {/* Mode Selector */}
          <div className="flex gap-2 justify-center">
            {[
              { id: 'focus', label: 'Focus (25m)', color: 'purple' },
              { id: 'shortBreak', label: 'Short Break (5m)', color: 'blue' },
              { id: 'longBreak', label: 'Long Break (15m)', color: 'green' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => changeMode(m.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                  mode === m.id
                    ? 'border-brand-500 bg-brand-500/10 text-[#241b4b] dark:text-white'
                    : 'border-lavender/20 dark:border-white/5 bg-transparent hover:bg-lavender/5 text-[#6b6388] dark:text-gray-400'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Time Dial */}
          <div className="relative inline-flex items-center justify-center">
            {/* Outer Ring glow */}
            <div className="absolute inset-0 rounded-full bg-brand-500/5 blur-xl" />
            
            <div className="w-56 h-56 rounded-full border-4 border-white/70 dark:border-white/10 bg-white/70 dark:bg-slate-900/80 flex flex-col items-center justify-center relative">
              <span className="text-4xl sm:text-5xl font-mono font-bold text-[#241b4b] dark:text-white tracking-widest">
                {formatTime(secondsLeft)}
              </span>
              <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-2">
                {mode === 'focus' ? 'Focus Interval' : 'Rest Phase'}
              </span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center gap-4">
            <Button onClick={resetTimer} variant="secondary" className="p-3">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button onClick={toggleTimer} className="px-6 py-3 font-bold gap-2">
              {isRunning ? (
                <>
                  <Pause className="h-4 w-4" /> Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" /> Start
                </>
              )}
            </Button>
          </div>

          <div className="p-4 rounded-xl bg-warning-500/5 border border-warning-500/25 flex gap-3 text-left">
            <Coffee className="h-5 w-5 text-warning-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-gray-400 leading-relaxed">
              <span className="font-semibold text-white block">Avoid distractions</span>
              Close other browser tabs to protect your streak.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusTimer;
