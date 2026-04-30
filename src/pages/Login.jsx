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
  const { login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const { error } = await loginWithGoogle(isLogin ? undefined : role);
      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      navigate('/dashboard');
    } catch (err) {
      setErrorMsg(err.message || 'An error occurred with Google Sign-In');
      setLoading(false);
    }
  };

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

        <div className="mt-4">
          <div className="relative flex items-center justify-center mb-4">
            <span className="absolute w-full border-t border-gray-200 dark:border-dark-border"></span>
            <span className="bg-white dark:bg-dark-surface px-3 text-sm text-gray-400 relative z-10">or</span>
          </div>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-3 bg-white dark:bg-dark-surface text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-dark-border rounded-xl hover:bg-gray-50 dark:hover:bg-dark-bg shadow-sm transition-all flex items-center justify-center gap-3 relative group font-medium"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {isLogin ? 'Log in with Google' : 'Sign up with Google'}
          </button>
        </div>

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
