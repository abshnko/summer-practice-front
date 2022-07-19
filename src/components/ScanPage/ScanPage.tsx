import { useEffect, useState } from 'react';
import s from './ScanPage.module.scss';
import arrow from '../../static/img/arrow.svg';
import placeholder_light from '../../static/img/placeholder_light.svg';
import placeholder_dark from '../../static/img/placeholder_dark.svg';
import Input from '../UI/Input.file/Input.file';
import { uploadImage } from '../../api/api_calls';
import { uid } from '../../utils/utils';
import Button from '../UI/Button/Button';
import useLocalStorage from 'use-local-storage';
import Layout from '../Layout';
import { useThemeContext } from '../../context/theme.context';

const ScanPage = () => {
  const [text, setText] = useState<string>();
  const [showWarn, setShowWarn] = useState(false);
  const [file, setFile] = useState<File>();
  const [filePreview, setFilePreview] = useState<string>();
  const [history, setHistory] = useLocalStorage('history', []);
  const { theme } = useThemeContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setFilePreview(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    }
  };

  const onScan = () => {
    if (file) {
      uploadImage(file, uid()).then((res) => {
        console.log('File uploaded. Response: ', res);
      });
    } else {
      setShowWarn(true);
    }
  };

  useEffect(() => {
    if (file) {
      setShowWarn(false);
    }
  }, [file]);

  return (
    <Layout>
      <main className={s.container}>
        <div className={s.input}>
          <div
            className={`${s.border} ${s.border_dashed} ${
              file && s.border_selected
            }`}
          >
            {!file ? (
              <>
                <img
                  className={s.img_placeholder}
                  src={theme === 'light' ? placeholder_light : placeholder_dark}
                  alt="asd"
                />
                <Input handleChange={handleChange} />

                <div className={s.optional_text}>или перетащите сюда</div>
              </>
            ) : (
              <>
                <img className={s.img_selected} src={filePreview} alt="" />
                {/* <img src={imageFromApi().then((res)=>res.data)} alt="" /> */}
                <Input handleChange={handleChange} />
              </>
            )}
          </div>
        </div>
        <div className={s.arrow}>
          {/* <img src={arrow} alt="arrow" /> */}
          <Button onClick={() => onScan()}>Сканировать</Button>
          {showWarn && <div className={s.warn}>Выберите изображение</div>}
        </div>
        <div className={s.output}>
          <div
            className={`${s.border} ${s.border_no_dash} ${
              text && s.border_text
            }`}
          >
            {!file ? (
              <div className={s.placeholder_text}>
                Здесь будет результат конвертации из рукописного текста в
                печатный...
              </div>
            ) : (
              text && <div className={s.return_text}>{text}</div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ScanPage;
