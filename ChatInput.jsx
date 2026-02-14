import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSound } from './SoundManager';

export default function ChatInput({ onSend, disabled }) {
  const [message, setMessage] = useState('');
  const { playSound } = useSound();
  const inputRef = useRef(null);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      playSound('send');
      onSend(message.trim());
      setMessage('');
      // Keep focus on input after sending
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gray-900/90 backdrop-blur-xl border-t border-purple-500/20 p-4"
    >
      <div className="max-w-4xl mx-auto relative">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message into the void..."
              disabled={disabled}
              className="bg-gray-800/80 border-gray-700 focus:border-purple-500 text-white placeholder:text-gray-500 pr-12 py-6 rounded-xl"
            />
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleSend}
              disabled={!message.trim() || disabled}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white px-6 py-6 rounded-xl shadow-lg shadow-purple-500/25"
            >
              <Send className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
