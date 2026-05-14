import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Store, User, Palette, CreditCard, Check } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { useAuthStore } from '../store/authStore';
import { organizationService } from '../services/api';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import { organizationService } from '../services/api';
import toast from 'react-hot-toast';

const OnboardingPage = () => {
  const [step, setStep] = useState(1);
  const [businessType, setBusinessType] = useState('');
  const [orgName, setOrgName] = useState('');
  const [selectedColor, setSelectedColor] = useState('emerald');
  const navigate = useNavigate();
  const { organization, setOrganization } = useAuthStore();

  const businessTypes = [
    { id: 'pharmacy', name: 'Pharmacy', icon: '💊', color: 'emerald' },
    { id: 'retail', name: 'Retail Store', icon: '🛍️', color: 'teal' },
    { id: 'restaurant', name: 'Restaurant', icon: '🍽️', color: 'orange' },
    { id: 'hardware', name: 'Hardware', icon: '🔧', color: 'blue' },
    { id: 'beauty', name: 'Beauty Salon', icon: '💄', color: 'pink' },
    { id: 'electronics', name: 'Electronics', icon: '📱', color: 'purple' },
  ];

  const colors = [
    { id: 'emerald', classes: 'bg-emerald-500 hover:bg-emerald-600' },
    { id: 'teal', classes: 'bg-teal-500 hover:bg-teal-600' },
    { id: 'blue', classes: 'bg-blue-500 hover:bg-blue-600' },
    { id: 'purple', classes: 'bg-purple-500 hover:bg-purple-600' },
    { id: 'pink', classes: 'bg-pink-500 hover:bg-pink-600' },
    { id: 'orange', classes: 'bg-orange-500 hover:bg-orange-600' },
  ];

  const handleComplete = async () => {
    if (!organization) {
      navigate('/dashboard');
      return;
    }

    try {
      await organizationService.updateSettings(organization._id, {
        name: orgName || organization.name,
        businessType: businessType || organization.businessType,
        theme: { primaryColor: selectedColor, secondaryColor: 'teal' },
      });
      toast.success('Organization setup complete!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Setup error:', error);
      toast.error('Setup failed, but continuing...');
      navigate('/dashboard');
    }
  };

  const renderStep1 = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Welcome to NexaCore</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6">Let's set up your business in just a few steps</p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Organization Name
          </label>
          <input
            type="text"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            className="input-field w-full"
            placeholder="Enter your business name"
          />
        </div>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">What type of business?</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6">Select the option that best describes your business</p>
      
        <div className="grid grid-cols-2 gap-3">
          {businessTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setBusinessType(type.id)}
              className={`p-4 glass rounded-xl text-center transition-all ${
                businessType === type.id
                  ? `ring-2 ring-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-900/20`
                  : 'hover:bg-white/60'
              }`}
            >
              <div className="text-3xl mb-2">{type.icon}</div>
              <p className="font-medium text-slate-900 dark:text-white">{type.name}</p>
            </button>
          ))}
        </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Choose your theme</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6">Select your preferred color scheme</p>

      <div className="grid grid-cols-3 gap-4">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => setSelectedColor(color.id)}
            className={`p-4 rounded-xl transition-all ${selectedColor === color.id ? 'ring-2 ring-offset-2 ring-emerald-500 scale-105' : ''} ${color.classes}`}
          />
        ))}
      </div>
    </motion.div>
  );

  const renderStep4 = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-center">
      <div className="w-20 h-20 rounded-full bg-gradient-emerald flex items-center justify-center mx-auto mb-6">
        <Check className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">You're all set!</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Your NexaCore workspace is ready. Start managing your business now.
      </p>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 dark:from-slate-950 dark:via-emerald-950 dark:to-slate-950 flex items-center justify-center p-4">
      <Card glass className="w-full max-w-md p-8">
        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`w-3 h-3 rounded-full transition-all ${
                s === step ? 'bg-gradient-emerald w-8' : s < step ? 'bg-emerald-400' : 'glass'
              }`}
            />
          ))}
        </div>

        {/* Step content */}
        <div className="min-h-[300px]">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            className="text-slate-600 dark:text-slate-400 font-medium"
            disabled={step === 1}
          >
            Back
          </button>
          
          <Button
            onClick={() => {
              if (step < 4) {
                setStep(step + 1);
              } else {
                handleComplete();
              }
            }}
            disabled={step === 2 && !businessType}
          >
            {step === 4 ? 'Go to Dashboard' : 'Continue'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default OnboardingPage;