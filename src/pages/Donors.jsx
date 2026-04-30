import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { districts } from '../data/mockData';
import { fetchDonors } from '../lib/dataService';
import { MapPin, Phone, User, Mail, AlertCircle, X, CheckCircle2, Share2, Loader2, Search, Heart } from 'lucide-react';

export default function Donors() {
  const { t } = useTranslation();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestStatus, setRequestStatus] = useState('idle');
  const [selectedDonor, setSelectedDonor] = useState(null);

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  useEffect(() => {
    fetchDonors()
      .then(setDonors)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredDonors = donors.filter((donor) => {
    const matchesDistrict = selectedDistrict === 'All' || donor.district === selectedDistrict;
    const matchesGroup = selectedGroup === 'All' || donor.bloodGroup === selectedGroup;
    const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDistrict && matchesGroup && matchesSearch;
  });

  const handleContactDonor = (donor) => {
    setSelectedDonor(donor);
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
    setSelectedDonor(null);
  };

  if (loading) {
    return (
      <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center justify-center py-32">
          <div className="relative">
            <Heart className="w-16 h-16 text-primary animate-ping opacity-20" />
            <Heart className="w-16 h-16 text-primary absolute inset-0 animate-pulse" />
          </div>
          <p className="text-xl font-bold mt-8 text-gray-500">Connecting to Donor Network...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
              {t('donors_title') || 'Donor Network'}
            </h1>
            <div className="px-4 py-1.5 bg-red-500/10 text-red-600 rounded-2xl border border-red-500/20 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-xs font-black uppercase tracking-widest">{donors.length} Registered</span>
            </div>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
          {t('donors_subtitle') || 'A secure directory of verified blood donors ready for emergency response.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 bg-white dark:bg-dark-surface p-5 rounded-[2rem] border border-gray-100 dark:border-dark-border shadow-2xl shadow-gray-200/20">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search donors by name..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-primary outline-none font-bold"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <select
            className="w-full px-6 py-4 rounded-2xl border border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-primary outline-none appearance-none font-bold transition-all"
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
            className="w-full px-6 py-4 rounded-2xl border border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-primary outline-none appearance-none font-bold transition-all"
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
        {filteredDonors.map(donor => (
          <div key={donor.id} className={`group bg-white dark:bg-dark-surface rounded-[2.5rem] p-8 shadow-sm border ${donor.available ? 'border-gray-100 dark:border-dark-border hover:shadow-2xl hover:-translate-y-2' : 'border-red-100 dark:border-red-900/30 opacity-70'} transition-all duration-500 relative overflow-hidden flex flex-col h-full`}>
            <div className={`absolute top-0 right-0 px-6 py-2 rounded-bl-3xl text-[10px] font-black uppercase tracking-widest ${donor.available ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}>
              {donor.available ? 'Ready to Donate' : 'Recent Donor'}
            </div>

            <div className="flex items-center gap-5 mb-8">
              <div className="w-20 h-20 rounded-3xl bg-red-500/10 flex items-center justify-center text-red-600 border border-red-500/20 group-hover:scale-110 transition-transform duration-500">
                <span className="font-black text-3xl">{donor.bloodGroup}</span>
              </div>
              <div>
                <h3 className="font-black text-2xl text-gray-900 dark:text-white group-hover:text-primary transition-colors">{donor.name}</h3>
                <div className="flex items-center gap-2 text-gray-500 text-xs font-black uppercase tracking-widest mt-1">
                  <User className="w-3.5 h-3.5" />
                  Verified Hero
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-10 flex-grow">
              <div className="flex items-start gap-3 text-gray-600 dark:text-gray-400 font-bold">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">{donor.district}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-black">{donor.phone}</span>
              </div>
              {donor.email && (
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 truncate">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm font-medium">{donor.email}</span>
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => handleContactDonor(donor)}
                disabled={!donor.available}
                className={`flex-1 py-4 font-black rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 text-sm ${donor.available ? 'bg-primary text-white hover:bg-primary-hover hover:scale-[1.02] active:scale-95 shadow-primary/20' : 'bg-gray-100 dark:bg-dark-bg text-gray-400 cursor-not-allowed shadow-none'}`}
              >
                <Phone className="w-4 h-4" />
                {donor.available ? 'CONTACT NOW' : 'LOCKED'}
              </button>
              <button 
                onClick={() => {
                  const text = `🚨 *JEEVAN SANKET DONOR CALL* 🚨\n\n*Donor:* ${donor.name}\n*Group:* ${donor.bloodGroup}\n*Location:* ${donor.district}\n*Phone:* ${donor.phone}\n\n_Needs your help urgently!_`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                }}
                disabled={!donor.available}
                className={`px-5 font-bold rounded-2xl transition-all flex items-center justify-center shadow-sm ${donor.available ? 'bg-green-50 text-green-600 border border-green-200 hover:bg-green-100 hover:border-green-300' : 'bg-gray-50 border border-gray-100 text-gray-300 cursor-not-allowed grayscale'}`}
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showRequestModal && selectedDonor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-dark-surface w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden border border-white/10">
            <div className="p-8 text-center relative">
              <button onClick={closePortal} className="absolute top-6 right-6 p-2 hover:bg-gray-100 dark:hover:bg-dark-border rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-400" />
              </button>

              {requestStatus === 'idle' && (
                <div className="space-y-6 pt-4">
                  <div className="w-24 h-24 bg-red-500/10 rounded-[2rem] flex items-center justify-center mx-auto text-red-600">
                    <Heart className="w-12 h-12 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white">Contact Hero</h3>
                    <p className="text-gray-500 mt-3 font-medium">Requesting emergency blood donation from <br /><span className="font-black text-primary text-xl">{selectedDonor.name}</span></p>
                  </div>
                  <div className="p-5 bg-primary/5 rounded-[1.5rem] text-sm text-primary font-bold border border-primary/10">
                    An automated priority call will be placed to this donor immediately.
                  </div>
                  <button 
                    onClick={confirmRequest}
                    className="w-full py-5 bg-primary text-white font-black text-lg rounded-[1.5rem] hover:bg-primary-hover shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    Send Emergency Alert
                  </button>
                </div>
              )}

              {requestStatus === 'sending' && (
                <div className="py-16 space-y-8">
                  <div className="w-24 h-24 border-8 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">Connecting...</h3>
                </div>
              )}

              {requestStatus === 'success' && (
                <div className="space-y-6 pt-4">
                  <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-black text-green-500 uppercase tracking-tighter">Alert Transmitted</h3>
                  <p className="text-gray-500 font-bold px-6">The donor has been notified. You will receive an update once they confirm the dispatch.</p>
                  <button 
                    onClick={closePortal}
                    className="w-full py-5 bg-gray-100 dark:bg-dark-border text-gray-900 dark:text-white font-black rounded-[1.5rem]"
                  >
                    Close Portal
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {filteredDonors.length === 0 && (
        <div className="text-center py-32">
          <Heart className="w-20 h-20 text-gray-100 dark:text-dark-bg mx-auto mb-6" />
          <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">No Donors in Sight</h3>
          <p className="text-gray-500 font-medium italic">We are currently scanning the network for new registrations.</p>
        </div>
      )}
    </div>
  );
}
