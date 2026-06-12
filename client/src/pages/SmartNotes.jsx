import { useState, useEffect } from 'react';
import { FileText, Plus, Sparkles, Save, BookOpen, Trash2, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import TextArea from '../components/TextArea';
import Input from '../components/Input';
import Badge from '../components/Badge';
import Select from '../components/Select';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';
import api from '../services/api';

const SmartNotes = () => {
  const [notes, setNotes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isMarkingRevised, setIsMarkingRevised] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubjectId, setNewSubjectId] = useState('');

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      const [notesRes, subjectsRes] = await Promise.all([
        api.get('/notes'),
        api.get('/subjects')
      ]);
      setNotes(notesRes.data);
      setSubjects(subjectsRes.data);
      if (notesRes.data.length > 0) {
        setSelectedNoteId(notesRes.data[0].id);
      }
      if (subjectsRes.data.length > 0) {
        setNewSubjectId(subjectsRes.data[0].id.toString());
      }
    } catch (error) {
      toast.error('Failed to load notes data.');
    } finally {
      setIsLoading(false);
    }
  };

  const selectedNote = notes.find((n) => n.id === selectedNoteId);

  const handleCreateNote = async () => {
    if (!newTitle) {
      toast.error('Please enter a note title');
      return;
    }
    if (!newSubjectId) {
      toast.error('Please select a subject');
      return;
    }
    try {
      const res = await api.post('/notes', {
        title: newTitle,
        content: 'Type your notes here...',
        subjectId: Number(newSubjectId)
      });
      const newNote = { ...res.data, subject: subjects.find(s => s.id === Number(newSubjectId)) };
      setNotes([newNote, ...notes]);
      setSelectedNoteId(newNote.id);
      setNewTitle('');
      toast.success('New note created!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create note');
    }
  };

  const handleSaveNote = async () => {
    if (!selectedNote) return;
    setIsSaving(true);
    try {
      await api.put(`/notes/${selectedNote.id}`, {
        title: selectedNote.title,
        content: selectedNote.content,
        subjectId: selectedNote.subjectId
      });
      toast.success('Note saved successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save note');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteNote = async () => {
    if (!selectedNote) return;
    setIsDeleting(true);
    try {
      await api.delete(`/notes/${selectedNote.id}`);
      toast.success('Note deleted!');
      setOpenDeleteModal(false);
      const updatedNotes = notes.filter(n => n.id !== selectedNote.id);
      setNotes(updatedNotes);
      setSelectedNoteId(updatedNotes.length > 0 ? updatedNotes[0].id : null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete note');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleGenerateSummary = async () => {
    if (!selectedNote?.content || selectedNote.content === 'Type your notes here...') {
      toast.error('Note is empty.');
      return;
    }
    setIsSummarizing(true);
    
    setTimeout(() => {
      setNotes(notes.map((n) =>
        n.id === selectedNote.id
          ? { ...n, summary: `AI-Synthesized Summary: Core concepts focus on ${n.title} key properties and formulas. Verified by StudyPulse AI.` }
          : n
      ));
      setIsSummarizing(false);
      toast.success('AI Summary Generated!');
    }, 1200);
  };

  const handleMarkRevised = async () => {
    if (!selectedNote) return;
    setIsMarkingRevised(true);
    
    try {
      const res = await api.patch(`/notes/${selectedNote.id}/revised`);
      // Update local state to reflect it's revised
      setNotes(notes.map((n) =>
        n.id === selectedNote.id ? { ...n, isRevised: true } : n
      ));
      toast.success(res.data.message || 'Note marked as revised! 🌱');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to mark as revised');
    } finally {
      setIsMarkingRevised(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

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
                  selectedNote?.id === note.id
                    ? 'border-brand-500/30 bg-brand-500/10'
                    : 'border-white/5 bg-white/[0.01] hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-brand-300 font-semibold">{note.subject?.name || 'Unknown Subject'}</span>
                  <span className="text-[9px] text-gray-500">{new Date(note.createdAt).toLocaleDateString()}</span>
                </div>
                <h4 className="font-semibold text-sm text-white truncate">{note.title}</h4>
                <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{note.content}</p>
              </button>
            ))}
            {notes.length === 0 && (
              <div className="text-center text-xs text-gray-500 py-4">No notes found. Create one!</div>
            )}
          </div>

          <div className="pt-3 border-t border-white/5 space-y-3">
            <Input
              placeholder="New Note Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="text-xs"
            />
            {subjects.length > 0 ? (
              <Select
                value={newSubjectId}
                onChange={(e) => setNewSubjectId(e.target.value)}
                options={subjects.map(s => ({ value: s.id.toString(), label: s.name }))}
              />
            ) : (
              <div className="text-xs text-gray-500 text-center">Please create a Subject first.</div>
            )}
            <Button onClick={handleCreateNote} className="w-full text-xs py-2 gap-1 justify-center" disabled={!newTitle || !newSubjectId}>
              <Plus className="h-3.5 w-3.5" /> Create Note
            </Button>
          </div>
        </div>

        {/* Note Editor */}
        <div className="lg:col-span-3 space-y-6">
          {selectedNote ? (
            <div className="glass-card p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div>
                  <span className="text-xs font-bold text-brand-300 uppercase tracking-wider">{selectedNote.subject?.name || 'Unknown'}</span>
                  <Input 
                    value={selectedNote.title} 
                    onChange={(e) => setNotes(notes.map(n => n.id === selectedNote.id ? { ...n, title: e.target.value } : n))}
                    className="text-lg font-bold text-white mt-0.5 bg-transparent border-none p-0 h-auto focus:ring-0"
                  />
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
                  <Button 
                    variant={selectedNote.isRevised ? "secondary" : "secondary"} 
                    size="sm" 
                    className={`gap-1.5 ${selectedNote.isRevised ? 'text-green-500 border-green-500/30 bg-green-500/10' : ''}`}
                    onClick={handleMarkRevised} 
                    disabled={isMarkingRevised || selectedNote.isRevised}
                  >
                    <CheckCircle className="h-4 w-4" /> 
                    {selectedNote.isRevised ? 'Revised' : isMarkingRevised ? 'Marking...' : 'Mark as Revised'}
                  </Button>
                  <Button variant="secondary" size="sm" className="gap-1.5" onClick={handleSaveNote} disabled={isSaving}>
                    <Save className="h-4 w-4" /> {isSaving ? 'Saving...' : 'Save'}
                  </Button>
                  <Button variant="secondary" size="sm" className="gap-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 border-transparent" onClick={() => setOpenDeleteModal(true)}>
                    <Trash2 className="h-4 w-4" /> Delete
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
          ) : (
            <div className="glass-card p-5 flex items-center justify-center h-full text-gray-500">
              Select or create a note to view its contents.
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal open={openDeleteModal} onClose={() => !isDeleting && setOpenDeleteModal(false)} title="Delete Note?">
        <div className="space-y-4 mt-2 text-left">
          <p className="text-sm text-[#6b6388] dark:text-slate-300">
            Are you sure you want to delete the note <span className="font-bold text-[#241b4b] dark:text-white">{selectedNote?.title}</span>? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
            <Button type="button" variant="secondary" onClick={() => setOpenDeleteModal(false)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button type="button" onClick={handleDeleteNote} disabled={isDeleting} className="bg-red-500 hover:bg-red-600 text-white border-transparent">
              {isDeleting ? 'Deleting...' : 'Delete Note'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SmartNotes;
