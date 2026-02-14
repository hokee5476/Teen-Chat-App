import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Medal, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function LeaderboardModal({ isOpen, onClose }) {
  const { data: topUsers = [] } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      const users = await base44.entities.VoidUser.list('-currency', 10);
      return users.filter(u => u.currency > 0);
    },
    enabled: isOpen
  });

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
          className="relative z-10 w-full max-w-md bg-gray-900 rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 p-6 border-b border-yellow-500/30">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                  Leaderboard
                </h2>
                <p className="text-gray-400 text-sm mt-1">Top coin collectors</p>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5 text-gray-400" />
              </Button>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="space-y-3">
              {topUsers.map((user, index) => {
                const Icon = index === 0 ? Trophy : index === 1 ? Medal : Award;
 
