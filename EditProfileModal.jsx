import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, User, Lock, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';

export default function EditProfileModal({ isOpen, onClose, currentUser, onUpdate }) {
  const [username, setUsername] = useState(currentUser?.username || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(currentUser?.avatar || null);
  const [saving, setSaving] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!username.trim()) {
      toast.error('Username is required');
      return;
    }

    if (password && password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setSaving(true);
    try {
      const updates = {};

      // Check if username changed
      if (username !== currentUser.username) {
        // Check if username is taken
        const existingUsers = await base44.entities.VoidUser.filter({ username });
        if (existingUsers.length > 0 && existingUsers[0].id !== currentUser.id) {
          toast.error('Username already taken');
          setSaving(false);
          return;
        }
        updates.username = username;
      }

      // Upload new avatar if provided
      if (avatarFile) {
        const { file_url } = await base44.integrations.Core.UploadFile({ file: avatarFile });
        updates.avatar_url = file_url;
      }

      // Update password if provided
      if (password) {
        updates.password_hash = password; // Simple password storage for demo
      }

      // Update user
      await base44.entities.VoidUser.update(currentUser.id, updates);

      // Update local user data
      const updatedUser = { ...currentUser, ...updates, avatar: updates.avatar_url || currentUser.avatar };
      onUpdate(updatedUser);

      toast.success('Profile updated!');
      onClose();
    } catch (err) {
      toast.error('Failed to update profile');
    }
    setSaving(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative z-10 w-full max-w-md bg-gray-900 rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-900/80 to-cyan-900/80 p-6 border-b border-purple-500/30">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <User className="w-6 h-6 text-cyan-400" />
                Edit Profile
              </h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-6 h-6 text-gray-400" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                {avatarPreview ? (
                  <img 
                    src={avatarPreview} 
                    className="w-24 h-24 rounded-full object-cover border-2 border-cyan-500/50"

          
