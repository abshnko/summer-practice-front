import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import useLocalStorage from 'use-local-storage';
import { switchTheme } from './utils/utils';

function App() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage(
    'theme',
    defaultDark ? 'dark' : 'light'
  );

  return (
    <div className="App" data-theme={theme}>
      <Navbar switchTheme={() => switchTheme(theme, setTheme)} theme={theme} />
      <Main theme={theme} />
    </div>
  );
}

export default App;
