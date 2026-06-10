import { useState } from 'react';
import { BookOpen, Plus, Target, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Select from '../components/Select';
import Badge from '../components/Badge';

const Subjects = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Calculus III', code: 'MATH 301', credits: 4, target: 'A', current: 'A-', health: 'green' },
    { id: 2, name: 'Quantum Mechanics', code: 'PHYS 410', credits: 4, target: 'A', current: 'B+', health: 'blue' },
    { id: 3, name: 'Data Structures & Algorithms', code: 'CS 210', credits: 3, target: 'A+', current: 'A', health: 'green' },
    { id: 4, name: 'Organic Chemistry', code: 'CHEM 202', credits: 4, target: 'B+', current: 'C-', health: 'red' },
  ]);

  const [newName, setNewName] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newCredits, setNewCredits] = useState('3');
  const [newTarget, setNewTarget] = useState('A');

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!newName || !newCode) {
      toast.error('Please fill in Name and Code');
      return;
    }
    const newSub = {
      id: Date.now(),
      name: newName,
      code: newCode,
      credits: parseInt(newCredits),
      target: newTarget,
      current: '-',
      health: 'blue',
    };
    setSubjects([...subjects, newSub]);
    setNewName('');
    setNewCode('');
    setOpenAddModal(false);
    toast.success(`${newName} added successfully!`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Subjects Directory"
        subtitle="Manage your courses, credits, target grades, and current standings."
        icon={BookOpen}
        action={
          <Button onClick={() => setOpenAddModal(true)} className="flex items-center gap-1.5">
            <Plus className="h-4 w-4" /> Add Subject
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {subjects.map((sub) => (
          <div key={sub.id} className="liquid-card p-6 text-[#241b4b] dark:text-white flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className={`status-badge ${sub.health === 'red' ? 'status-danger' : sub.health === 'yellow' ? 'status-warning' : 'status-success'}`}>{sub.code}</span>
                  <h3 className="font-bold text-white text-lg mt-1">{sub.name}</h3>
                </div>
                <BookOpen className={`h-5 w-5 text-gray-500`} />
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-xs mt-4 py-3 border-y border-white/5">
                <div>
                  <p className="text-[#6b6388] dark:text-slate-400 uppercase font-semibold">Credits</p>
                  <p className="text-sm text-[#6b6388] dark:text-slate-300 mt-0.5">{sub.credits} Units</p>
                </div>
                <div>
                  <p className="text-[#6b6388] dark:text-slate-400 uppercase font-semibold">Grade Target</p>
                  <p className="text-sm text-[#6b6388] dark:text-slate-300 mt-0.5 flex items-center gap-1">
                    <Target className="h-3.5 w-3.5 text-brand-400" /> {sub.target}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div>
                <span className="text-[10px] text-[#6b6388] dark:text-slate-400 uppercase font-semibold">Current Standings</span>
                <p className="text-sm font-bold text-[#241b4b] dark:text-white">{sub.current}</p>
              </div>
              <span className={`status-badge ${sub.health === 'red' ? 'status-danger' : sub.health === 'yellow' ? 'status-warning' : 'status-success'}`}>
                {sub.health === 'red' ? 'Needs Attention' : 'On Track'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Subject Modal */}
      <Modal open={openAddModal} onClose={() => setOpenAddModal(false)} title="Add New Subject">
        <form onSubmit={handleAddSubject} className="space-y-4 mt-2">
          <Input
            label="Subject Name"
            placeholder="e.g. Advanced Calculus"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
          <Input
            label="Subject Code"
            placeholder="e.g. MATH 302"
            value={newCode}
            onChange={(e) => setNewCode(e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Credits"
              value={newCredits}
              onChange={(e) => setNewCredits(e.target.value)}
              options={[
                { value: '1', label: '1 Unit' },
                { value: '2', label: '2 Units' },
                { value: '3', label: '3 Units' },
                { value: '4', label: '4 Units' },
                { value: '5', label: '5 Units' },
              ]}
            />
            <Select
              label="Target Grade"
              value={newTarget}
              onChange={(e) => setNewTarget(e.target.value)}
              options={[
                { value: 'A+', label: 'A+' },
                { value: 'A', label: 'A' },
                { value: 'A-', label: 'A-' },
                { value: 'B+', label: 'B+' },
                { value: 'B', label: 'B' },
              ]}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
            <Button type="button" variant="secondary" onClick={() => setOpenAddModal(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Save Subject
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Subjects;
