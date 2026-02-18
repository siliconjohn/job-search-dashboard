import { useState, type ReactNode } from 'react';
import type { ThemeName } from './ThemeContext';
import { ThemeContext } from './ThemeContext';

const ThemeProvider = ({ children } : { children: ReactNode }) => {
    const [themeName, setThemeName] = useState<ThemeName>('defaultAlgorithm');

    const toggleTheme = () => {
        setThemeName(themeName === 'defaultAlgorithm' ? 'darkAlgorithm' : 'defaultAlgorithm');
    };

    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
  );
}

export default ThemeProvider;
