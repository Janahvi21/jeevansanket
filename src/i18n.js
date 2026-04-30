import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: "Coordinating Lifesaving Care When Seconds Matter.",
      subtitle: "A centralized, real-time platform connecting hospitals, blood banks, ambulances, and citizens for rapid emergency response in Maharashtra.",
      emergency_services: "Emergency Services",
      join_network: "Join Network",
      hospitals: "Hospitals",
      blood_banks: "Blood Banks",
      ambulances: "Ambulances",
      donors: "Donors",
      login: "Login",
      sos: "SOS",
    }
  },
  hi: {
    translation: {
      welcome: "जब सेकंड मायने रखते हैं, जीवन रक्षक देखभाल का समन्वय।",
      subtitle: "महाराष्ट्र में त्वरित आपातकालीन प्रतिक्रिया के लिए अस्पतालों, रक्त बैंकों, एम्बुलेंस और नागरिकों को जोड़ने वाला एक केंद्रीकृत, वास्तविक समय का मंच।",
      emergency_services: "आपातकालीन सेवाएं",
      join_network: "नेटवर्क में शामिल हों",
      hospitals: "अस्पताल",
      blood_banks: "ब्लड बैंक",
      ambulances: "एम्बुलेंस",
      donors: "दाता",
      login: "लॉगिन",
      sos: "एसओएस",
    }
  },
  mr: {
    translation: {
      welcome: "जेव्हा सेकंद महत्त्वाचे असतात, तेव्हा जीवनरक्षक काळजीचे समन्वय.",
      subtitle: "महाराष्ट्रातील जलद आपत्कालीन प्रतिसादासाठी रुग्णालये, रक्तपेढ्या, रुग्णवाहिका आणि नागरिकांना जोडणारे एक केंद्रीकृत, रिअल-टाइम प्लॅटफॉर्म.",
      emergency_services: "आपत्कालीन सेवा",
      join_network: "नेटवर्कमध्ये सामील व्हा",
      hospitals: "रुग्णालये",
      blood_banks: "रक्तपेढ्या",
      ambulances: "रुग्णवाहिका",
      donors: "दाते",
      login: "लॉगिन",
      sos: "एसओएस",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
