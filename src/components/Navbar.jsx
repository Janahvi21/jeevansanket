import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { HeartPulse, Sun, Moon, LogOut, Menu, X, ShieldAlert, AlertTriangle, Truck, Hospital as HospitalIcon, PhoneCall, Languages } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { districts, mockAmbulances, mockHospitals } from '../data/mockData';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [sosStep, setSosStep] = useState(1);
  const [sosDistrict, setSosDistrict] = useState('Mumbai City');
  const [foundResources, setFoundResources] = useState({ hospital: null, ambulance: null });

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const navLinks = [
    { name: t('hospitals'), path: '/hospitals' },
    { name: t('blood_banks'), path: '/blood-banks' },
    { name: t('ambulances'), path: '/ambulances' },
    { name: 'Maps', path: '/maps' },
    { name: t('donors'), path: '/donors' },
  ];

  const triggerSOS = () => {
    setSosStep(2);
    setTimeout(() => {
      const hospital = mockHospitals.find(h => h.district === sosDistrict) || mockHospitals[0];
      const ambulance = mockAmbulances.find(a => a.district === sosDistrict && a.status === 'Available') || mockAmbulances[0];
      setFoundResources({ hospital, ambulance });
      setSosStep(3);
    }, 2000);
  };

  const closeSOS = () => {
    setShowSOSModal(false);
    setSosStep(1);
    setFoundResources({ hospital: null, ambulance: null });
  };

  return (
    <nav className="fixed w-full z-50 glass-panel border-b transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <HeartPulse className="h-8 w-8 text-primary animate-pulse-soft" />
              <span className="font-bold text-2xl bg-gradient-to-r from-primary to-rose-400 bg-clip-text text-transparent">
                JeevanSanket
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4 border-l pl-4 dark:border-dark-border">
              <button
                onClick={() => setShowSOSModal(true)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 font-bold flex items-center gap-2 animate-pulse"
              >
                <ShieldAlert className="w-5 h-5" />
                SOS
              </button>

              <div className="relative group">
                <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-surface transition-colors text-gray-700 dark:text-gray-300 flex items-center gap-1">
                  <Languages className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase">{i18n.language}</span>
                </button>
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-dark-surface rounded-xl shadow-xl border border-gray-100 dark:border-dark-border py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60]">
                  {['en', 'hi', 'mr'].map((lng) => (
                    <button
                      key={lng}
                      onClick={() => changeLanguage(lng)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-border text-sm font-medium transition-colors"
                    >
                      {lng === 'en' ? 'English' : lng === 'hi' ? 'हिंदी' : 'मराठी'}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-surface transition-colors text-gray-700 dark:text-gray-300"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>
              
              {user ? (
                <div className="flex items-center gap-4">
                  <Link
                    to="/dashboard"
                    className="px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={async () => { await logout(); navigate('/login'); }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors font-medium"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-lg bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
             <button
                onClick={() => setShowSOSModal(true)}
                className="p-2 rounded-lg bg-red-600 text-white animate-pulse"
              >
                <ShieldAlert className="w-5 h-5" />
              </button>
             <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-surface transition-colors text-gray-700 dark:text-gray-300"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-primary p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* SOS Modal */}
      {showSOSModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-dark-surface w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-fade-in border border-white/10">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold">Emergency SOS</h2>
                </div>
                <button onClick={closeSOS} className="p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {sosStep === 1 && (
                <div className="space-y-6">
                  <p className="text-gray-600 dark:text-gray-400">Select your current district to find the nearest emergency resources.</p>
                  <div>
                    <label className="block text-sm font-medium mb-2">Current District</label>
                    <select
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface focus:ring-2 focus:ring-red-600 outline-none"
                      value={sosDistrict}
                      onChange={(e) => setSosDistrict(e.target.value)}
                    >
                      {districts.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <button
                    onClick={triggerSOS}
                    className="w-full py-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 shadow-xl shadow-red-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    Confirm & Signal SOS
                  </button>
                </div>
              )}

              {sosStep === 2 && (
                <div className="py-12 text-center space-y-6">
                  <div className="relative w-24 h-24 mx-auto">
                    <div className="absolute inset-0 rounded-full border-4 border-red-600/20" />
                    <div className="absolute inset-0 rounded-full border-4 border-red-600 border-t-transparent animate-spin" />
                    <ShieldAlert className="absolute inset-0 m-auto w-10 h-10 text-red-600 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Signaling Local Authorities...</h3>
                    <p className="text-gray-500">Connecting to nearest Hospital & Ambulance in {sosDistrict}</p>
                  </div>
                </div>
              )}

              {sosStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-500/30 p-4 rounded-2xl flex items-center gap-3">
                    <AlertTriangle className="text-green-500 w-6 h-6" />
                    <p className="text-green-700 dark:text-green-400 font-medium">Resources found and notified!</p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-dark-border">
                      <div className="flex items-center gap-3 mb-2">
                        <Truck className="text-primary w-5 h-5" />
                        <span className="font-bold">Nearest Ambulance</span>
                      </div>
                      <p className="text-sm font-semibold">{foundResources.ambulance.driver}</p>
                      <p className="text-xs text-gray-500">ETA: 8-12 mins • {foundResources.ambulance.phone}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-dark-border">
                      <div className="flex items-center gap-3 mb-2">
                        <HospitalIcon className="text-blue-500 w-5 h-5" />
                        <span className="font-bold">Receiving Hospital</span>
                      </div>
                      <p className="text-sm font-semibold">{foundResources.hospital.name}</p>
                      <p className="text-xs text-gray-500">{foundResources.hospital.address}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 py-4 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-2">
                      <PhoneCall className="w-5 h-5" />
                      Call Ambulance
                    </button>
                    <button onClick={closeSOS} className="flex-1 py-4 bg-gray-100 dark:bg-dark-border rounded-2xl font-bold">
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-panel border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-dark-surface"
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-primary/10"
                >
                  Dashboard
                </Link>
                <button
                  onClick={async () => { await logout(); setIsOpen(false); navigate('/login'); }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary hover:bg-primary-hover mx-2 text-center mt-4"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
