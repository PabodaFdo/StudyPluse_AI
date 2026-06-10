import { motion } from 'framer-motion';
import {
  BookOpen,
  Brain,
  Timer,
  Trophy,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Smart Notes',
    description: 'AI-powered note-taking with auto-summarisation and flashcard generation.',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: Brain,
    title: 'AI Quizzes',
    description: 'Adaptive quizzes that learn your weak spots and focus your revision.',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    icon: Timer,
    title: 'Focus Sessions',
    description: 'Pomodoro-style timers with ambient sounds and distraction blocking.',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    icon: TrendingUp,
    title: 'Risk Predictions',
    description: 'ML-based early warnings for academic risks so you can course-correct.',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    icon: Trophy,
    title: 'Gamified Progress',
    description: 'Earn XP, unlock badges, and climb the leaderboard as you study.',
    gradient: 'from-emerald-500 to-green-600',
  },
  {
    icon: Sparkles,
    title: 'Subject Manager',
    description: 'Organise subjects, set goals, and track progress across every course.',
    gradient: 'from-fuchsia-500 to-violet-600',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      {/* ─── Hero ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-12 flex flex-col items-center text-center"
      >
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
          <Sparkles className="h-3 w-3" /> AI-Powered Study Platform
        </span>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Study Smarter with{' '}
          <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            StudyPulse AI
          </span>
        </h1>
        <p className="mt-4 max-w-xl text-base text-gray-400 sm:text-lg">
          Manage subjects, take smart notes, run focus sessions, ace quizzes, predict risks, and
          gamify your study life — all in one place.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3 text-sm font-semibold shadow-lg shadow-violet-500/25 transition hover:shadow-violet-500/40">
            Get Started
          </button>
          <button className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold transition hover:bg-white/10">
            Learn More
          </button>
        </div>
      </motion.section>

      {/* ─── Features Grid ─── */}
      <section className="mt-24 w-full">
        <h2 className="mb-10 text-center text-2xl font-bold sm:text-3xl">
          Everything you need to{' '}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            excel
          </span>
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-6 transition hover:border-white/10 hover:bg-white/[0.06]"
            >
              <div
                className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${f.gradient} p-2.5 text-white shadow-lg`}
              >
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-1 text-lg font-semibold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{f.description}</p>

              {/* Subtle glow on hover */}
              <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition group-hover:opacity-100">
                <div className={`h-full w-full rounded-2xl bg-gradient-to-br ${f.gradient} opacity-5`} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Footer spacer ─── */}
      <div className="mt-32" />
    </div>
  );
};

export default Home;
