export const switchTheme = (
  theme: string,
  setTheme: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
};
