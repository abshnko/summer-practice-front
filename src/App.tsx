import ScanPage from './components/ScanPage/ScanPage';
import Layout from './components/Layout';
import InfoPage from './components/InfoPage/InfoPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useThemeContext } from './context/theme.context';

function App() {
  const { theme } = useThemeContext();

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
