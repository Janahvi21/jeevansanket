import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { districts } from '../data/mockData';
import { fetchBloodBanks } from '../lib/dataService';
import { MapPin, Phone, Droplets, AlertCircle, X, CheckCircle2, Share2, Loader2, Search } from 'lucide-react';

export default function BloodBanks() {
  const { t } = useTranslation();
  const [bloodBanks, setBloodBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestStatus, setRequestStatus] = useState('idle');
  const [selectedBank, setSelectedBank] = useState(null);

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  useEffect(() => {
    fetchBloodBanks()
      .then(setBloodBanks)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredBanks = bloodBanks.filter((bank) => {
    const matchesDistrict = selectedDistrict === 'All' || bank.district === selectedDistrict;
    const matchesGroup = selectedGroup === 'All' || (bank.inventory[selectedGroup] && bank.inventory[selectedGroup] > 0);
    const matchesSearch = bank.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDistrict && matchesGroup && matchesSearch;
  });

  const handleEmergencyRequest = (bank) => {
    setSelectedBank(bank);
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
    setSelectedBank(null);
  };

  if (loading) {
    return (
      <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center justify-center py-32">
          <Droplets className="w-16 h-16 text-primary animate-bounce mb-4" />
          <p className="text-xl font-bold animate-pulse text-gray-500">Checking Live Blood Inventory...</p>
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
              {t('blood_banks_title') || 'Blood Bank Network'}
            </h1>
            <span className="hidden md:inline-flex px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-red-500/10 text-red-500 rounded-full border border-red-500/20">
              LIVE INVENTORY
            </span>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
          {t('blood_banks_subtitle') || 'Real-time blood stock tracking and verified donor synchronization.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 bg-white dark:bg-dark-surface p-4 rounded-3xl border border-gray-100 dark:border-dark-border shadow-xl shadow-gray-200/20">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search by bank name..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-primary outline-none font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
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
        <div>
          <select
            className="w-full px-6 py-4 rounded-2xl border border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-primary outline-none appearance-none font-medium transition-all"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            <option value="All">All Blood Groups</option>
            {bloodGroups.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBanks.map(bank => (
          <div key={bank.id} className="group bg-white dark:bg-dark-surface rounded-[2rem] p-8 shadow-sm border border-gray-100 dark:border-dark-border hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight group-hover:text-primary transition-colors">{bank.name}</h3>
                <div className="flex items-center gap-2 mt-2 text-primary text-xs font-black uppercase tracking-widest">
                  <Droplets className="w-4 h-4" />
                  Verified Stock
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8 flex-grow">
              <div className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm font-medium leading-relaxed">{bank.address}, {bank.district}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-bold">{bank.phone}</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-8 p-3 bg-gray-50 dark:bg-dark-bg/40 rounded-3xl border border-gray-100 dark:border-dark-border">
              {Object.entries(bank.inventory).map(([group, count]) => (
                <div key={group} className={`py-3 rounded-2xl border text-center transition-all ${count > 0 ? 'bg-white dark:bg-dark-surface border-primary/20 shadow-sm' : 'bg-transparent border-transparent opacity-30 grayscale'}`}>
                  <div className={`text-[10px] font-black ${count > 0 ? 'text-primary' : 'text-gray-400'} uppercase tracking-widest mb-1`}>{group}</div>
                  <div className="text-lg font-black leading-none">{count}</div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => handleEmergencyRequest(bank)}
                className="flex-1 py-4 bg-primary text-white font-black rounded-2xl hover:bg-primary-hover hover:scale-[1.02] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 text-sm"
              >
                <AlertCircle className="w-4 h-4" />
                EMERGENCY
              </button>
              <button 
                onClick={() => {
                  const text = `🚨 *JEEVAN SANKET BLOOD ALERT* 🚨\n\n*Bank:* ${bank.name}\n*District:* ${bank.district}\n*Stock:* Available\n*Phone:* ${bank.phone}`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                }}
                className="px-5 bg-green-50 text-green-600 border border-green-200 hover:bg-green-100 hover:border-green-300 font-bold rounded-2xl transition-all flex items-center justify-center shadow-sm"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {showRequestModal && selectedBank && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-dark-surface w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10">
            <div className="p-8 text-center relative">
              <button onClick={closePortal} className="absolute top-6 right-6 p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-400" />
              </button>

              {requestStatus === 'idle' && (
                <div className="space-y-6 pt-4">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                    <Droplets className="w-10 h-10 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white">Emergency Request</h3>
                    <p className="text-gray-500 mt-3">Broadcasting urgent blood demand at <br /><span className="font-bold text-primary">{selectedBank.name}</span></p>
                  </div>
                  <button 
                    onClick={confirmRequest}
                    className="w-full py-5 bg-primary text-white font-black text-lg rounded-[1.5rem] hover:bg-primary-hover shadow-2xl shadow-primary/30 transition-all"
                  >
                    Broadcast Now
                  </button>
                </div>
              )}

              {requestStatus === 'sending' && (
                <div className="py-16 space-y-8">
                  <div className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white text-center">Alerting Donors...</h3>
                </div>
              )}

              {requestStatus === 'success' && (
                <div className="space-y-6 pt-4">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-black text-green-500">Alert Broadcasted</h3>
                  <p className="text-gray-500 font-medium">Local O+ and O- donors in {selectedBank.district} have been notified.</p>
                  <button 
                    onClick={closePortal}
                    className="w-full py-5 bg-gray-100 dark:bg-dark-border text-gray-900 dark:text-white font-black rounded-[1.5rem]"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
