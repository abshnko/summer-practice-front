import { useCallback, useEffect, useState } from 'react';
import s from './ScanPage.module.scss';
import placeholder_light from '../../static/img/placeholder_light.svg';
import placeholder_dark from '../../static/img/placeholder_dark.svg';
import Input from '../UI/Input.file/Input.file';
import {
  getImageById,
  getImageInfoById,
  getImages,
  predictText,
  uploadImage,
} from '../../api/api_calls';
import { uid } from '../../utils/utils';
import Button from '../UI/Button/Button';
import Layout from '../Layout';
import { useThemeContext } from '../../context/theme.context';
import History from '../History/History';
import { useDropzone } from 'react-dropzone';
import copy from '../../static/img/copy.svg';
import { AnimatePresence, motion } from 'framer-motion';
import { useForceUpdate } from '../../utils/hooks';
import ClipLoader from 'react-spinners/ClipLoader';

interface IHistory {
  file_id: number;
  image: string;
  text: string;
  name: string;
}
const ScanPage = () => {
  const [text, setText] = useState<string>();
  const [showWarn, setShowWarn] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyGone, setHistoryGone] = useState(true);
  const [textCopied, setTextCopied] = useState(false);
  const [textLoading, setTextLoading] = useState(false);
  const [file, setFile] = useState<File>();
  const [filePreview, setFilePreview] = useState<string>();
  const { theme } = useThemeContext();
  const [history, setHistory] = useState<IHistory[]>([]);
  const forceUpdate = useForceUpdate();
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
      setTextLoading(true);
      const fileId = uid();
      uploadImage(file, fileId).then((res) => {
        predictText(fileId).then((res) => {
          setText(res.data.text);
          setTextLoading(false);
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
    forceUpdate();
  }, [history]);

  useEffect(() => {
    if (!showHistory) {
      setTimeout(() => {
        setHistoryGone(true);
      }, 190);
    } else {
      setHistoryGone(false);
    }
  }, [showHistory]);

  const selectFromHistory = (id: number) => {
    getImageInfoById(id)
      .then((res) => {
        setText(res.data[0].text);
      })
      .catch((err) => {
        setText('');
      });
    getImageById(id).then((res) => {
      const blob = URL.createObjectURL(res.data);
      setFilePreview(blob);
    });
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

  useEffect(() => {
    if (textCopied) {
      setTimeout(() => {
        setTextCopied(false);
      }, 3000);
    }
  }, [textCopied]);

  return (
    <Layout>
      <main className={`${s.container} ${!historyGone ? s.with_history : ''} `}>
        <AnimatePresence>
          {showHistory && (
            <History
              history={history}
              setHistory={setHistory}
              setShowHistory={setShowHistory}
              selectFromHistory={selectFromHistory}
            />
          )}
        </AnimatePresence>
        <div
          className={`${s.input} ${isDragActive ? s.drag_active : ''}`}
          {...getRootProps()}
        >
          <div
            className={`${s.border} ${s.border_dashed} ${
              file ? s.border_selected : ''
            }`}
          >
            {!file && !filePreview ? (
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
              text ? s.border_text : ''
            }`}
          >
            {!file && !filePreview ? (
              <div className={s.placeholder_text}>
                Здесь будет результат конвертации из рукописного текста в
                печатный...
              </div>
            ) : textLoading ? (
              <ClipLoader color="#757575" />
            ) : (
              text && (
                <div className={s.return_text}>
                  <div
                    className={s.copy_icon_container}
                    onClick={() => {
                      navigator.clipboard.writeText(text);
                      setTextCopied(true);
                    }}
                  >
                    <AnimatePresence>
                      {textCopied && (
                        <motion.div
                          key="copied"
                          initial={{
                            opacity: 0,
                          }}
                          animate={{
                            opacity: 1,
                            scale: [0.8, 0.9, 1, 1.1, 1, 0.9, 1],
                          }}
                          transition={{
                            duration: 0.2,
                            type: 'spring',
                          }}
                          exit={{
                            opacity: [0.5, 0],
                            x: [0, -100],
                          }}
                          className={s.copied_text}
                        >
                          Текст скопирован!
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <img className={s.copy_icon} src={copy} alt="" />
                  </div>
                  <div className={s.text}>{text}</div>
                </div>
              )
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ScanPage;
