import { motion } from 'framer-motion';
import { Eye, Users, Zap, Share2, Twitter, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSound } from './SoundManager';

export default function StatsBar({ totalViews, totalAccounts, onlineCount }) {
  const { playSound } = useSound();

  const shareText = "🔮 Just discovered THE VOID - the most epic underground chat room! Join the chaos 👻";
  const shareUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const handleShare = (platform) => {
    playSound('click');
    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        break;
      default:
        if (navigator.share) {
          navigator.share({ title: 'THE VOID', text: shareText, url: shareUrl });
          return;
        }
    }
    if (url) window.open(url, '_blank', 'width=600,height=400');
  };

  const stats = [
    { icon: Eye, value: totalViews, label: 'Views', color: 'text-purple-400' },
    { icon: Users, value: totalAccounts, label: 'Accounts', color: 'text-cyan-400' },
    { icon: Zap, value: onlineCount, label: 'Online Now', color: 'text-green-400', pulse: true },
  ];

  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gray-900/90 backdrop-blur-xl border-b border-purple-500/20 px-4 py-3"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Stats */}
        <div className="flex items-center gap-6">
          {stats.map(({ icon: Icon, value, label, color, pulse }) => (
            <motion.div
              key={label}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <div className={`relative ${pulse ? 'animate-pulse' : ''}`}>
                <Icon className={`w-5 h-5 ${color}`} />
                {pulse && (
                  <div className="absolute inset-0 animate-ping">
                    <Icon className={`w-5 h-5 ${color} opacity-50`} />
 
