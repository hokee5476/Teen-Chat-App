import { motion, AnimatePresence } from 'framer-motion';
import { X, Coins, MessageSquare, Share2, Twitter, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function EarnCoinsModal({ isOpen, onClose, onShare }) {
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
          className="relative z-10 w-full max-w-md bg-gray-900 rounded-2xl border border-yellow-500/30 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 p-6 border-b border-yellow-500/30">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Coins className="w-6 h-6 text-yellow-400 animate-bounce" />
                  Earn More Coins
                </h2>
                <p className="text-gray-400 text-sm mt-1">Get rewarded for your activity</p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5 text-gray-400" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 rounded-xl p-4 border border-purple-500/30">
              <div className="flex items-start gap-3">
                <div className="bg-purple-500/20 rounded-lg p-2">
                  <MessageSquare className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold mb-1">Chat & Earn</h3>
                  <p className="text-gray-400 text-sm mb-2">Send messages to earn coins and XP</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-yellow-400 font-bold">+5 coins</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-purple-400 font-bold">+10 XP</span>
                    <span className="text-gray-500">per message</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-900/30 to-green-900/30 rounded-xl p-4 border border-blue-500/30">
              <div className="flex items-start gap-3">
                <div className="bg-blue-500/20 rounded-lg p-2">
                  <Share2 className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold mb-1">Share & Get Rewarded</h3>
                  <p className="text-gray-400 text-sm mb-3">Share THE VOID with friends</p>
                  <div className="flex items-center gap-2 text-sm mb-3">
                    <span className="text-yellow-400 font-bold">+50 coins</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-purple-400 font-bold">+100 XP</span>
                    <span className="text-gray-500">per share</span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        onShare('twitter');
                        onClose();
                      }}
                      className="flex-1 bg-blue-600 hover:bg-blue-500"
                    >
                      <Twitter className="w-4 h-4 mr-1" />
                      Tweet
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        onShare('whatsapp');
                        onClose();
                      }}
                      className="flex-1 bg-green-600 hover:bg-green-500"
                    >
                      WhatsApp
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        onShare('copy');
                        onClose();
                      }}
                      className="flex-1 bg-purple-600 hover:bg-purple-500"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-2">
              <p className="text-gray-500 text-xs">
                💡 Level up to unlock exclusive items in the shop!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
