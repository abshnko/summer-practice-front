import { createContext, useContext } from 'react';
import useLocalStorage from 'use-local-storage';

type IContext = {
  theme: string;
  setTheme: any;
};

const Context = createContext<IContext>({
  theme: '',
  setTheme: undefined,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage(
    'theme',
    defaultDark ? 'dark' : 'light'
  );

  return (
    <Context.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(Context);
};
