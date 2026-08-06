import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Lock, ArrowRight, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import FloatingDecorations from '../components/FloatingDecorations';
import AuthMascotOrbit from '../components/AuthMascotOrbit';
import studyGirlWelcome from '../assets/characters/study-girl-welcome.png';
import { useAuth } from '../context/AuthContext';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { resetToken } = useParams();
  const { resetPassword } = useAuth();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setIsLoading(true);
    try {
      await resetPassword(resetToken, password);
      toast.success('Password reset successful');
      setIsSuccess(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid or expired token');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent overflow-hidden relative">
      <FloatingDecorations />

      <main className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl grid-cols-1 items-center gap-10 px-6 py-10 lg:grid-cols-2 z-10">
        <AuthMascotOrbit
          image={studyGirlWelcome}
          title="Create New Password"
          subtitle="Your garden is almost ready for you again."
          icons={["🌱", "🔑", "🔐", "✨", "📚"]}
        />

        <div className="w-full max-w-md mx-auto rounded-[28px] bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl dark:bg-slate-950/70 dark:border-slate-700/60 p-8 md:p-10 relative text-center">
          <div className="liquid-card-content space-y-6">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-text-main">Enter new password</h2>
              {!isSuccess && <p className="text-sm text-text-muted mt-2">Please enter and confirm your new password below.</p>}
            </div>

            {!isSuccess ? (
              <form className="space-y-4 text-left" onSubmit={handleSubmit}>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  label="New Password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={Lock}
                  required
                />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  icon={Lock}
                  required
                />

                <Button
                  type="submit"
                  className="w-full justify-center mt-4"
                  disabled={isLoading}
                  variant="clay"
                >
                  {isLoading ? 'Resetting...' : 'Reset Password'} <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <div className="py-6 space-y-4 flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-text-main">Password Updated!</h3>
                <p className="text-sm text-text-muted">
                  Your password has been changed successfully. You can now sign in with your new password.
                </p>
                <Button
                  onClick={() => navigate('/login')}
                  className="w-full justify-center mt-6"
                  variant="clay"
                >
                  Sign in
                </Button>
              </div>
            )}

            {!isSuccess && (
              <p className="text-center text-xs sm:text-sm text-text-muted font-medium mt-6">
                Remembered your password?{' '}
                <Link to="/login" className="font-bold text-purple hover:underline">
                  Sign in instead
                </Link>
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
