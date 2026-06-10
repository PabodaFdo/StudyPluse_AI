import { useState } from 'react';
import { GraduationCap, Calculator, Award, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import Select from '../components/Select';
import Input from '../components/Input';
import Badge from '../components/Badge';

const AcademicRecords = () => {
  const [courses, setCourses] = useState([
    { id: 1, code: 'MATH 301', name: 'Calculus III', credits: 4, grade: 'A-' },
    { id: 2, code: 'PHYS 410', name: 'Quantum Mechanics', credits: 4, grade: 'B+' },
    { id: 3, code: 'CS 210', name: 'Data Structures & Algorithms', credits: 3, grade: 'A' },
    { id: 4, code: 'CHEM 202', name: 'Organic Chemistry', credits: 4, grade: 'C-' },
  ]);

  const [calcCredits, setCalcCredits] = useState('3');
  const [calcGrade, setCalcGrade] = useState('A');
  const [gpaResult, setGpaResult] = useState('3.44');

  const gradeValues = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0,
  };

  const calculateGpa = () => {
    // Current course GPA calculation + new course gpa prediction
    let totalQualityPoints = 0;
    let totalCredits = 0;

    courses.forEach((c) => {
      const val = gradeValues[c.grade] || 0;
      totalQualityPoints += val * c.credits;
      totalCredits += c.credits;
    });

    const newCredits = parseInt(calcCredits);
    const newGradeVal = gradeValues[calcGrade] || 0;
    totalQualityPoints += newGradeVal * newCredits;
    totalCredits += newCredits;

    const projectedGpa = (totalQualityPoints / totalCredits).toFixed(2);
    setGpaResult(projectedGpa);
    toast.success(`Projected GPA Calculated: ${projectedGpa}`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Academic Records"
        subtitle="Track completed terms, letter grades, and project target GPAs."
        icon={GraduationCap}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Table of Records */}
        <div className="lg:col-span-2 glass-card p-5 border border-white/5 bg-white/[0.02] space-y-4">
          <h3 className="font-bold text-white text-base">Current Term Courses</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-lavender/30 dark:border-white/5 text-[#6b6388] dark:text-slate-300 font-semibold">
                  <th className="pb-3">Course Code</th>
                  <th className="pb-3">Course Name</th>
                  <th className="pb-3">Credits</th>
                  <th className="pb-3">Letter Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-lavender/30 dark:divide-white/5 text-[#241b4b] dark:text-white">
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td className="py-3.5 font-bold font-mono text-brand-300">{course.code}</td>
                    <td className="py-3.5">{course.name}</td>
                    <td className="py-3.5">{course.credits} Units</td>
                    <td className="py-3.5">
                      <Badge color={course.grade.startsWith('A') ? 'green' : course.grade.startsWith('B') ? 'blue' : 'red'}>
                        {course.grade}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* GPA Calculator */}
        <div className="glass-card p-5 border border-white/5 bg-white/[0.02] space-y-5">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Calculator className="h-4.5 w-4.5 text-brand-400" /> GPA Projector
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Project your cumulative standings by simulating potential grades in upcoming courses.
          </p>

          <div className="space-y-3 pt-2">
            <Select
              label="Simulated Course Credits"
              value={calcCredits}
              onChange={(e) => setCalcCredits(e.target.value)}
              options={[
                { value: '1', label: '1 Unit' },
                { value: '2', label: '2 Units' },
                { value: '3', label: '3 Units' },
                { value: '4', label: '4 Units' },
              ]}
            />

            <Select
              label="Projected Letter Grade"
              value={calcGrade}
              onChange={(e) => setCalcGrade(e.target.value)}
              options={[
                { value: 'A+', label: 'A+' },
                { value: 'A', label: 'A' },
                { value: 'A-', label: 'A-' },
                { value: 'B+', label: 'B+' },
                { value: 'B', label: 'B' },
                { value: 'C+', label: 'C+' },
                { value: 'C', label: 'C' },
              ]}
            />

            <Button onClick={calculateGpa} className="w-full justify-center mt-2">
              Calculate Projected GPA
            </Button>
          </div>

          <div className="p-4 rounded-xl bg-brand-500/5 border border-brand-500/20 text-center">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider block font-semibold">PROJECTED CUMULATIVE GPA</span>
            <span className="text-3xl font-extrabold text-white block mt-1">{gpaResult}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicRecords;
