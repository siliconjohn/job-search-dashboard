import { useContext } from 'react';
import { ThemeContext, type ThemeValue } from './ThemeTypes';

export const useTheme = (): ThemeValue => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
