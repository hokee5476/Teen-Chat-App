import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Check, Hexagon, Diamond, Star, Square, Pentagon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';

const FRAME_ICONS = {
  neon_circle: Sparkles,
  fire_hex: Hexagon,
  ice_diamond: Diamond,
  gold_star: Star,
  rainbow_octagon: Sparkles,
  plasma_square: Square,
  cosmic_pentagon: Pentagon
};

const MESSAGE_COLORS = {
  default: 'from-gray-800 to-gray-800',
  neon_purple: 'from-purple-600 to-pink-600',
  fire_red: 'from-red-600 to-orange-600',
  ice_blue: 'from-cyan-600 to-blue-600',
  gold_yellow: 'from-yellow-500 to-orange-500',
  toxic_green: 'from-lime-500 to-green-600',
  pink_glow: 'from-pink-500 to-rose-600',
  rainbow: 'from-red-500 via-purple-500 to-blue-500'
};

const MESSAGE_FONTS = {
  default: '',
  bold: 'font-bold',
  cursive: 'font-serif italic',
  mono: 'font-mono',
  glitch: 'font-bold tracking-wider'
};

const THEMES = {
  default: { name: 'Default Dark', gradient: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)' },
  sunset_waves: { name: 'Sunset Waves', gradient: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ee5a6f 100%)' },
  ocean_vortex: { name: 'Ocean Vortex', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' },
  forest_fractals: { name: 'Forest Fractals', gradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)' },
  cyberpunk_grid: { name: 'Cyberpunk Grid', gradient: 'linear-gradient(135deg, #f953c6 0%, #b91d73 50%, #833ab4 100%)' },
  galaxy_spiral: { name: 'Galaxy Spiral', gradient: 'linear-gradient(135deg, #360033 0%, #0b8793 50%, #d38312 100%)' },
  lava_cracks: { name: 'Lava Cracks', gradient: 'linear-gradient(135deg, #ff0000 0%, #ff7f00 50%, #ffff00 100%)' },
  ice_crystals: { name: 'Ice Crystals', gradient: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 50%, #667eea 100%)' }
};

export default function InventoryModal({ isOpen, onClose, currentUser, onEquip }) {
  const [activeTab, setActiveTab] = useState('frames');
  const [equipping, setEquipping] = useState(null);

  const handleEquip = async (itemType, itemId) => {
    setEquipping(itemId);
    try {
      const updates = {};
      if (itemType === 'frames') updates.avatar_frame = itemId;
 
