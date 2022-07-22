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
    parseInt(Date.now().toString().slice(0, 5)) +
    Math.floor(Math.pow(10, 4) + Math.random() * 9 * Math.pow(10, 2))
  );
};
