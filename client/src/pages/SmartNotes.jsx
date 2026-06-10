import { useState } from 'react';
import { FileText, Plus, Sparkles, Save, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import TextArea from '../components/TextArea';
import Input from '../components/Input';
import Badge from '../components/Badge';

const SmartNotes = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Quantum Entanglement',
      subject: 'PHYS 410',
      content: 'Quantum entanglement is a physical phenomenon that occurs when a pair or group of particles are generated, interact, or share spatial proximity in a way such that the quantum state of each particle cannot be described independently of the state of the others.',
      summary: 'Particles remain connected such that actions performed on one affect the other, even when separated by large distances.',
      date: 'June 4, 2026',
    },
    {
      id: 2,
      title: 'Green\'s Theorem Overview',
      subject: 'MATH 301',
      content: 'Greens theorem gives the relationship between a line integral around a simple closed curve C and a double integral over the plane region D bounded by C. It is a special two-dimensional case of the more general Stokes theorem.',
      summary: 'Relates line integrals along a closed curve to double integrals over the region bounded by that curve.',
      date: 'June 2, 2026',
    },
  ]);

  const [selectedNoteId, setSelectedNoteId] = useState(1);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newSubject, setNewSubject] = useState('MATH 301');

  const selectedNote = notes.find((n) => n.id === selectedNoteId) || notes[0];

  const handleCreateNote = () => {
    const newNote = {
      id: Date.now(),
      title: newTitle || 'Untitled Note',
      subject: newSubject,
      content: newContent || 'Type your notes here...',
      summary: '',
      date: 'Today',
    };
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
    setNewTitle('');
    setNewContent('');
    toast.success('New note created!');
  };

  const handleGenerateSummary = () => {
    if (!selectedNote.content) {
      toast.error('Note is empty.');
      return;
    }
    setIsSummarizing(true);
    setTimeout(() => {
      setNotes(
        notes.map((n) =>
          n.id === selectedNote.id
            ? { ...n, summary: `AI-Synthesized Summary: Core concepts focus on ${n.title} key properties and formulas. Verified by StudyPulse AI.` }
            : n
        )
      );
      setIsSummarizing(false);
      toast.success('AI Summary Generated!');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Smart Notes"
        subtitle="AI-synthesized note taking and automatic study summary sheets."
        icon={FileText}
      />

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Notes list */}
        <div className="glass-card p-4 space-y-4 flex flex-col h-[550px]">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-xs font-semibold text-gray-400">YOUR NOTES</span>
            <Badge color="purple">{notes.length}</Badge>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {notes.map((note) => (
              <button
                key={note.id}
                onClick={() => setSelectedNoteId(note.id)}
                className={`w-full text-left p-3 rounded-xl border transition cursor-pointer ${
                  selectedNote.id === note.id
                    ? 'border-brand-500/30 bg-brand-500/10'
                    : 'border-white/5 bg-white/[0.01] hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-brand-300 font-semibold">{note.subject}</span>
                  <span className="text-[9px] text-gray-500">{note.date}</span>
                </div>
                <h4 className="font-semibold text-sm text-white truncate">{note.title}</h4>
                <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{note.content}</p>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/5 space-y-3">
            <Input
              placeholder="New Note Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="text-xs"
            />
            <Button onClick={handleCreateNote} className="w-full text-xs py-2 gap-1 justify-center">
              <Plus className="h-3.5 w-3.5" /> Create Note
            </Button>
          </div>
        </div>

        {/* Note Editor */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div>
                <span className="text-xs font-bold text-brand-300 uppercase tracking-wider">{selectedNote.subject}</span>
                <h3 className="text-lg font-bold text-white mt-0.5">{selectedNote.title}</h3>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleGenerateSummary}
                  disabled={isSummarizing}
                  variant="primary"
                  size="sm"
                  className="gap-1.5"
                >
                  <Sparkles className="h-4 w-4" /> {isSummarizing ? 'Analyzing...' : 'Generate AI Summary'}
                </Button>
                <Button variant="secondary" size="sm" className="gap-1.5" onClick={() => toast.success('Note saved!')}>
                  <Save className="h-4 w-4" /> Save
                </Button>
              </div>
            </div>

            <TextArea
              label="Note Content"
              rows={8}
              value={selectedNote.content}
              onChange={(e) => {
                setNotes(
                  notes.map((n) => (n.id === selectedNote.id ? { ...n, content: e.target.value } : n))
                );
              }}
              placeholder="Start typing your study notes here..."
            />

            {selectedNote.summary ? (
              <div className="mt-4 p-4 rounded-xl bg-brand-500/5 border border-brand-500/25">
                <h4 className="text-xs font-bold text-brand-300 flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="h-4 w-4 text-brand-400" /> AI STUDY SUMMARY
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed font-mono">{selectedNote.summary}</p>
              </div>
            ) : (
              <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center text-xs text-gray-500">
                Click "Generate AI Summary" to extract core insights.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartNotes;
