import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

const SoundContext = createContext();

// Web Audio API sounds - no external files needed
const createBeep = (audioContext, frequency, duration, type = 'sine') => {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = type;
  
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
};

export function SoundProvider({ children }) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioContextRef = useRef(null);

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playSound = useCallback((type) => {
    if (!soundEnabled || !audioContextRef.current) return;
    
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    switch (type) {
      case 'send':
        createBeep(audioContextRef.current, 800, 0.1, 'sine');
        setTimeout(() => createBeep(audioContextRef.current, 1000, 0.1, 'sine'), 50);
        break;
      case 'receive':
        createBeep(audioContextRef.current, 600, 0.15, 'triangle');
        break;
      case 'click':
        createBeep(audioContextRef.current, 400, 0.05, 'square');
        break;
      case 'enter':
        createBeep(audioContextRef.current, 300, 0.2, 'sine');
        setTimeout(() => createBeep(audioContextRef.current, 500, 0.2, 'sine'), 100);
 
