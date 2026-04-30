import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { districts } from '../data/mockData';
import { fetchAmbulances } from '../lib/dataService';
import { MapPin, Phone, Truck, User, Navigation, Share2, Loader2, Search, Zap } from 'lucide-react';

export default function Ambulances() {
  const { t } = useTranslation();
  const [ambulances, setAmbulances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAmbulances()
      .then(setAmbulances)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredAmbulances = ambulances.filter((amb) => {
    const matchesDistrict = selectedDistrict === 'All' || amb.district === selectedDistrict;
    const matchesStatus = statusFilter === 'All' || amb.status === statusFilter;
    const matchesSearch = amb.driver.toLowerCase().includes(searchTerm.toLowerCase()) || amb.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDistrict && matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center justify-center py-32">
          <Truck className="w-16 h-16 text-primary animate-pulse mb-4" />
          <p className="text-xl font-bold animate-pulse text-gray-500">Scanning Satellite for Available Ambulances...</p>
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
              {t('ambulances_title') || 'Ambulance Services'}
            </h1>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Live Network</span>
            </div>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
          {t('ambulances_subtitle') || 'High-speed emergency vehicle coordination and smart routing.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 bg-white dark:bg-dark-surface p-4 rounded-3xl border border-gray-100 dark:border-dark-border shadow-xl shadow-gray-200/20">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search by driver or vehicle..."
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
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Availability</option>
            <option value="Available">Only Available</option>
            <option value="Busy">Currently Busy</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAmbulances.map(amb => (
          <div key={amb.id} className="group bg-white dark:bg-dark-surface rounded-[2.5rem] p-8 shadow-sm border border-gray-100 dark:border-dark-border hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden flex flex-col">
            <div className={`absolute top-0 right-0 px-6 py-2 rounded-bl-3xl text-xs font-black uppercase tracking-widest ${amb.status === 'Available' ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 'bg-red-500 text-white opacity-50'}`}>
              {amb.status}
            </div>

            <div className="flex items-center gap-5 mb-8">
              <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary group-hover:rotate-6 transition-transform">
                <Truck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-black text-2xl text-gray-900 dark:text-white group-hover:text-primary transition-colors">{amb.driver}</h3>
                <div className="flex items-center gap-2 text-gray-500 text-xs font-bold mt-1 uppercase tracking-widest">
                  <Zap className="w-3.5 h-3.5 text-orange-500" />
                  {amb.provider || 'Premium Response'}
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-10 flex-grow">
              <div className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                <Navigation className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm font-bold leading-relaxed">
                  Last known: <span className="text-gray-900 dark:text-white">{amb.location}, {amb.district}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-black">{amb.phone}</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                disabled={amb.status !== 'Available'}
                className={`flex-1 py-4 font-black rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 text-sm ${amb.status === 'Available' ? 'bg-primary text-white hover:bg-primary-hover hover:scale-[1.02] shadow-primary/20' : 'bg-gray-100 dark:bg-dark-bg text-gray-400 cursor-not-allowed shadow-none'}`}
              >
                DISPATCH NOW
              </button>
              <button 
                onClick={() => {
                  const text = `🚨 *JEEVAN SANKET AMBULANCE DISPATCH* 🚨\n\n*Driver:* ${amb.driver}\n*District:* ${amb.district}\n*Current:* ${amb.location}\n*Phone:* ${amb.phone}`;
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
      
      {filteredAmbulances.length === 0 && (
        <div className="text-center py-32">
          <Truck className="w-20 h-20 text-gray-100 dark:text-dark-bg mx-auto mb-6" />
          <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">No Units Found</h3>
          <p className="text-gray-500 font-medium">Try broadening your search or choosing a different district.</p>
        </div>
      )}
    </div>
  );
}
