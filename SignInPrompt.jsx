import { motion } from 'framer-motion';
import { Sparkles, Crown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useSound } from './SoundManager';

export default function SignInPrompt({ onDismiss }) {
  const navigate = useNavigate();
  const { playSound } = useSound();

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
    >
      <div className="bg-gradient-to-r from-purple-900/95 to-cyan-900/95 backdrop-blur-xl rounded-2xl border border-purple-500/50 p-6 shadow-2xl shadow-purple-500/30">
        <div className="flex items-start gap-4">
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center"
            >
              <Crown className="w-6 h-6 text-white" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1"
            >
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            </motion.div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg mb-1 flex items-center gap-2">
              Upgrade Your Experience
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </h3>
            <p className="text-purple-200 text-sm mb-4">
              Sign in to get a custom username, profile pic, and stand out from the phantoms!
            </p>
            
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  playSound('click');
                  navigate(createPageUrl('Enter'));
                }}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold shadow-lg"
              >
                Sign In Now
              </Button>
 
