import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import FloatingDecorations from '../components/FloatingDecorations';
import AuthMascotOrbit from '../components/AuthMascotOrbit';
import studyGirlWelcome from '../assets/characters/study-girl-welcome.png';
import { useAuth } from '../context/AuthContext';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    setIsLoading(true);
    try {
      const res = await forgotPassword(email);
      toast.success(res.message || 'If an account exists for this email, a password reset link has been sent.');
      setIsSuccess(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset email');
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
          title="Forgot Password?"
          subtitle="Don't worry, we'll help you get back to your garden."
          icons={["🌱", "🔑", "📧", "✨", "📚"]}
        />

        <div className="w-full max-w-md mx-auto rounded-[28px] bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl dark:bg-slate-950/70 dark:border-slate-700/60 p-8 md:p-10 relative text-center">
          <div className="liquid-card-content space-y-6">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-text-main">Reset your password</h2>
              <p className="text-sm text-text-muted mt-2">Enter your email and we'll send you a link to reset your password.</p>
            </div>

            {!isSuccess ? (
              <form className="space-y-4 text-left" onSubmit={handleSubmit}>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="student@studypulse.ai"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={Mail}
                  required
                />

                <Button
                  type="submit"
                  className="w-full justify-center mt-4"
                  disabled={isLoading}
                  variant="clay"
                >
                  {isLoading ? 'Sending...' : 'Send reset link'} <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <div className="py-6 space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-text-main">Check your email</h3>
                <p className="text-sm text-text-muted">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <Button
                  onClick={() => navigate('/login')}
                  className="w-full justify-center mt-6"
                  variant="outline"
                >
                  Return to Login
                </Button>
              </div>
            )}

            {!isSuccess && (
              <div className="mt-6 flex justify-center">
                <Link to="/login" className="flex items-center text-sm font-bold text-text-muted hover:text-purple transition-colors">
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back to Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
