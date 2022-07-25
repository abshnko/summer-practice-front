import { useCallback, useEffect, useState } from 'react';
import s from './ScanPage.module.scss';
import arrow from '../../static/img/arrow.svg';
import placeholder_light from '../../static/img/placeholder_light.svg';
import placeholder_dark from '../../static/img/placeholder_dark.svg';
import Input from '../UI/Input.file/Input.file';
import { getImages, predictText, uploadImage } from '../../api/api_calls';
import { uid } from '../../utils/utils';
import Button from '../UI/Button/Button';
import Layout from '../Layout';
import { useThemeContext } from '../../context/theme.context';
import History from '../History/History';
import { useDropzone } from 'react-dropzone';
import { AnimatePresence } from 'framer-motion';

interface IHistory {
  id: string;
  image: string;
  text: string;
  name: string;
}
const ScanPage = () => {
  const [text, setText] = useState<string>();
  const [showWarn, setShowWarn] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [file, setFile] = useState<File>();
  const [filePreview, setFilePreview] = useState<string>();
  const { theme } = useThemeContext();
  const [history, setHistory] = useState<IHistory[]>([]);
  const validator = () => {
    return undefined;
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles) {
      setFilePreview(URL.createObjectURL(acceptedFiles[0]));
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    multiple: false,
    validator: validator(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setFilePreview(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    }
  };

  const onScan = () => {
    if (file) {
      const fileId = uid();
      uploadImage(file, fileId).then((res) => {
        console.log('File uploaded. Response: ', res);
        predictText(fileId).then((res) => {
          console.log('RETURNED PREDICT: ', res);
        });
        getImages().then((res) => {
          setHistory(res.data);
        });
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

  useEffect(() => {
    getImages().then((res) => {
      setHistory(res.data);
    });
  }, []);

  return (
    <Layout>
      <main className={`${s.container} ${showHistory ? s.with_history : ''}`}>
        {/* <AnimatePresence> */}
        {showHistory && (
          <History history={history} setShowHistory={setShowHistory} />
        )}
        {/* </AnimatePresence> */}
        <div
          className={`${s.input} ${isDragActive ? s.drag_active : ''}`}
          {...getRootProps()}
        >
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
                <Input handleChange={handleChange} />
              </>
            )}
          </div>
        </div>
        <div className={s.arrow}>
          <Button onClick={() => onScan()}>Сканировать</Button>
          {showWarn && <div className={s.warn}>Выберите изображение</div>}
          <div onClick={() => setShowHistory(true)} className={s.history_btn}>
            История
          </div>
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
        {/* <div onClick={() => setShowHistory(true)} className={s.history_btn}>
          История
        </div> */}
      </main>
    </Layout>
  );
};

export default ScanPage;
