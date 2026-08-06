import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMic, FiCheck, FiCalendar, FiCreditCard, FiAlertCircle, FiHelpCircle } from 'react-icons/fi';
import { useTranslation } from '../hooks/useTranslation';
import { useApp } from '../context/AppContext';

const languages = [
  { id: 'en', label: 'English', native: 'English' },
  { id: 'hi', label: 'Hindi', native: 'हिंदी' },
  { id: 'te', label: 'Telugu', native: 'తెలుగు' },
  { id: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { id: 'bn', label: 'Bengali', native: 'বাংলা' },
  { id: 'mr', label: 'Marathi', native: 'मराठी' },
  { id: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
  { id: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' }
];

const intents = [
  { id: 'appointment', icon: <FiCalendar className="w-16 h-16 mb-4 text-blue-500" />, label: 'Appointment', translate: { en: 'Appointment', hi: 'अपॉइंटमेंट', te: 'అపాయింట్మెంట్', ta: 'நியமனம்', bn: 'অ্যাপয়েন্টমেন্ট', mr: 'अपॉइंटमेंट', gu: 'એપોઇન્ટમેન્ટ', kn: 'ಅಪಾಯಿಂಟ್ಮೆಂಟ್' } },
  { id: 'billing', icon: <FiCreditCard className="w-16 h-16 mb-4 text-green-500" />, label: 'Billing', translate: { en: 'Billing', hi: 'बिलिंग', te: 'బిల్లింగ్', ta: 'பில்லிங்', bn: 'বিলিং', mr: 'बिलिंग', gu: 'બિલિંગ', kn: 'ಬಿಲ್ಲಿಂಗ್' } },
  { id: 'emergency', icon: <FiAlertCircle className="w-16 h-16 mb-4 text-red-500" />, label: 'Emergency', translate: { en: 'Emergency', hi: 'आपातकालीन', te: 'అత్యవసర', ta: 'அவசரம்', bn: 'জরুরী', mr: 'आणीबाणी', gu: 'ઇમરજન્સી', kn: 'ತುರ್ತು' } },
  { id: 'query', icon: <FiHelpCircle className="w-16 h-16 mb-4 text-purple-500" />, label: 'Other Query', translate: { en: 'Other Query', hi: 'अन्य प्रश्न', te: 'ఇతర ప్రశ్న', ta: 'பிற கேள்வி', bn: 'অন্যান্য প্রশ্ন', mr: 'इतर प्रश्न', gu: 'અન્ય પ્રશ્ન', kn: 'ಇತರೆ ಪ್ರಶ್ನೆ' } }
];

export default function Kiosk() {
  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const { language, setLanguage } = useApp();
  const { t } = useTranslation();

  const handleLanguageSelect = (selectedLang) => {
    setLanguage(selectedLang);
    setStep(2);
  };

  const handleIntentSelect = (selectedIntent) => {
    setStep(3);
  };

  const toggleRecording = () => {
    setIsRecording(prev => !prev);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setStep(4);
      }, 3000);
    }
  };

  const resetKiosk = () => {
    setStep(1);
    setIsRecording(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Kiosk Header */}
      <div className="absolute top-0 w-full bg-white shadow-sm p-6 text-center">
        <h1 className="text-3xl font-bold text-primary-700">Hospital Assist Kiosk</h1>
        <p className="text-gray-500 mt-2">Touch the screen to interact</p>
      </div>

      <AnimatePresence mode="wait">
        
        {/* Step 1: Language Selection */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-4xl"
          >
            <h2 className="text-4xl font-bold text-center mb-12">{t('kiosk_select_lang')} <br/><span className="text-2xl text-gray-500 mt-2 block">अपनी भाषा चुनें</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {languages.map(l => (
                <button
                  key={l.id}
                  onClick={() => handleLanguageSelect(l.id)}
                  className="bg-white hover:bg-primary-50 rounded-3xl shadow-lg p-10 flex flex-col items-center justify-center transition-all transform hover:scale-105 border-4 border-transparent hover:border-primary-500"
                >
                  <span className="text-5xl font-bold text-gray-800 mb-4">{l.native}</span>
                  <span className="text-xl text-gray-500">{l.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Intent Selection */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-5xl"
          >
            <h2 className="text-4xl font-bold text-center mb-12">{t('kiosk_help')} <br/><span className="text-2xl text-gray-500 mt-2 block">हम आपकी कैसे मदद कर सकते हैं?</span></h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {intents.map(i => (
                <button
                  key={i.id}
                  onClick={() => handleIntentSelect(i.id)}
                  className="bg-white hover:bg-primary-50 rounded-3xl shadow-lg p-8 flex flex-col items-center justify-center transition-all transform hover:scale-105 border-4 border-transparent hover:border-primary-500"
                >
                  {i.icon}
                  <span className="text-2xl font-bold text-gray-800 mb-2">{i.translate[lang]}</span>
                </button>
              ))}
            </div>
            <button onClick={resetKiosk} className="mt-12 mx-auto block text-gray-500 text-lg hover:text-gray-800">
              {t('back')}
            </button>
          </motion.div>
        )}

        {/* Step 3: Voice/Visual Entry */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">{t('kiosk_speak')}</h2>
            <p className="text-xl text-gray-500 mb-12">{t('kiosk_speak_sub')}</p>
            
            <button 
              onClick={toggleRecording}
              className={`w-40 h-40 rounded-full flex items-center justify-center mx-auto transition-all ${
                isRecording ? 'bg-red-500 animate-pulse shadow-[0_0_50px_rgba(239,68,68,0.6)]' : 'bg-primary-600 hover:bg-primary-700 shadow-xl'
              }`}
            >
              <FiMic className="w-16 h-16 text-white" />
            </button>

            <div className="mt-12 text-gray-400">
              {isRecording ? t('kiosk_recording') : t('kiosk_or_keypad')}
            </div>

            {/* Optional Keypad could go here */}
            
            <button onClick={() => setStep(2)} className="mt-8 mx-auto block text-gray-500 text-lg hover:text-gray-800">
              {t('back')}
            </button>
          </motion.div>
        )}

        {/* Step 4: Success Ticket */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 text-center border-t-8 border-green-500"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheck className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold mb-2">{t('kiosk_token_title')}</h2>
            <p className="text-gray-500 mb-6">{t('kiosk_token_sub')}</p>
            
            <div className="text-6xl font-black text-primary-700 tracking-wider mb-8 bg-gray-50 py-4 rounded-xl">
              #42
            </div>
            
            <p className="text-lg text-gray-600 mb-8">{t('kiosk_wait')}</p>

            <button onClick={resetKiosk} className="w-full bg-primary-600 text-white font-bold text-xl py-4 rounded-2xl shadow-lg hover:bg-primary-700 transition-all">
              {t('kiosk_done')}
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
