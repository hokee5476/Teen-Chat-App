import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX, User, LogOut, Ghost } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useSound } from './SoundManager';

export default function SettingsPanel({ isOpen, onClose, currentUser, onLogout }) {
  const { soundEnabled, setSoundEnabled, playSound } = useSound();

  const handleToggleSound = (checked) => {
    setSoundEnabled(checked);
    if (checked) {
      setTimeout(() => playSound('click'), 100);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-80 bg-gray-900 border-l border-purple-500/30 z-50 shadow-2xl"
          >
            <div className="p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-white">Settings</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    playSound('click');
                    onClose();
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* User Info */}
              <div className="mb-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                <div className="flex items-center gap-3">
                  {currentUser?.is_phantom ? (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/30 to-cyan-600/30 border border-purple-500/50 flex items-center justify-center">
                      <Ghost className="w-6 h-6 text-purple-400" />
                    </div>
                  ) : currentUser?.avatar ? (
                    <img src={currentUser.avatar} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-600 to-purple-600 flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <div>
                    <div className={`font-bold ${currentUser?.is_phantom ? 'text-purple-400' : 'text-cyan-400'}`}>
                      {currentUser?.is_phantom ? '👻 Phantom Mode' : currentUser?.username || 'Guest'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {currentUser?.is_phantom ? 'Anonymous' : 'Registered User'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className="space-y-6 flex-1">
                {/* Sound Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    {soundEnabled ? (
                      <Volume2 className="w-5 h-5 text-purple-400" />
                    ) : (
                      <VolumeX className="w-5 h-5 text-gray-500" />
                    )}
                    <span className="text-white">Sound Effects</span>
                  </div>
                  <Switch
                    checked={soundEnabled}
                    onCheckedChange={handleToggleSound}
                  />
                </div>
              </div>

              {/* Logout / Switch Mode */}
              {!currentUser?.is_phantom && (
                <Button
                  onClick={() => {
                    playSound('click');
                    onLogout();
                  }}
                  variant="outline"
                  className="w-full border-red-500/50 text-red-400 hover:bg-red-500/20"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
