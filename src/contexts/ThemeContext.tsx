import { createContext  } from 'react';

export type ThemeName = 'defaultAlgorithm' | 'darkAlgorithm';

export interface ThemeValue {
    themeName: ThemeName;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeValue | undefined> (undefined);

 