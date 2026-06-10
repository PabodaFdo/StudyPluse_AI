import { useState } from 'react';
import { HelpCircle, Sparkles, AlertCircle, RefreshCw, Trophy } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import Select from '../components/Select';
import Badge from '../components/Badge';

const mockQuestions = [
  {
    question: 'Which of the following describes Quantum Entanglement?',
    options: [
      'Two particles coordinate via classical radio waves',
      'The quantum states of particles cannot be described independently',
      'Electrons orbit protons in perfect concentric shells',
      'A method to increase CPU clock speeds locally'
    ],
    answer: 1,
  },
  {
    question: "What is Green's Theorem used for?",
    options: [
      'Finding the velocity of sound in solids',
      'Relating line integrals around a closed curve to double integrals over the bounded region',
      'Calculating the risk of student burnout in real-time',
      'Optimizing rendering times for Framer Motion transitions'
    ],
    answer: 1,
  },
  {
    question: 'What is the worst-case time complexity of searching in a Binary Search Tree (unbalanced)?',
    options: ['O(log n)', 'O(1)', 'O(n)', 'O(n log n)'],
    answer: 2,
  }
];

const QuizGenerator = () => {
  const [selectedSubject, setSelectedSubject] = useState('PHYS 410');
  const [questionCount, setQuestionCount] = useState('3');
  const [quizActive, setQuizActive] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const startQuiz = () => {
    setQuizActive(true);
    setQuizFinished(false);
    setCurrentIdx(0);
    setScore(0);
    setSelectedOpt(null);
    toast.success(`Generated ${questionCount} questions for ${selectedSubject}!`);
  };

  const handleNext = () => {
    if (selectedOpt === null) {
      toast.error('Please select an option');
      return;
    }
    const currentQ = mockQuestions[currentIdx];
    let nextScore = score;
    if (selectedOpt === currentQ.answer) {
      nextScore += 1;
      setScore(nextScore);
      toast.success('Correct answer! +5 XP');
    } else {
      toast.error(`Incorrect. Correct: ${currentQ.options[currentQ.answer]}`);
    }

    if (currentIdx + 1 < mockQuestions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOpt(null);
    } else {
      setQuizFinished(true);
      toast.success('Quiz completed! Check your final standings.');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Quiz Generator"
        subtitle="Test your knowledge with adaptive, AI-generated curriculum quiz questions."
        icon={HelpCircle}
      />

      <div className="max-w-2xl mx-auto">
        {!quizActive ? (
          <div className="glass-card p-6 border border-white/5 bg-white/[0.02] space-y-6">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-brand-400" /> Customize Your Quiz
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <Select
                label="Target Subject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                options={[
                  { value: 'PHYS 410', label: 'Quantum Mechanics (PHYS 410)' },
                  { value: 'MATH 301', label: 'Calculus III (MATH 301)' },
                  { value: 'CS 210', label: 'Data Structures (CS 210)' },
                  { value: 'CHEM 202', label: 'Organic Chemistry (CHEM 202)' },
                ]}
              />
              <Select
                label="Number of Questions"
                value={questionCount}
                onChange={(e) => setQuestionCount(e.target.value)}
                options={[
                  { value: '3', label: '3 Questions (Quick)' },
                  { value: '5', label: '5 Questions (Medium)' },
                  { value: '10', label: '10 Questions (Complete)' },
                ]}
              />
            </div>

            <Button onClick={startQuiz} className="w-full justify-center">
              Generate AI Quiz
            </Button>
          </div>
        ) : !quizFinished ? (
          <div className="glass-card p-6 border border-white/5 bg-white/[0.02] space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <Badge color="purple">Question {currentIdx + 1} of {mockQuestions.length}</Badge>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">{selectedSubject}</span>
            </div>

            <div>
              <h3 className="font-semibold text-white text-base">{mockQuestions[currentIdx].question}</h3>
              <div className="space-y-2 mt-4">
                {mockQuestions[currentIdx].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedOpt(i)}
                    className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition cursor-pointer ${
                      selectedOpt === i
                        ? 'border-brand-500 bg-brand-500/10 text-white'
                        : 'border-white/5 bg-white/[0.01] hover:bg-white/[0.03] text-gray-300'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/5">
              <Button variant="secondary" onClick={() => setQuizActive(false)}>
                Quit Quiz
              </Button>
              <Button onClick={handleNext}>
                {currentIdx + 1 === mockQuestions.length ? 'Finish Quiz' : 'Next Question'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="glass-card p-6 border border-white/5 bg-white/[0.02] text-center space-y-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-success-500/15 text-success-400">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Quiz Completed!</h3>
              <p className="text-sm text-gray-400 mt-1">
                You scored {score} out of {mockQuestions.length} on the {selectedSubject} quiz.
              </p>
              <p className="text-xs text-brand-300 font-bold mt-2">+{score * 15} XP Earned</p>
            </div>

            <div className="flex justify-center gap-3">
              <Button onClick={() => setQuizActive(false)} variant="secondary">
                Back to Customizer
              </Button>
              <Button onClick={startQuiz} className="gap-1">
                <RefreshCw className="h-4 w-4" /> Retake Quiz
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizGenerator;
