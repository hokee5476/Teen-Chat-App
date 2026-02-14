import { motion } from 'framer-motion';
import { Ghost, Edit, Trash2, Check, X } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import AvatarFrame from './AvatarFrame';
import { format } from 'date-fns';

const MESSAGE_COLORS = {
  default: 'from-gray-800/80 to-gray-800/80',
  neon_purple: 'from-purple-600/80 to-pink-600/80',
  fire_red: 'from-red-600/80 to-orange-600/80',
  ice_blue: 'from-cyan-600/80 to-blue-600/80',
  gold_yellow: 'from-yellow-500/80 to-orange-500/80',
  toxic_green: 'from-lime-500/80 to-green-600/80',
  pink_glow: 'from-pink-500/80 to-rose-600/80',
  rainbow: 'from-red-500/80 via-purple-500/80 to-blue-500/80'
};

const MESSAGE_FONTS = {
  default: '',
  bold: 'font-bold',
  cursive: 'font-serif italic',
  mono: 'font-mono',
  glitch: 'font-bold tracking-wider'
};

export default function MessageBubble({ message, isOwn, currentUser, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);
  const isPhantom = message.is_phantom;
  
  // Fetch sender's user data to get their level and customization
  const { data: senderData } = useQuery({
    queryKey: ['user', message.sender_name],
    queryFn: async () => {
      if (message.is_phantom) return null;
      const users = await base44.entities.VoidUser.filter({ username: message.sender_name });
      return users[0] || null;
    },
    enabled: !message.is_phantom
  });

  const senderLevel = senderData?.level || 1;
  const messageColor = senderData?.message_color || 'default';
  const messageFont = senderData?.message_font || 'default';
  const messageFrame = senderData?.message_frame || 'default';

  const handleSaveEdit = () => {
    if (editContent.trim() && editContent !== message.content) {
      onEdit(message.id, editContent.trim());
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditContent(message.content);
    setIsEditing(false);
  };

  const frameId = senderData?.avatar_frame || 'default';
  const timestamp = message.created_date ? format(new Date(message.created_date), 'h:mm a') : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex gap-3 group ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar with Frame */}
      <AvatarFrame frameId={isPhantom ? 'default' : frameId} size="sm">
        <div className={`relative flex-shrink-0 w-10 h-10 rounded-full overflow-hidden ${
          isPhantom 
            ? 'bg-gradient-to-br from-purple-600/30 to-cyan-600/30 border border-purple-500/50' 
            : 'border-2 border-cyan-500/50'
        }`}>
          {isPhantom ? (
            <div className="w-full h-full flex items-center justify-center">
              <Ghost className="w-5 h-5 text-purple-400" />
            </div>
          ) : message.sender_avatar ? (
            <img 
              src={message.sender_avatar} 
              alt={message.sender_name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-cyan-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {message.sender_name?.charAt(0)?.toUpperCase()}
              </span>
            </div>
          )}
          {/* Online indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900" />
        </div>
      </AvatarFrame>

      {/* Message Content */}
      <div className={`max-w-[70%] ${isOwn ? 'items-end' : 'items-start'}`}>
        <div className={`flex items-center gap-2 mb-1 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`text-xs ${isOwn ? 'text-right' : 'text-left'} ${
            isPhantom ? 'text-purple-400' : 'text-cyan-400'
          }`}>
            {isPhantom ? '👻 Phantom' : message.sender_name}
          </div>
          {!isPhantom && (
            <span className="text-xs text-gray-500">Lvl {senderLevel}</span>
          )}
          <span className="text-xs text-gray-600">• {timestamp}</span>
        </div>

        {isEditing ? (
          <div className="flex gap-2 items-center">
            <Input
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="bg-gray-800 border-purple-500/50 text-white text-sm"
              onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
 
