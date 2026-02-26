import { createContext, useContext, useState, type ReactNode } from 'react';

export type ThemeName = 'defaultAlgorithm' | 'darkAlgorithm';

export interface ThemeValue {
    themeName: ThemeName;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeValue | undefined> (undefined);

export const useTheme = ():ThemeValue => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within a ThemeProvider');
    return context;
}

export const ThemeProvider = ({ children } : { children: ReactNode }) => {
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