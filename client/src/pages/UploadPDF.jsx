import { useState } from 'react';
import { Upload, File, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import ProgressBar from '../components/ProgressBar';

const UploadPDF = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      setAnalysisResult(null);
    } else {
      toast.error('Only PDF files are supported.');
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setAnalysisResult(null);
    } else {
      toast.error('Only PDF files are supported.');
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast.error('Please select a file first.');
      return;
    }
    setUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setAnalysisResult({
            title: file.name,
            pages: 14,
            keyTopics: ['Linear Transforms', 'Eigenvalues & Eigenvectors', 'Diagonalization'],
            cardsGenerated: 12,
            questionsGenerated: 6,
          });
          toast.success('PDF analyzed and concepts processed!');
          return 100;
        }
        return prev + 20;
      });
    }, 400);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Upload PDF Lecture"
        subtitle="Upload your lecture transcripts or books and let the AI generate flashcards & quiz topics."
        icon={Upload}
      />

      <div className="max-w-2xl mx-auto">
        <div className="glass-card p-6 border border-white/5 bg-white/[0.02] space-y-6">
          {/* Drag & Drop Area */}
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-10 text-center transition flex flex-col items-center justify-center ${
              file ? 'border-brand-500/40 bg-brand-500/5' : 'border-purple-300/60 dark:border-cyan-300/30 bg-white/40 dark:bg-slate-900/55 text-[#241b4b] dark:text-white'
            }`}
          >
            <input
              type="file"
              id="pdf-upload"
              accept=".pdf"
              className="hidden"
              onChange={handleFileChange}
            />
            <label htmlFor="pdf-upload" className="cursor-pointer flex flex-col items-center">
              <Upload className="h-10 w-10 text-gray-500 mb-4" />
              <p className="font-semibold text-[#241b4b] dark:text-white">Drag & drop your lecture PDF here</p>
              <p className="text-xs text-[#6b6388] dark:text-slate-300 mt-1">or click to browse local files (Max size: 20MB)</p>
            </label>
          </div>

          {file && (
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-3">
                <File className="h-5 w-5 text-brand-400" />
                <div>
                  <p className="text-xs font-semibold text-white">{file.name}</p>
                  <p className="text-[10px] text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
              <Button size="sm" onClick={() => setFile(null)} variant="secondary">
                Remove
              </Button>
            </div>
          )}

          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-brand-300 font-semibold flex items-center gap-1.5">
                  <LoadingSpinner /> Extracting text features...
                </span>
                <span className="text-gray-500">{progress}%</span>
              </div>
              <ProgressBar value={progress} color="purple" showPercent={false} />
            </div>
          )}

          {!uploading && file && !analysisResult && (
            <Button onClick={handleUpload} className="w-full justify-center gap-2">
              <Sparkles className="h-4 w-4" /> Run AI Processing
            </Button>
          )}

          {analysisResult && (
            <div className="p-4 rounded-xl bg-success-500/5 border border-success-500/25 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-success-400">
                <CheckCircle2 className="h-4 w-4" /> PDF PARSED SUCCESSFULLY
              </div>
              <div className="space-y-2 text-xs">
                <p className="text-gray-300 font-semibold">Analyzed: {analysisResult.title}</p>
                <p className="text-gray-500">Total detected pages: {analysisResult.pages}</p>
                <div>
                  <p className="text-gray-400 mb-1">Extracted Core Topics:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {analysisResult.keyTopics.map((topic, i) => (
                      <span key={i} className="bg-white/5 border border-white/10 rounded-md px-2 py-0.5 text-[10px] text-gray-300">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 pt-2 border-t border-white/5 text-[11px] text-brand-300 font-semibold">
                  <span>✨ {analysisResult.cardsGenerated} Flashcards added</span>
                  <span>✨ {analysisResult.questionsGenerated} Quiz questions active</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPDF;
