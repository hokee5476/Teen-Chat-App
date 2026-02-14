import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, User, Settings, Edit } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import AvatarFrame from './AvatarFrame';

export default function ProfileDropdown({ currentUser, onLogout, onSettings, onEditProfile }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!currentUser) return null;

  const pointsToNextLevel = () => {
    const level = currentUser.level || 1;
    if (level === 1) return 100;
    if (level === 2) return 250;
    if (level === 3) return 500;
    return 1000;
  };

  const currentLevelPoints = () => {
    const level = currentUser.level || 1;
    if (level === 1) return 0;
    if (level === 2) return 100;
    if (level === 3) return 350;
    return 850 + ((level - 4) * 1000);
  };

  const progress = (((currentUser.points || 0) - currentLevelPoints()) / (pointsToNextLevel() - currentLevelPoints())) * 100;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-full border border-gray-700/50 hover:border-purple-500/50 transition-colors"
      >
        <AvatarFrame frameId={currentUser?.avatar_frame || 'default'} size="sm">
          {currentUser?.avatar ? (
            <img src={currentUser.avatar} className="w-6 h-6 rounded-full object-cover" alt="" />
          ) : (
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500" />
          )}
        </AvatarFrame>
        <span className="text-cyan-400 text-sm font-medium hidden sm:block">{currentUser?.username}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-64 bg-gray-900 rounded-xl border border-purple-500/30 shadow-2xl overflow-hidden z-50"
          >
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 p-4 border-b border-gray-800">
              <div className="flex items-center gap-3 mb-3">
                <AvatarFrame frameId={currentUser?.avatar_frame || 'default'} size="md">
                  {currentUser?.avatar ? (
                    <img src={currentUser.avatar} className="w-12 h-12 rounded-full object-cover" alt="" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500" />
                  )}
                </AvatarFrame>
                <div>
                  <p className="text-white font-bold">{currentUser?.username}</p>
                  <p className="text-cyan-400 text-sm">Level {currentUser?.level || 1}</p>
                </div>
              </div>

              {/* XP Progress */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">XP Progress</span>
                  <span className="text-purple-400">{(currentUser.points || 0) - currentLevelPoints()} / {pointsToNextLevel() - currentLevelPoints()}</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                  />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="p-4 border-b border-gray-800 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Coins</span>
                <span className="text-yellow-400 font-bold">{currentUser?.currency || 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Messages</span>
                <span className="text-purple-400 font-bold">{currentUser?.messages_sent || 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Referrals</span>
                <span className="text-cyan-400 font-bold">{currentUser?.referrals || 0}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="p-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onEditProfile();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
              >
                <Edit className="w-4 h-4" />
 
