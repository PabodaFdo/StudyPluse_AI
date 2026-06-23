import { useState, useEffect } from 'react';
import { FileText, Sparkles, AlertCircle, BookOpen, Clock, BrainCircuit } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../components/PageHeader';
import { generateSummary } from '../services/summary.service';

const GenerateSummary = () => {
  const [extractedText, setExtractedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [summaryResult, setSummaryResult] = useState(null);

  useEffect(() => {
    const text = localStorage.getItem('studypulse_extracted_text');
    if (text) {
      setExtractedText(text);
    }
  }, []);

  const handleGenerateSummary = async () => {
    if (!extractedText) {
      toast.error('No text found. Please extract a PDF first.');
      return;
    }

    setIsGenerating(true);
    setSummaryResult(null);

    try {
      const data = await generateSummary(extractedText);
      setSummaryResult(data);
      toast.success('Summary generated successfully!');
    } catch (error) {
      console.error('Summary Generation Error:', error);
      toast.error('Unable to generate summary right now. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!extractedText) {
    return (
      <div className="space-y-6 pb-12">
        <PageHeader
          title="Generate AI Summary"
          subtitle="Transform your uploaded PDF notes into a condensed, easy-to-read study summary."
          icon={BrainCircuit}
        />
        <div className="max-w-3xl mx-auto mt-12">
          <div className="glass-card p-10 border border-white/10 bg-white/[0.02] dark:bg-slate-900/40 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center">
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full mb-4">
              <FileText className="h-10 w-10 text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No Extracted Text Found</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md">
              Please upload and extract a PDF first before generating a summary.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Generate AI Summary"
        subtitle="Transform your uploaded PDF notes into a condensed, easy-to-read study summary."
        icon={BrainCircuit}
      />

      <div className="max-w-4xl mx-auto space-y-8">
        {!summaryResult && (
          <div className="glass-card p-8 border border-white/10 bg-white/[0.02] dark:bg-slate-900/40 rounded-2xl shadow-xl text-center">
            <div className="bg-brand-500/10 p-4 rounded-full inline-block mb-4">
              <BookOpen className="h-10 w-10 text-brand-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Ready to Summarize</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-lg mx-auto">
              We found your extracted PDF text. Click the button below to generate a smart study summary.
            </p>
            <button
              onClick={handleGenerateSummary}
              disabled={isGenerating}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60 shadow-lg shadow-brand-500/20"
            >
              <Sparkles className="h-5 w-5" />
              {isGenerating ? 'Generating Summary...' : 'Generate Summary'}
            </button>
          </div>
        )}

        {summaryResult && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header / Badges */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
              <div className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-brand-500" />
                <h3 className="font-bold text-slate-800 dark:text-white">AI Summary Results</h3>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  {summaryResult.word_count} words
                </span>
              </div>
            </div>

            {/* Important Study Points */}
            <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg">
              <h4 className="font-bold text-brand-600 dark:text-brand-400 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                <Sparkles className="h-4 w-4" /> Important Study Points
              </h4>
              <ul className="space-y-3">
                {summaryResult.important_points?.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[10px] font-bold text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
                      {index + 1}
                    </span>
                    <span className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Summary */}
            <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg">
              <h4 className="font-bold text-slate-800 dark:text-white mb-3 text-lg">
                Main Summary
              </h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                {summaryResult.main_summary}
              </p>
            </div>

            {/* Section Summaries */}
            {summaryResult.section_summaries && summaryResult.section_summaries.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-bold text-brand-600 dark:text-brand-400 flex items-center gap-2 text-sm uppercase tracking-wider px-2">
                  <BookOpen className="h-4 w-4" /> Section Summaries
                </h4>
                <div className="grid gap-4 md:grid-cols-2">
                  {summaryResult.section_summaries.map((section, index) => (
                    <div key={index} className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 shadow-sm flex flex-col h-full">
                      <h5 className="font-bold text-slate-800 dark:text-white mb-2 text-md">
                        {section.section_title}
                      </h5>
                      <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed whitespace-pre-wrap flex-grow mb-3">
                        {section.section_summary}
                      </p>
                      {section.important_points && section.important_points.length > 0 && (
                        <div className="mt-auto pt-3 border-t border-slate-200 dark:border-slate-800">
                          <ul className="space-y-1.5">
                            {section.important_points.map((point, pIndex) => (
                              <li key={pIndex} className="flex items-start gap-2">
                                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-[9px] font-bold text-brand-700 dark:text-brand-300">
                                  {pIndex + 1}
                                </span>
                                <span className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Terms */}
            {summaryResult.key_terms && summaryResult.key_terms.length > 0 && (
              <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 shadow-sm">
                <h4 className="font-bold text-slate-800 dark:text-white mb-4 text-sm uppercase tracking-wider">
                  Key Terms
                </h4>
                <div className="flex flex-wrap gap-2">
                  {summaryResult.key_terms.map((term, index) => (
                    <span key={index} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700">
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-800 dark:text-blue-300">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed">
                Note: AI can make mistakes. Please review the summary with your original study material.
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateSummary;
