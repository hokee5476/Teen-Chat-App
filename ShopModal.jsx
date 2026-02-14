import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Flame, Snowflake, Crown, Rainbow, Palette, Lock, Zap, Star, Hexagon, Diamond, Square, Pentagon, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';

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

const SHOP_ITEMS = {
  frames: [
    { id: 'crown_top', name: 'Golden Crown', price: 50, level: 1, icon: Crown, color: 'from-yellow-500 to-orange-500' },
    { id: 'sparkle_around', name: 'Sparkle Ring', price: 100, level: 2, icon: Sparkles, color: 'from-purple-500 to-pink-500' },
    { id: 'flame_aura', name: 'Flame Aura', price: 150, level: 3, icon: Flame, color: 'from-orange-500 to-red-500' },
    { id: 'ice_spikes', name: 'Ice Spikes', price: 250, level: 5, icon: Snowflake, color: 'from-cyan-500 to-blue-500' },
    { id: 'star_orbit', name: 'Star Orbit', price: 400, level: 7, icon: Star, color: 'from-yellow-400 to-orange-400' },
    { id: 'rainbow_glow', name: 'Rainbow Glow', price: 600, level: 10, icon: Rainbow, color: 'from-red-500 via-purple-500 to-blue-500' },
    { id: 'cosmic_ring', name: 'Cosmic Ring', price: 1000, level: 15, icon: Zap, color: 'from-violet-500 via-fuchsia-500 to-pink-500' },
    { id: 'toxic_hazard', name: 'Toxic Hazard', price: 800, level: 12, icon: Zap, color: 'from-lime-500 to-green-500' },
    { id: 'blood_moon', name: 'Blood Moon', price: 1200, level: 14, icon: Flame, color: 'from-red-600 to-red-900' },
    { id: 'lightning_bolt', name: 'Lightning Storm', price: 1400, level: 16, icon: Zap, color: 'from-yellow-400 to-yellow-600' },
    { id: 'crystal_cage', name: 'Crystal Cage', price: 1600, level: 18, icon: Diamond, color: 'from-cyan-400 to-blue-500' },
    { id: 'void_portal', name: 'Void Portal', price: 2000, level: 20, icon: Hexagon, color: 'from-purple-600 to-purple-900' },
    { id: 'dragon_scales', name: 'Dragon Scales', price: 2500, level: 22, icon: Flame, color: 'from-red-700 to-orange-600' },
    { id: 'demon_horns', name: 'Demon Horns', price: 3000, level: 25, icon: Flame, color: 'from-red-600 to-gray-900' },
    { id: 'angel_wings', name: 'Angel Wings', price: 3500, level: 28, icon: Sparkles, color: 'from-white to-blue-200' },
    { id: 'neon_pulse', name: 'Neon Pulse', price: 4000, level: 30, icon: Zap, color: 'from-cyan-400 to-purple-500' },
    { id: 'laser_grid', name: 'Laser Grid', price: 5000, level: 35, icon: Square, color: 'from-green-400 to-emerald-500' },
    { id: 'skull_crown', name: 'Skull Crown', price: 6000, level: 40, icon: Crown, color: 'from-gray-400 to-gray-700' },
    { id: 'flower_bloom', name: 'Flower Bloom', price: 7500, level: 45, icon: Sparkles, color: 'from-pink-400 to-rose-500' }
  ],
  messageFrames: [
    { id: 'spike_border', name: 'Spike Border', price: 200, level: 3, icon: Zap, preview: 'spikes' },
    { id: 'star_burst', name: 'Star Burst', price: 300, level: 5, icon: Star, preview: 'stars' },
    { id: 'lightning_edge', name: 'Lightning Edge', price: 400, level: 7, icon: Zap, preview: 'lightning' },
    { id: 'flame_border', name: 'Flame Border', price: 500, level: 9, icon: Flame, preview: 'flames' },
    { id: 'crystal_sharp', name: 'Crystal Sharp', price: 700, level: 12, icon: Diamond, preview: 'crystals' },
    { id: 'thorn_frame', name: 'Thorn Frame', price: 900, level: 15, icon: Hexagon, preview: 'thorns' },
    { id: 'hexagon_tech', name: 'Hexagon Tech', price: 1200, level: 18, icon: Hexagon, preview: 'hexagons' },
 
