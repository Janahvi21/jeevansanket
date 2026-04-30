import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Hospital, Activity, Droplets, Map, PhoneCall } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fetchCounts } from '../lib/dataService';

export default function Home() {
  const { t } = useTranslation();
  const [counts, setCounts] = useState({ hospitals: 0, bloodBanks: 0, ambulances: 0, donors: 0 });

  useEffect(() => {
    fetchCounts().then(setCounts).catch(console.error);
  }, []);
  
  const features = [
// ... (features remain same)
    { icon: Hospital, title: 'Live Hospital Beds', desc: 'Real-time tracking of ICU, Oxygen, and General beds across Maharashtra.', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { icon: Droplets, title: 'Blood Bank Network', desc: 'Find nearest blood banks and live inventory status instantly.', color: 'text-red-500', bg: 'bg-red-500/10' },
    { icon: Activity, title: 'Ambulance Tracking', desc: 'Smart routing and multi-dispatch system for emergency vehicles.', color: 'text-green-500', bg: 'bg-green-500/10' },
    { icon: Map, title: 'District Mapping', desc: 'Coverage across all 36 districts of Maharashtra.', color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { icon: ShieldAlert, title: 'Emergency Alerts', desc: 'Disaster news, geo-based alerts and resource shortage notifications.', color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { icon: PhoneCall, title: 'SOS & Quick Contact', desc: 'One-tap emergency communication with authorities.', color: 'text-rose-500', bg: 'bg-rose-500/10' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 dark:opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-3xl rounded-full mix-blend-multiply dark:mix-blend-screen" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 font-medium text-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            Live Across Maharashtra
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8">
            {t('welcome')}
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
            {t('subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link
              to="/hospitals"
              className="px-8 py-4 rounded-xl bg-primary text-white font-semibold text-lg hover:bg-primary-hover hover:-translate-y-1 transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-2"
            >
              <ShieldAlert className="w-5 h-5" />
              {t('emergency_services')}
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 rounded-xl bg-white dark:bg-dark-surface text-gray-900 dark:text-white font-semibold text-lg hover:bg-gray-50 dark:hover:bg-dark-surface/80 transition-all shadow-md border border-gray-200 dark:border-dark-border"
            >
              {t('join_network')}
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-gray-200 dark:border-dark-border pt-10">
            <div className="text-center">
              <div className="text-3xl font-black text-blue-500 mb-1">{counts.hospitals}</div>
              <div className="text-sm text-gray-500 uppercase font-bold tracking-widest">Hospitals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-red-500 mb-1">{counts.bloodBanks}</div>
              <div className="text-sm text-gray-500 uppercase font-bold tracking-widest">Blood Banks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-green-500 mb-1">{counts.ambulances}</div>
              <div className="text-sm text-gray-500 uppercase font-bold tracking-widest">Ambulances</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-orange-500 mb-1">{counts.donors}</div>
              <div className="text-sm text-gray-500 uppercase font-bold tracking-widest">Donors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50 dark:bg-dark-bg border-t border-gray-100 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Comprehensive Healthcare Ecosystem</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Everything you need during a medical emergency, accessible in one unified platform.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-dark-surface p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-dark-border hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
