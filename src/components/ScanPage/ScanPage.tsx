import { useCallback, useEffect, useState } from 'react';
import s from './ScanPage.module.scss';
import arrow from '../../static/img/arrow.svg';
import placeholder_light from '../../static/img/placeholder_light.svg';
import placeholder_dark from '../../static/img/placeholder_dark.svg';
import Input from '../UI/Input.file/Input.file';
import { getImages, uploadImage } from '../../api/api_calls';
import { uid } from '../../utils/utils';
import Button from '../UI/Button/Button';
import Layout from '../Layout';
import { useThemeContext } from '../../context/theme.context';
import History from '../History/History';
import { useDropzone } from 'react-dropzone';

interface IHistory {
  id: string;
  image: string;
  text: string;
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
      uploadImage(file, uid()).then((res) => {
        console.log('File uploaded. Response: ', res);
        //! add refetch of history
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

  //   useEffect(() => {
  //     console.log(history);
  //   }, [history]);

  return (
    <Layout>
      <main className={s.container}>
        {showHistory && (
          <History history={history} setShowHistory={setShowHistory} />
        )}
        <div
          className={`${s.input} ${isDragActive && s.drag_active}`}
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

                <div className={s.optional_text}>?????? ???????????????????? ????????</div>
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
          <Button onClick={() => onScan()}>??????????????????????</Button>
          {showWarn && <div className={s.warn}>???????????????? ??????????????????????</div>}
        </div>
        <div className={s.output}>
          <div
            className={`${s.border} ${s.border_no_dash} ${
              text && s.border_text
            }`}
          >
            {!file ? (
              <div className={s.placeholder_text}>
                ?????????? ?????????? ?????????????????? ?????????????????????? ???? ?????????????????????? ???????????? ??
                ????????????????...
              </div>
            ) : (
              text && <div className={s.return_text}>{text}</div>
            )}
          </div>
        </div>
        <div onClick={() => setShowHistory(true)} className={s.history_btn}>
          ??????????????
        </div>
      </main>
    </Layout>
  );
};

export default ScanPage;
