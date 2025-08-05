import { useState, useEffect } from 'react';
import { Theme } from '../types';

const themes: Theme[] = [
  { name: 'Light', value: 'light', preview: { primary: '#570df8', secondary: '#f000b8', accent: '#37cdbe', neutral: '#3d4451' } },
  { name: 'Dark', value: 'dark', preview: { primary: '#661ae6', secondary: '#d926aa', accent: '#1fb2a5', neutral: '#191d24' } },
  { name: 'Cupcake', value: 'cupcake', preview: { primary: '#65c3c8', secondary: '#ef9fbc', accent: '#eeaf3a', neutral: '#291334' } },
  { name: 'Synthwave', value: 'synthwave', preview: { primary: '#e779c1', secondary: '#58c7f3', accent: '#f3cc30', neutral: '#20134e' } },
  { name: 'Cyberpunk', value: 'cyberpunk', preview: { primary: '#ff7598', secondary: '#75d1f0', accent: '#c7f59b', neutral: '#423aa0' } },
  { name: 'Corporate', value: 'corporate', preview: { primary: '#4b6bfb', secondary: '#7b92b2', accent: '#67cba0', neutral: '#181a2a' } },
  { name: 'Luxury', value: 'luxury', preview: { primary: '#ffffff', secondary: '#152747', accent: '#513448', neutral: '#0f0f0f' } },
  { name: 'Dracula', value: 'dracula', preview: { primary: '#ff79c6', secondary: '#bd93f9', accent: '#ffb86c', neutral: '#414558' } }
];

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<string>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const changeTheme = (theme: string) => {
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  };

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    changeTheme(newTheme);
  };

  return {
    currentTheme,
    themes,
    changeTheme,
    toggleTheme
  };
};