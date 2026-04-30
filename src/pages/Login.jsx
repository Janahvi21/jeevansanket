import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { HeartPulse, Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('citizen');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    
    try {
      if (isLogin) {
         const { error } = await login(email, password);
         if (error) {
           setErrorMsg(error.message);
           setLoading(false);
           return;
         }
      } else {
         const { error } = await signup(email, password, name, role);
         if (error) {
           setErrorMsg(error.message);
           setLoading(false);
           return;
         }
      }
      setLoading(false);
      navigate('/dashboard');
    } catch (err) {
      setErrorMsg(err.message || 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] pt-24 pb-12 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white dark:bg-dark-surface rounded-3xl shadow-xl border border-gray-100 dark:border-dark-border p-8 animate-fade-in relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center mb-8 relative">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 text-primary">
            <HeartPulse className="w-8 h-8 animate-pulse-soft" />
          </div>
          <h2 className="text-3xl font-bold">{isLogin ? 'Welcome Back' : 'Join the Network'}</h2>
          <p className="text-gray-500 mt-2">
            {isLogin ? 'Enter your details to access your account' : 'Register to coordinate emergency resources'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative">
          {!isLogin && (
            <div className="animate-fade-in">
              <label className="block text-sm font-medium mb-2 opacity-80">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-dark-surface outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}

          {!isLogin && (
            <div className="animate-fade-in">
              <label className="block text-sm font-medium mb-2 opacity-80">Account Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-dark-surface outline-none appearance-none transition-all"
              >
                <option value="citizen">Citizen / Donor</option>
                <option value="hospital">Hospital Admin</option>
                <option value="bloodbank">Blood Bank Admin</option>
                <option value="ambulance">Ambulance Driver</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2 opacity-80">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-dark-surface outline-none transition-all"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2 opacity-80">
              <label className="block text-sm font-medium">Password</label>
              {isLogin && <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>}
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                <Lock className="h-5 w-5" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-dark-surface outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 mt-6 overflow-hidden relative group"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span className="relative z-10 flex items-center gap-2">
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500 relative">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary font-bold hover:underline"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  );
}
