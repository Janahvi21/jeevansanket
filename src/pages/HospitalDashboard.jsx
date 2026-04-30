import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockHospitals, mockBloodBanks, mockAmbulances } from '../data/mockData';
import { Bed, Save, RefreshCw, Activity, Droplet, Truck, User, Bell, CheckCircle2, XCircle, MapPin, Phone } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function HospitalDashboard() {
  const { user, role } = useAuth();
  const [data, setData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showRequest, setShowRequest] = useState(true);

  useEffect(() => {
    // Generate a contextual name from user email/name
    const entityName = user?.name || (user?.email ? user.email.split('@')[0] : 'Demo');
    
    // Load contextual mock data based on the logged-in role
    if (role === 'hospital') setData({ name: `${entityName} Hospital`, district: 'Mumbai City', beds: { icu: 15, oxygen: 30, general: 100 } });
    else if (role === 'bloodbank') setData({ name: `${entityName} Blood Center`, district: 'Mumbai City', inventory: { 'A+': 20, 'O+': 40, 'B+': 15, 'AB+': 5 } });
    else if (role === 'ambulance') setData({ driver: `${entityName} (Driver)`, district: 'Mumbai City', status: 'Available' });
    else setData({ name: entityName, district: 'Mumbai City', bloodGroup: 'O+', available: true, donations: 0 });
  }, [role, user]);

  if (!data) return (
    <div className="pt-40 text-center animate-pulse">
      <RefreshCw className="w-8 h-8 mx-auto mb-4 animate-spin text-primary" />
      <p>Initializing Command Center...</p>
    </div>
  );

  const handleNestedUpdate = (category, type, value) => {
    setData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: parseInt(value) || 0
      }
    }));
  };

  const toggleStatus = () => {
    if (role === 'ambulance') {
      setData(prev => ({ ...prev, status: prev.status === 'Available' ? 'Busy' : 'Available' }));
    } else {
      setData(prev => ({ ...prev, available: !prev.available }));
    }
  };

  const saveChanges = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      import('react-hot-toast').then(({ toast }) => toast.success('Dashboard synced to cloud securely!'));
    }, 1200);
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
      {/* Header Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary font-bold text-xs rounded-full uppercase tracking-widest mb-2 border border-primary/20">
            {role} Command Center
          </div>
          <h1 className="text-4xl font-bold mb-2">{data.name || data.driver || 'User Portal'}</h1>
          <p className="text-gray-500 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> {data.district || data.location}
          </p>
        </div>
        <button 
          onClick={saveChanges}
          disabled={isSaving}
          className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/30 transition-all flex items-center gap-3 disabled:opacity-50"
        >
          {isSaving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {isSaving ? 'Syncing...' : 'Save & Sync to Cloud'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Workspace based on Role */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* HOSPITAL VIEW */}
          {role === 'hospital' && (
            <div className="bg-white dark:bg-dark-surface p-8 rounded-3xl border border-gray-100 dark:border-dark-border shadow-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Bed className="text-red-500" /> Live Bed Inventory
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {['icu', 'oxygen', 'general'].map((type) => (
                  <div key={type} className="p-6 rounded-2xl bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-dark-border">
                    <h3 className="font-bold text-lg capitalize mb-4 text-gray-700 dark:text-gray-300">{type} Beds</h3>
                    <input
                      type="number"
                      className="w-full text-4xl font-bold bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-800 rounded-xl py-3 focus:ring-2 focus:ring-primary text-center transition-all"
                      value={data.beds[type]}
                      onChange={(e) => handleNestedUpdate('beds', type, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BLOOD BANK VIEW */}
          {role === 'bloodbank' && (
            <div className="bg-white dark:bg-dark-surface p-8 rounded-3xl border border-gray-100 dark:border-dark-border shadow-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Droplet className="text-red-500 fill-red-500" /> Blood Stock Levels
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Object.entries(data.inventory).map(([group, count]) => (
                  <div key={group} className="p-4 rounded-2xl bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-dark-border text-center">
                    <div className="w-10 h-10 mx-auto bg-red-500/10 text-red-500 font-bold rounded-full flex items-center justify-center mb-2">
                      {group}
                    </div>
                    <input
                      type="number"
                      className="w-full text-2xl font-bold bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-800 rounded-lg py-2 focus:ring-2 focus:ring-red-500 text-center transition-all"
                      value={count}
                      onChange={(e) => handleNestedUpdate('inventory', group, e.target.value)}
                    />
                    <span className="text-xs text-gray-500 uppercase mt-1 block">Units</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AMBULANCE VIEW */}
          {role === 'ambulance' && (
            <div className="bg-white dark:bg-dark-surface p-8 rounded-3xl border border-gray-100 dark:border-dark-border shadow-sm text-center">
              <h2 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
                <Truck className="text-blue-500" /> Dispatch Status
              </h2>
              <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-6 shadow-2xl transition-all ${data.status === 'Available' ? 'bg-green-500 shadow-green-500/40' : 'bg-orange-500 shadow-orange-500/40'}`}>
                <span className="text-white font-black text-xl uppercase tracking-widest">{data.status}</span>
              </div>
              <button 
                onClick={toggleStatus}
                className="px-8 py-3 bg-gray-100 dark:bg-dark-bg rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                Toggle Status
              </button>
            </div>
          )}

          {/* CITIZEN VIEW */}
          {role === 'citizen' && (
            <div className="bg-white dark:bg-dark-surface p-8 rounded-3xl border border-gray-100 dark:border-dark-border shadow-sm">
               <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <User className="text-primary" /> My Profile
              </h2>
              <div className="flex flex-col sm:flex-row gap-6 mb-8">
                <div className="flex-1 bg-primary/5 border border-primary/20 rounded-2xl p-6 flex items-center gap-4">
                  <div className="w-16 h-16 bg-white dark:bg-dark-surface rounded-full flex items-center justify-center shadow-sm font-black text-2xl text-primary">
                    {data.bloodGroup}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-1">Blood Group</p>
                    <p className="font-bold">Registered Donor</p>
                  </div>
                </div>
                <div className="flex-1 bg-green-500/5 border border-green-500/20 rounded-2xl p-6 flex items-center gap-4">
                  <div className="w-16 h-16 bg-white dark:bg-dark-surface rounded-full flex items-center justify-center shadow-sm">
                    <Activity className="text-green-500 w-8 h-8" />
                  </div>
                  <div>
                     <p className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-1">Total Donations</p>
                     <p className="font-bold text-2xl">{data.donations}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-6 bg-gray-50 dark:bg-dark-bg rounded-2xl border border-gray-100 dark:border-dark-border">
                <div>
                  <h3 className="font-bold text-lg">Emergency Availability</h3>
                  <p className="text-sm text-gray-500">Allow hospitals to contact you directly.</p>
                </div>
                <button 
                  onClick={toggleStatus}
                  className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${data.available ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'}`}
                >
                  <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${data.available ? 'translate-x-9' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: Real-time Requests / Logs */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-dark-surface p-6 rounded-3xl border border-gray-100 dark:border-dark-border shadow-sm h-full">
            <h3 className="font-bold text-xl mb-6 flex items-center gap-2 border-b border-gray-100 dark:border-dark-border pb-4">
              <Bell className="text-yellow-500 w-5 h-5 animate-pulse" />
              Incoming Requests
            </h3>
            
            <div className="space-y-4">
              {/* Dummy request cards */}
              {showRequest && (
                <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20 animate-fade-in">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold bg-red-500 text-white px-2 py-1 rounded">EMERGENCY</span>
                    <span className="text-xs text-gray-500">2 min ago</span>
                  </div>
                  <p className="font-bold text-sm mb-3">
                    {role === 'hospital' ? 'Critical Admission Request (Trauma)' : 
                     role === 'bloodbank' ? 'O+ Blood required immediately at Nair Hospital' :
                     role === 'ambulance' ? 'Dispatch: Accident at Andheri East' :
                     'O+ Blood needed urgently near your location!'}
                  </p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        toast.success('Emergency Request Accepted! Coordination protocol initiated.');
                        setShowRequest(false);
                      }}
                      className="flex-1 bg-red-500 text-white text-xs font-bold py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Accept
                    </button>
                    <button 
                      onClick={() => {
                        toast.error('Emergency Request Declined.');
                        setShowRequest(false);
                      }}
                      className="flex-1 bg-gray-200 dark:bg-dark-bg text-gray-700 dark:text-gray-300 text-xs font-bold py-2 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-dark-border">
                 <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold bg-gray-500 text-white px-2 py-1 rounded">UPDATE</span>
                  <span className="text-xs text-gray-500">1 hour ago</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">System maintenance scheduled for tonight 2:00 AM. Please sync all data before.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
