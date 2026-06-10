import { useState } from 'react';
import { User, Mail, Shield, Bell, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import Input from '../components/Input';

const Profile = () => {
  const [name, setName] = useState('Student');
  const [email, setEmail] = useState('student@studypulse.ai');
  const [notifications, setNotifications] = useState(true);
  const [emailReminders, setEmailReminders] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Profile configurations saved!');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Profile"
        subtitle="Manage your personal details, credentials, and configuration toggles."
        icon={User}
      />

      <div className="max-w-2xl mx-auto grid gap-6">
        <form onSubmit={handleSave} className="glass-card p-5 border border-white/5 bg-white/[0.02] space-y-4">
          <h3 className="font-bold text-white text-base">Personal Information</h3>
          
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={User}
            required
          />

          <Input
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            type="email"
            required
          />

          <div className="pt-4 border-t border-white/5 space-y-4">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Bell className="h-4.5 w-4.5 text-brand-400" /> Notifications
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <label className="flex items-center gap-3 text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="rounded border-white/10 bg-navy-900 text-brand-500 focus:ring-brand-500"
                />
                <div>
                  <span className="font-semibold block">Push Notifications</span>
                  <span className="text-[10px] text-gray-500">Show desktop indicators for upcoming focus milestones.</span>
                </div>
              </label>

              <label className="flex items-center gap-3 text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailReminders}
                  onChange={(e) => setEmailReminders(e.target.checked)}
                  className="rounded border-white/10 bg-navy-900 text-brand-500 focus:ring-brand-500"
                />
                <div>
                  <span className="font-semibold block">Email Digests</span>
                  <span className="text-[10px] text-gray-500">Receive weekly study garden stats and ML early warning risk assessments.</span>
                </div>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex justify-end">
            <Button type="submit">
              Save Settings
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
