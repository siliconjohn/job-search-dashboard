import { useContext, useState, type ReactNode } from 'react';
import { ThemeContext, type ThemeName, type ThemeValue } from './ThemeTypes';

export const useTheme = (): ThemeValue => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within a ThemeProvider');
    return context;
};

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [themeName, setThemeName] = useState<ThemeName>('defaultAlgorithm');
    
    const toggleTheme = () => {
        setThemeName(themeName === 'defaultAlgorithm' ? 'darkAlgorithm' : 'defaultAlgorithm');
    };
    
    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
        {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
