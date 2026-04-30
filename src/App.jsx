import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Hospitals from './pages/Hospitals';
import BloodBanks from './pages/BloodBanks';
import Ambulances from './pages/Ambulances';
import Maps from './pages/Maps';
import Donors from './pages/Donors';
import Login from './pages/Login';
import HospitalDashboard from './pages/HospitalDashboard';
import { useTheme } from './contexts/ThemeContext';
import { Toaster } from 'react-hot-toast';
import QuickDial from './components/QuickDial';

function App() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-gray-100 transition-colors duration-300 ${theme}`}>
      <Toaster position="top-center" toastOptions={{ duration: 4000, style: { background: '#333', color: '#fff', borderRadius: '10px' } }} />
      <QuickDial />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/blood-banks" element={<BloodBanks />} />
          <Route path="/ambulances" element={<Ambulances />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/donors" element={<Donors />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<HospitalDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
