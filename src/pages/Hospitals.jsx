import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { districts } from '../data/mockData';
import { fetchHospitals } from '../lib/dataService';
import { MapPin, Phone, Bed, Info, X, ShieldAlert, CheckCircle2, Share2, Loader2, Search } from 'lucide-react';

export default function Hospitals() {
  const { t } = useTranslation();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestStatus, setRequestStatus] = useState('idle');
  const [selectedHospital, setSelectedHospital] = useState(null);

  useEffect(() => {
    fetchHospitals()
      .then(setHospitals)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesDistrict = selectedDistrict === 'All' || hospital.district === selectedDistrict;
    const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDistrict && matchesSearch;
  });

  const handleRequestAdmission = (hospital) => {
    setSelectedHospital(hospital);
    setShowRequestModal(true);
    setRequestStatus('idle');
  };

  const confirmRequest = () => {
    setRequestStatus('sending');
    setTimeout(() => {
      setRequestStatus('success');
    }, 1500);
  };

  const closePortal = () => {
    setShowRequestModal(false);
    setRequestStatus('idle');
    setSelectedHospital(null);
  };

  if (loading) {
    return (
      <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center py-32">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <Loader2 className="w-8 h-8 text-primary absolute inset-0 m-auto animate-pulse" />
          </div>
          <p className="mt-6 text-gray-500 font-medium animate-pulse">Syncing with JeevanSanket Cloud...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
              {t('hospitals_title') || 'Hospital Directory'}
            </h1>
            <span className="hidden md:inline-flex px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-green-500/10 text-green-500 rounded-full border border-green-500/20">
              ☁ Cloud Live
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-2xl border border-primary/10">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-bold text-primary">{hospitals.length} Active Resources</span>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
          {t('hospitals_subtitle') || 'Real-time bed tracking and emergency coordination across Maharashtra.'}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-10 bg-white dark:bg-dark-surface p-4 rounded-3xl border border-gray-100 dark:border-dark-border shadow-xl shadow-gray-200/20 dark:shadow-none">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search hospitals by name..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-primary outline-none transition-all font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="md:w-72">
          <select
            className="w-full px-6 py-4 rounded-2xl border border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-primary outline-none appearance-none font-medium transition-all"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            <option value="All">All Maharashtra Districts</option>
            {districts.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredHospitals.map(hospital => (
          <div key={hospital.id} className="group bg-white dark:bg-dark-surface rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-dark-border hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-300 flex flex-col h-full overflow-hidden relative">
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="p-2 bg-primary/10 rounded-full text-primary">
                 <Info className="w-5 h-5" />
               </div>
            </div>

            <div className="mb-6">
              <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 ${hospital.type === 'Government' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'}`}>
                {hospital.type}
              </span>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight group-hover:text-primary transition-colors">{hospital.name}</h3>
            </div>

            <div className="space-y-4 mb-8 flex-grow">
              <div className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm font-medium leading-relaxed">{hospital.address}, {hospital.district}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-bold">{hospital.phone}</span>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-dark-bg/40 rounded-3xl p-5 border border-gray-100 dark:border-dark-border mb-6 group-hover:bg-primary/[0.02] transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500">
                  <Bed className="w-4 h-4 text-primary" />
                  Live Inventory
                </div>
                <div className="text-[10px] font-bold text-green-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  Active
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white dark:bg-dark-surface p-3 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm">
                  <div className={`text-2xl font-black ${hospital.beds.icu > 5 ? 'text-green-500' : 'text-red-500'}`}>{hospital.beds.icu}</div>
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">ICU</div>
                </div>
                <div className="bg-white dark:bg-dark-surface p-3 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm">
                  <div className="text-2xl font-black text-blue-500">{hospital.beds.oxygen}</div>
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Oxygen</div>
                </div>
                <div className="bg-white dark:bg-dark-surface p-3 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm">
                  <div className="text-2xl font-black text-gray-700 dark:text-gray-300">{hospital.beds.general}</div>
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">General</div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-auto">
              <button 
                onClick={() => handleRequestAdmission(hospital)}
                className="flex-1 py-4 bg-primary text-white font-black rounded-2xl hover:bg-primary-hover hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 text-sm"
              >
                <ShieldAlert className="w-4 h-4" />
                {t('request_emergency') || 'EMERGENCY'}
              </button>
              <button 
                onClick={() => {
                  const text = `🚨 *JEEVAN SANKET EMERGENCY* 🚨\n\n*Hospital:* ${hospital.name}\n*District:* ${hospital.district}\n*ICU Beds:* ${hospital.beds.icu}\n*Oxygen:* ${hospital.beds.oxygen}\n*Phone:* ${hospital.phone}\n\n_Sent via JeevanSanket Emergency Network_`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                }}
                className="px-5 bg-green-50 text-green-600 border border-green-200 hover:bg-green-100 hover:border-green-300 font-bold rounded-2xl transition-all flex items-center justify-center shadow-sm"
                title="Share via WhatsApp"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showRequestModal && selectedHospital && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-dark-surface w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10">
            <div className="p-8 text-center relative">
              <button onClick={closePortal} className="absolute top-6 right-6 p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-400" />
              </button>

              {requestStatus === 'idle' && (
                <div className="space-y-6 pt-4">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                    <ShieldAlert className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white">Request Admission</h3>
                    <p className="text-gray-500 mt-3 px-4">Establishing a direct secure line with <br /><span className="font-bold text-primary">{selectedHospital.name}</span></p>
                  </div>
                  <div className="p-5 bg-primary/5 rounded-3xl text-sm text-primary font-bold border border-primary/10">
                    A coordination officer will contact you on your registered number within 120 seconds.
                  </div>
                  <button 
                    onClick={confirmRequest}
                    className="w-full py-5 bg-primary text-white font-black text-lg rounded-[1.5rem] hover:bg-primary-hover shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    Send Emergency Signal
                  </button>
                </div>
              )}

              {requestStatus === 'sending' && (
                <div className="py-16 space-y-8">
                  <div className="relative w-24 h-24 mx-auto">
                    <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <ShieldAlert className="absolute inset-0 m-auto w-10 h-10 text-primary animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">Connecting...</h3>
                    <p className="text-gray-500 mt-2 font-medium">Bypassing local lines for direct dispatch.</p>
                  </div>
                </div>
              )}

              {requestStatus === 'success' && (
                <div className="space-y-6 pt-4">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-green-500">Signal Transmitted</h3>
                    <p className="text-gray-500 mt-3 font-medium px-4">Hospital team has received your GPS and Contact profile. Stay by your phone.</p>
                  </div>
                  <button 
                    onClick={closePortal}
                    className="w-full py-5 bg-gray-100 dark:bg-dark-border text-gray-900 dark:text-white font-black text-lg rounded-[1.5rem] hover:bg-gray-200 dark:hover:bg-dark-bg transition-all"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {filteredHospitals.length === 0 && (
        <div className="text-center py-32 group">
          <div className="w-20 h-20 bg-gray-50 dark:bg-dark-bg rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <Search className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">No Hospitals Found</h3>
          <p className="text-gray-500 font-medium">Try searching for a different district or name.</p>
        </div>
      )}
    </div>
  );
}
