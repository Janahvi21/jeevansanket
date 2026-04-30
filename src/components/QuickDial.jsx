import { PhoneCall } from 'lucide-react';

export default function QuickDial() {
  return (
    <a
      href="tel:108"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-red-600 text-white rounded-full shadow-2xl hover:bg-red-700 hover:scale-105 transition-all animate-bounce"
      title="Emergency Ambulance (108)"
    >
      <PhoneCall className="w-8 h-8" />
    </a>
  );
}
