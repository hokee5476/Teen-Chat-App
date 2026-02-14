import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function SignInPopup({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-sm bg-gray-900 rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 p-6 border-b border-purple-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-bold text-white">Sign In Required</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5 text-gray-400" />
              </Button>
            </div>
          </div>

          <div className="p-6">
            <p className="text-gray-400 mb-6 text-center">
              Create an account to unlock this feature and earn coins!
            </p>
            
            <Button
              onClick={() => navigate(createPageUrl('Enter'))}
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500"
            >
              Sign In / Create Account
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
