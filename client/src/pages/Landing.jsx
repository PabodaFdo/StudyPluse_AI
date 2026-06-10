import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen, Brain, Timer, Trophy, TrendingUp, Sparkles,
  ArrowRight, CheckCircle2, ShieldAlert, Sparkle, Cpu, HeartPulse, Check
} from 'lucide-react';
import Button from '../components/Button';
import Badge from '../components/Badge';
import AnimatedCharacter from '../components/AnimatedCharacter';
import FloatingDecorations from '../components/FloatingDecorations';
import studyGirlReading from '../assets/characters/study-girl-reading.png';

const features = [
  {
    icon: BookOpen,
    title: 'Smart Notes & PDF Upload',
    description: 'Upload lecture PDFs and get immediate auto-summarized study guides and questions.',
    color: 'purple',
  },
  {
    icon: Brain,
    title: 'AI Quizzes & Flashcards',
    description: 'Generate adaptive quizzes and cards tailored to your curriculum in seconds.',
    color: 'blue',
  },
  {
    icon: Timer,
    title: 'Focus Sessions & Timer',
    description: 'Pomodoro-style sessions that track your study hours and alert on burnout risks.',
    color: 'yellow',
  },
  {
    icon: TrendingUp,
    title: 'Academic Risk Warnings',
    description: 'Advanced predictive analytics help identify grades at risk before exams occur.',
    color: 'red',
  },
  {
    icon: Trophy,
    title: 'Gamified Study Garden',
    description: 'Grow your digital garden by finishing tasks, completing quests, and earning XP.',
    color: 'green',
  },
  {
    icon: HeartPulse,
    title: 'Burnout & Wellness Monitoring',
    description: 'Check in on your weekly mood, view subject health scores, and stay healthy.',
    color: 'purple',
  },
];

const steps = [
  {
    num: '01',
    title: 'Set Up Subjects',
    description: 'Create your modules, organize study goals, and prepare your personal learning workspace.',
    icon: '📚',
  },
  {
    num: '02',
    title: 'Upload & Generate',
    description: 'Upload notes or PDFs and generate summaries, quizzes, flashcards, and study plans.',
    icon: '🧠',
  },
  {
    num: '03',
    title: 'Study & Grow',
    description: 'Use focus sessions, complete quests, revise notes, and grow your virtual Study Garden.',
    icon: '🌱',
  },
  {
    num: '04',
    title: 'Predict & Improve',
    description: 'Track academic risk, weak topics, subject health, and receive improvement suggestions.',
    icon: '📈',
  },
];

const Landing = () => {
  const studentsCombined = studyGirlReading;
  return (
    <div className="pastel-page text-text-main overflow-x-hidden min-h-screen relative">
      <FloatingDecorations />

      {/* ─── Hero Section ─── */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden px-6 py-16 lg:py-20 z-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-12 items-center gap-12 w-full">
          
          {/* Left Side Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left lg:col-span-5"
          >
            <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border-2 border-lavender/30 bg-white/70 px-4 py-1.5 text-xs font-bold text-purple shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-purple" /> Introducing StudyPulse AI 2.0 🌱
            </span>
            <h1 className="max-w-xl text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-text-main">
              Study smarter,{' '}
              <span className="bg-gradient-to-r from-purple via-pink to-lavender bg-clip-text text-transparent">
                grow better
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-sm sm:text-base text-text-muted leading-relaxed font-semibold">
              StudyPulse AI helps students organize notes, generate quizzes, track focus sessions, predict academic risk, and grow a virtual Study Garden through consistent learning.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link to="/register">
                <Button size="lg" variant="clay">
                  Get Started Free <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" size="lg" className="border-2">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Center Column: Animated Character with Rings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center relative w-full lg:col-span-4"
          >
            <div className="hero-creative-orbit group">
              <div className="hero-aura hero-aura-1"></div>
              <div className="hero-aura hero-aura-2"></div>
              <div className="hero-aura hero-aura-3"></div>

              <div className="orbit-ring ring-main"></div>
              <div className="orbit-ring ring-secondary"></div>
              <div className="orbit-ring ring-vertical"></div>
              <div className="orbit-ring ring-soft"></div>

              <div className="orbit-platform"></div>

              <div className="orbit-icon-card icon-book">📘</div>
              <div className="orbit-icon-card icon-brain">🧠</div>
              <div className="orbit-icon-card icon-timer">⏱️</div>
              <div className="orbit-icon-card icon-plant">🌱</div>
              <div className="orbit-icon-card icon-sparkle">✨</div>
              <div className="orbit-icon-card icon-quiz">📝</div>

              <div className="sparkle-particle sparkle-1"></div>
              <div className="sparkle-particle sparkle-2"></div>
              <div className="sparkle-particle sparkle-3"></div>
              <div className="sparkle-particle sparkle-4"></div>

              <img
                src={studentsCombined}
                alt="StudyPulse AI students"
                className="hero-students-image"
              />
            </div>
          </motion.div>

          {/* Right Column: Mini Support Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:col-span-3 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[320px]">
              <div className="liquid-card p-6 shadow-md border-2 border-white/40 hover:-translate-y-1 transition-all duration-300">
                <div className="liquid-card-content space-y-4">
                  <Badge color="purple">Virtual Mentor</Badge>
                  <h3 className="text-lg font-extrabold text-text-main">
                    Meet your Study Companion
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed font-bold">
                    Your virtual learning buddy helps guide focus, revision, and daily study growth.
                  </p>
                  <a href="#features" className="block">
                    <Button variant="secondary" size="sm" className="w-full justify-center">
                      Explore Features
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ─── Dashboard Preview ─── */}
      <section className="px-6 pb-20 lg:px-8 max-w-7xl mx-auto z-10 relative">
        <div className="relative rounded-3xl border-2 border-white bg-white/50 p-3 shadow-xl backdrop-blur-md">
          <div className="rounded-2xl border border-lavender/20 bg-white p-4 sm:p-6 overflow-hidden">
            {/* Top Toolbar mimic */}
            <div className="flex items-center justify-between border-b border-lavender/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full bg-pink" />
                <span className="h-3.5 w-3.5 rounded-full bg-yellow" />
                <span className="h-3.5 w-3.5 rounded-full bg-mint" />
                <span className="ml-2 text-xs text-text-muted font-bold font-mono">dashboard_preview.exe</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-purple bg-lavender/10 px-3 py-1 rounded-full">
                <Sparkle className="h-3.5 w-3.5" /> AI Model Online
              </div>
            </div>

            {/* Simulated Grid layout */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="clay-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-muted font-bold">Study Garden</span>
                  <Trophy className="h-4 w-4 text-purple" />
                </div>
                <div className="text-lg font-extrabold text-text-main">Healthy Plant 🌱</div>
                <p className="text-xs text-text-muted mt-1">145 Growth Points</p>
                <div className="w-full bg-lavender/10 h-2.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple to-pink h-full w-[65%]" />
                </div>
              </div>

              <div className="clay-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-muted font-bold">Focus Sessions</span>
                  <Timer className="h-4 w-4 text-purple" />
                </div>
                <div className="text-lg font-extrabold text-text-main">12 Sessions</div>
                <p className="text-xs text-text-muted mt-1">+15% focus duration vs last week</p>
                <div className="flex gap-1.5 mt-3 justify-between items-end h-10">
                  {[20, 35, 10, 45, 25, 55, 30].map((v, i) => (
                    <div key={i} className="flex-1 bg-lavender/30 rounded-full" style={{ height: `${v}%` }} />
                  ))}
                </div>
              </div>

              <div className="clay-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-muted font-bold">ML Risk Assessment</span>
                  <TrendingUp className="h-4 w-4 text-purple" />
                </div>
                <div className="text-lg font-extrabold text-purple">Low Risk (8%)</div>
                <p className="text-xs text-text-muted mt-1">Optimized performance indicators</p>
                <div className="flex items-center gap-1.5 mt-3 text-xs text-purple font-bold">
                  <CheckCircle2 className="h-3.5 w-3.5 text-purple" /> Keep studying Calculus!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Problem Section ─── */}
      <section className="px-6 py-20 bg-white/40 border-y border-lavender/20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-text-main">The Student Dilemma</h2>
            <p className="text-text-muted mt-4 font-semibold">Traditional academic systems fail to address modern students' learning challenges.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Information Overload',
                desc: 'Lectures, heavy PDFs, web notes, and textbooks overwhelm students, leading to disjointed study sessions.',
                reason: 'Too many formats to track',
                color: 'purple'
              },
              {
                title: 'High Burnout Rates',
                desc: 'Continuous cramming with poor pacing results in severe stress, dropouts, and low mood cycles.',
                reason: 'No early warning systems',
                color: 'red'
              },
              {
                title: 'Lack of Engagement',
                desc: 'Dry review materials make studying feel like a chore. Motivation drops rapidly without feedback.',
                reason: 'No gamified incentives',
                color: 'green'
              }
            ].map((p, i) => (
              <div key={i} className="clay-card p-6 flex flex-col justify-between hover-lift">
                <div>
                  <Badge color={p.color} className="mb-3">{p.reason}</Badge>
                  <h3 className="text-lg font-extrabold text-text-main mb-2">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features Grid Section ─── */}
      <section id="features" className="px-6 py-20 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-text-main">Explore All Features</h2>
          <p className="text-text-muted mt-4 font-semibold">Every tool you need to balance academic focus, content synthesis, and study tracking.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, idx) => (
            <div key={idx} className="liquid-card liquid-card-hover p-8 group transition-all duration-300">
              <div className="liquid-card-content relative">
                {/* Lighter circle glow behind icon */}
                <div className="absolute -top-3 -left-3 w-16 h-16 rounded-full bg-purple/10 blur-md opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 -z-10" />
                
                <div className="liquid-icon mb-8 transition-transform duration-300 group-hover:-translate-y-1">
                  <f.icon className="h-6 w-6 text-purple" />
                </div>
                <h3 className="text-xl font-bold text-[#241b4b] mb-3">{f.title}</h3>
                <p className="text-[#6b6388] leading-relaxed text-sm font-medium">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── AI Study Assistant Section ─── */}
      <section className="px-6 py-20 bg-white/40 border-y border-lavender/20 relative z-10">
        <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <Badge color="purple" className="mb-2">Virtual Mentor</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main mt-2">AI Smart Study Planner & Quizzes</h2>
            <p className="text-text-muted mt-4 leading-relaxed font-semibold">
              Upload textbook chapters or transcripts, and watch as our AI creates step-by-step revision timelines, questions, and custom flashcards. It continuously learns what concepts you struggle with and optimizes reminders to save time.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Instant PDF parsing to structured summaries',
                'Custom flashcards with active recall testing',
                'Daily schedules dynamically adjusted'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-bold text-text-main">
                  <Check className="h-4 w-4 text-purple" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="clay-card p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-lavender flex items-center justify-center text-xs font-bold text-white shadow-sm">AI</div>
              <div>
                <p className="text-sm font-bold text-text-main">StudyPulse Assistant</p>
                <p className="text-xs text-text-muted">Ready to synthesize documentation</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-[#f8f3ff] rounded-2xl p-4 text-xs font-bold text-text-muted max-w-[85%] border border-lavender/25">
                "Hi! I analyzed your Calculus III PDF. I recommend focusing on Green's Theorem today. Would you like a quick 5-card quiz?"
              </div>
              <div className="bg-lavender/25 border border-lavender/35 rounded-2xl p-4 text-xs font-bold text-purple self-end ml-auto max-w-[80%]">
                "Yes please, focus on matching the vector fields."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Study Garden Section ─── */}
      <section className="px-6 py-20 max-w-7xl mx-auto relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="order-2 lg:order-1 clay-card p-6 flex flex-col items-center">
            
            {/* plant-buddy representation */}
            <div className="flex gap-4 items-center mb-6 w-full border-b border-lavender/10 pb-4">
              <AnimatedCharacter
                src="/src/assets/characters/plant-buddy.png"
                variant="plant"
                size="md"
              />
              <div>
                <h4 className="font-extrabold text-sm text-text-main">Your Garden Buddy</h4>
                <p className="text-[10px] text-text-muted leading-relaxed">
                  Earn drops and plant seeds to grow different custom flora!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 w-full">
              {[
                { name: 'Tulip', level: 3, color: 'text-rose-400', icon: '🌷' },
                { name: 'Rose', level: 5, color: 'text-pink-400', icon: '🌹' },
                { name: 'Sunflower', level: 2, color: 'text-amber-400', icon: '🌻' },
                { name: 'Lotus', level: 4, color: 'text-indigo-400', icon: '🪷' },
                { name: 'Lavender', level: 1, color: 'text-violet-400', icon: '🪻' },
                { name: 'Orchid', level: 6, color: 'text-fuchsia-400', icon: '🌸' },
                { name: 'Daisy', level: 3, color: 'text-yellow-400', icon: '🌼' },
                { name: 'Fern', level: 4, color: 'text-emerald-400', icon: '🌿' },
              ].map((f, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-2.5 bg-[#f8f3ff] rounded-2xl border-2 border-lavender/10 hover:border-purple/30 transition">
                  <span className="text-2xl">{f.icon}</span>
                  <span className="text-[10px] text-text-main mt-1 font-bold">{f.name}</span>
                  <span className="text-[8px] text-text-muted">Lv.{f.level}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <Badge color="green" className="mb-2">Study Garden Unique Feature</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main mt-2">Earn XP & Bloom Your Study Garden</h2>
            <p className="text-text-muted mt-4 leading-relaxed font-semibold">
              Academic growth doesn't have to be monotonous. Earn water drops, seeds, and fertilizer points by finishing your focus milestones, scoring high on AI quizzes, and completing daily quests. Discover rare digital flowers and store them in your Collection Album.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Academic Risk Prediction Section ─── */}
      <section className="px-6 py-20 bg-white/40 border-y border-lavender/20 relative z-10">
        <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <Badge color="red" className="mb-2">Machine Learning Early Warnings</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main mt-2">Academic Risk Analytics & Warnings</h2>
            <p className="text-text-muted mt-4 leading-relaxed font-semibold">
              Our advanced analytical engine looks at study frequency, smart quiz scores, subject goals, focus duration, and mood records to project potential performance drop-offs. Catch subjects at risk weeks before midterms and finals so you can confidently adjust focus.
            </p>
          </div>
          <div className="clay-card p-6 shadow-md">
            <h3 className="text-sm font-extrabold text-text-main mb-4 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-purple animate-pulse-soft" /> ML Course Risk Engine
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Organic Chemistry', risk: 'High Risk (76%)', color: 'red' },
                { name: 'Differential Equations', risk: 'Medium Risk (32%)', color: 'yellow' },
                { name: 'Intro to Computer Science', risk: 'Low Risk (4%)', color: 'green' }
              ].map((sub, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-[#f8f3ff] rounded-2xl border border-lavender/20">
                  <span className="text-xs text-text-main font-bold">{sub.name}</span>
                  <Badge color={sub.color}>{sub.risk}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── How It Works Section ─── */}
      <section className="relative overflow-hidden py-28 z-10">
        <div className="absolute left-10 top-20 h-40 w-40 rounded-full bg-purple-300/20 blur-3xl"></div>
        <div className="absolute right-10 bottom-20 h-48 w-48 rounded-full bg-pink-300/20 blur-3xl"></div>

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <span className="inline-flex rounded-full bg-white/50 px-5 py-2 text-sm font-bold text-purple-600 shadow-sm border border-white/60">
              Learning Flow
            </span>
            <h2 className="mt-6 text-4xl md:text-5xl font-black text-[#241b4b]">
              How StudyPulse Works
            </h2>
            <p className="mt-4 text-lg font-semibold text-[#6b6388]">
              From setup to smarter learning, StudyPulse guides students through a simple AI-powered study flow.
            </p>
          </div>

          <div className="process-timeline">
            {steps.map((st, i) => (
              <div key={i} className="process-step-card group">
                <div className="process-step-content">
                  <div className="process-step-number">{st.num}</div>
                  <div className="process-icon">{st.icon}</div>
                  <h3>{st.title}</h3>
                  <p>{st.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="relative px-6 py-24 text-center max-w-5xl mx-auto z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-purple/10 to-pink/10 rounded-3xl blur-2xl -z-10" />
        <div className="clay-card p-10 sm:p-16 overflow-hidden relative">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-text-main leading-tight">Ready to Elevate Your Study Game?</h2>
          <p className="mt-4 max-w-xl mx-auto text-xs sm:text-sm text-text-muted font-bold leading-relaxed">
            Gain immediate access to custom AI planners, study garden badges, early risk calculations, and comprehensive notes tools.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/register">
              <Button size="lg" variant="clay">Get Started For Free</Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg" className="border-2">Student Log In</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
