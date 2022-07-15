export const switchTheme = (
  theme: string,
  setTheme: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
};

//create unique id
export const uid = () => {
  return (
    Date.now() +
    Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12))
  );
};
