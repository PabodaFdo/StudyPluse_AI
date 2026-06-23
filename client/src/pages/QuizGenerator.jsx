import { useState, useEffect } from 'react';
import { HelpCircle, Sparkles, AlertCircle, RefreshCw, BookOpen, FileText, Trophy } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import Select from '../components/Select';
import Badge from '../components/Badge';
import LoadingSpinner from '../components/LoadingSpinner';
import { generateQuiz } from '../services/quiz.service';

const getCorrectAnswerLabel = (question) => {
  const labels = ["A", "B", "C", "D"];

  if (!question.correct_answer) return "";

  if (labels.includes(question.correct_answer)) {
    return question.correct_answer;
  }

  const index = question.options?.findIndex(
    option => option.toLowerCase().trim() === question.correct_answer.toLowerCase().trim()
  );

  return index >= 0 ? labels[index] : question.correct_answer;
};

const QuizGenerator = () => {
  const [extractedText, setExtractedText] = useState(null);
  const [questionCount, setQuestionCount] = useState('5');
  const [difficulty, setDifficulty] = useState('medium');
  
  const [isLoading, setIsLoading] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});

  useEffect(() => {
    const text = localStorage.getItem('studypulse_extracted_text');
    if (text) {
      setExtractedText(text);
    }

    const savedQuiz = localStorage.getItem('studypulse_generated_quiz');
    if (savedQuiz) {
      try {
        setQuizResult(JSON.parse(savedQuiz));
      } catch (e) {
        console.error("Failed to parse saved quiz", e);
      }
    }

    const savedAnswers = localStorage.getItem('studypulse_quiz_selected_answers');
    if (savedAnswers) {
      try {
        setSelectedAnswers(JSON.parse(savedAnswers));
      } catch (e) {
        console.error("Failed to parse saved answers", e);
      }
    }

    const savedChecked = localStorage.getItem('studypulse_quiz_checked_questions');
    if (savedChecked) {
      try {
        setCheckedQuestions(JSON.parse(savedChecked));
      } catch (e) {
        console.error("Failed to parse checked questions", e);
      }
    }
  }, []);

  const handleGenerate = async () => {
    if (!extractedText) {
      toast.error('No extracted text found. Please upload a PDF first.');
      return;
    }
    
    setIsLoading(true);
    setQuizResult(null);
    setSelectedAnswers({});
    setCheckedQuestions({});
    
    localStorage.removeItem('studypulse_generated_quiz');
    localStorage.removeItem('studypulse_quiz_selected_answers');
    localStorage.removeItem('studypulse_quiz_checked_questions');
    
    try {
      const data = await generateQuiz({
        text: extractedText,
        question_count: questionCount,
        difficulty
      });
      setQuizResult(data);
      localStorage.setItem('studypulse_generated_quiz', JSON.stringify(data));
      localStorage.setItem('studypulse_quiz_selected_answers', JSON.stringify({}));
      localStorage.setItem('studypulse_quiz_checked_questions', JSON.stringify({}));
      toast.success('Quiz generated successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Unable to generate quiz right now. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewQuiz = () => {
    setQuizResult(null);
    setSelectedAnswers({});
    setCheckedQuestions({});
    localStorage.removeItem('studypulse_generated_quiz');
    localStorage.removeItem('studypulse_quiz_selected_answers');
    localStorage.removeItem('studypulse_quiz_checked_questions');
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setCheckedQuestions({});
    localStorage.setItem('studypulse_quiz_selected_answers', JSON.stringify({}));
    localStorage.setItem('studypulse_quiz_checked_questions', JSON.stringify({}));
  };

  const handleSelectAnswer = (idx, ans) => {
    setSelectedAnswers(prev => {
      const next = { ...prev, [idx]: ans };
      localStorage.setItem('studypulse_quiz_selected_answers', JSON.stringify(next));
      return next;
    });
  };

  const handleCheckAnswer = (idx, isCorrect) => {
    setCheckedQuestions(prev => {
      const next = { ...prev, [idx]: isCorrect };
      localStorage.setItem('studypulse_quiz_checked_questions', JSON.stringify(next));
      return next;
    });
  };

  const score = Object.keys(checkedQuestions).reduce((acc, index) => {
    if (checkedQuestions[index]) return acc + 1;
    return acc;
  }, 0);
  
  const totalChecked = Object.keys(checkedQuestions).length;

  if (!extractedText) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="AI Quiz Generator"
          subtitle="Generate adaptive quizzes directly from your PDF documents."
          icon={HelpCircle}
        />
        <div className="glass-card p-8 border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 shadow-sm text-center space-y-4">
          <BookOpen className="h-12 w-12 text-slate-400 dark:text-slate-500 mx-auto" />
          <h3 className="font-bold text-slate-800 dark:text-white text-lg">No Study Material Found</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto">
            Please upload and extract a PDF first to generate a quiz based on its contents.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Quiz Generator"
        subtitle="Generate adaptive quizzes directly from your extracted PDF."
        icon={HelpCircle}
      />

      <div className="max-w-3xl mx-auto space-y-6">
        {!quizResult && !isLoading && (
          <div className="glass-card p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-800 dark:text-white text-base flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-brand-500" /> Customize Your Quiz
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
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
              <Select
                label="Difficulty Level"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                options={[
                  { value: 'easy', label: 'Easy' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'hard', label: 'Hard' },
                ]}
              />
            </div>

            <Button onClick={handleGenerate} className="w-full justify-center">
              Generate Quiz
            </Button>
          </div>
        )}

        {isLoading && (
          <div className="glass-card p-12 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm flex flex-col items-center justify-center space-y-4">
            <LoadingSpinner size="lg" />
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">
              Analyzing text and generating quiz...
            </p>
          </div>
        )}

        {quizResult && !isLoading && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 shadow-sm">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-brand-500" />
                  <h3 className="font-bold text-slate-800 dark:text-white">Interactive Quiz</h3>
                </div>
                <div className="text-sm font-bold text-brand-600 dark:text-brand-400">
                  Score: {score} / {quizResult.questions.length}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  {quizResult.word_count} words
                </span>
                <Button variant="secondary" onClick={handleResetQuiz} className="h-7 text-xs px-3">
                  <RefreshCw className="h-3 w-3 mr-1" /> Reset Quiz
                </Button>
                <Button variant="secondary" onClick={handleNewQuiz} className="h-7 text-xs px-3">
                  <Sparkles className="h-3 w-3 mr-1" /> New Quiz
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {quizResult.questions.map((q, idx) => (
                <QuestionCard 
                  key={idx} 
                  question={q} 
                  index={idx}
                  selectedAnswer={selectedAnswers[idx]}
                  isChecked={checkedQuestions[idx] !== undefined}
                  isCorrect={checkedQuestions[idx]}
                  onSelect={(ans) => handleSelectAnswer(idx, ans)}
                  onCheck={(isCorrect) => handleCheckAnswer(idx, isCorrect)}
                />
              ))}
            </div>

            {/* Disclaimer */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-800 dark:text-blue-300">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed">
                Note: AI-generated quizzes may contain mistakes. Please review with your original study material.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const QuestionCard = ({ question, index, selectedAnswer, isChecked, isCorrect, onSelect, onCheck }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const labels = ["A", "B", "C", "D"];
  const correctLabel = getCorrectAnswerLabel(question);

  // Force show answer reset if parent resets quiz
  useEffect(() => {
    if (!isChecked && !selectedAnswer) {
      setShowAnswer(false);
    }
  }, [isChecked, selectedAnswer]);

  const handleCheck = () => {
    if (!selectedAnswer) return;
    const isAnsCorrect = selectedAnswer === correctLabel;
    onCheck(isAnsCorrect);
  };

  return (
    <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Badge color="purple">Question {index + 1}</Badge>
        {question.type === 'mcq' ? (
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Multiple Choice</span>
        ) : (
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Short Answer</span>
        )}
      </div>
      
      <h4 className="font-bold text-slate-800 dark:text-white mb-4 text-base">
        {question.question}
      </h4>

      {question.type === 'mcq' && question.options && question.options.length > 0 && (
        <div className="space-y-2 mb-6">
          {question.options.map((opt, i) => {
            const label = labels[i];
            const isSelected = selectedAnswer === label;
            
            let borderClass = "border-slate-200 bg-slate-50 hover:bg-slate-100 dark:border-slate-600/50 dark:bg-slate-900/40 dark:hover:bg-slate-800/70";
            let textClass = "text-slate-700 dark:text-slate-100 font-medium";
            let labelClass = "font-bold text-brand-600 dark:text-brand-300 mr-3";

            if (isChecked) {
              if (label === correctLabel) {
                borderClass = "border-success-400 bg-success-50 dark:border-success-400 dark:bg-success-500/20";
                textClass = "text-success-800 dark:text-success-100 font-medium";
                labelClass = "font-bold text-success-600 dark:text-success-300 mr-3";
              } else if (isSelected && label !== correctLabel) {
                borderClass = "border-red-400 bg-red-50 dark:border-red-400 dark:bg-red-500/20";
                textClass = "text-red-800 dark:text-red-100 font-medium";
                labelClass = "font-bold text-red-600 dark:text-red-300 mr-3";
              } else {
                borderClass = "border-slate-200 bg-slate-50 dark:border-slate-600/30 dark:bg-slate-900/20";
                textClass = "text-slate-500 dark:text-slate-300 font-medium";
                labelClass = "font-bold text-slate-400 dark:text-slate-400 mr-3";
              }
            } else {
              if (isSelected) {
                borderClass = "border-brand-400 bg-brand-50 dark:border-brand-400 dark:bg-brand-500/20 ring-1 ring-brand-400";
                textClass = "text-brand-900 dark:text-slate-100 font-medium";
              }
            }

            return (
              <button 
                key={i} 
                onClick={() => !isChecked && onSelect(label)}
                disabled={isChecked}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 cursor-pointer disabled:cursor-default flex items-start ${borderClass}`}
              >
                <span className={labelClass}>{label}.</span>
                <span className={textClass}>{opt}</span>
              </button>
            );
          })}
        </div>
      )}

      {question.type === 'mcq' ? (
        !isChecked ? (
          <Button onClick={handleCheck} disabled={!selectedAnswer} className="w-full justify-center">
            Check Answer
          </Button>
        ) : (
          <div className={`mt-4 p-4 rounded-xl border ${isCorrect ? 'bg-success-50 border-success-200 dark:bg-success-500/10 dark:border-success-500/20' : 'bg-red-50 border-red-200 dark:bg-red-500/10 dark:border-red-500/20'}`}>
            <div className="mb-2">
              <span className={`text-xs font-bold uppercase tracking-wider block mb-1 ${isCorrect ? 'text-success-700 dark:text-success-400' : 'text-red-700 dark:text-red-400'}`}>
                {isCorrect ? 'Correct!' : 'Incorrect.'}
              </span>
              {!isCorrect && (
                <p className="text-sm font-semibold text-slate-800 dark:text-white">
                  Correct answer is {correctLabel}. {question.options[labels.indexOf(correctLabel)] || question.correct_answer}
                </p>
              )}
            </div>
            {question.explanation && (
              <div className={`mt-3 pt-3 border-t ${isCorrect ? 'border-success-200 dark:border-success-500/20' : 'border-red-200 dark:border-red-500/20'}`}>
                <span className={`text-xs font-bold uppercase tracking-wider block mb-1 ${isCorrect ? 'text-success-700 dark:text-success-400' : 'text-red-700 dark:text-red-400'}`}>Explanation</span>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{question.explanation}</p>
              </div>
            )}
          </div>
        )
      ) : (
        // Short Answer UI
        !showAnswer ? (
          <Button variant="secondary" onClick={() => setShowAnswer(true)} className="w-full justify-center">
            Show Answer
          </Button>
        ) : (
          <div className="mt-4 p-4 rounded-xl bg-success-50 dark:bg-success-500/10 border border-success-200 dark:border-success-500/20">
            <div className="mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-success-700 dark:text-success-400 block mb-1">Correct Answer</span>
              <p className="text-sm font-semibold text-slate-800 dark:text-white">{question.correct_answer}</p>
            </div>
            {question.explanation && (
              <div className="mt-3 pt-3 border-t border-success-200 dark:border-success-500/20">
                <span className="text-xs font-bold uppercase tracking-wider text-success-700 dark:text-success-400 block mb-1">Explanation</span>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{question.explanation}</p>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default QuizGenerator;
