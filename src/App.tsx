import ScanPage from './components/ScanPage/ScanPage';
import useLocalStorage from 'use-local-storage';
import { switchTheme } from './utils/utils';
import Layout from './components/Layout';
import InfoPage from './components/InfoPage/InfoPage';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import { useContext } from 'react';
import { useThemeContext } from './context/theme.context';

function App() {
  //   const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  //   const [theme, setTheme] = useLocalStorage(
  //     'theme',
  //     defaultDark ? 'dark' : 'light'
  //   );
  const { theme } = useThemeContext();
  console.log('THEME: ', theme);

  return (
    <BrowserRouter>
      <div className="App" data-theme={theme}>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <InfoPage />
              </Layout>
            }
          ></Route>

          <Route path="/scan" element={<ScanPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
