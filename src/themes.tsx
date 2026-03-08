import { Sun, Moon, Droplets, Leaf, Sunset as SunsetIcon, Ghost } from 'lucide-react';
import type { Theme } from './types';

export const themes: Theme[] = [
  { id: 'light', name: 'Light', icon: <Sun size={16} />, color: '#4f46e5' },
  { id: 'dark', name: 'Dark', icon: <Moon size={16} />, color: '#818cf8' },
  { id: 'midnight', name: 'Midnight', icon: <Droplets size={16} />, color: '#38bdf8' },
  { id: 'ocean', name: 'Ocean', icon: <Droplets size={16} />, color: '#0284c7' },
  { id: 'forest', name: 'Forest', icon: <Leaf size={16} />, color: '#059669' },
  { id: 'sunset', name: 'Sunset', icon: <SunsetIcon size={16} />, color: '#f97316' },
  { id: 'nord', name: 'Nord', icon: <Ghost size={16} />, color: '#5e81ac' }
];
