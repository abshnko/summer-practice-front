import { useEffect, useState } from 'react';
import s from './Main.module.scss';
import arrow from '../../static/img/arrow.svg';
import placeholder_light from '../../static/img/placeholder_light.svg';
import placeholder_dark from '../../static/img/placeholder_dark.svg';
import Input from '../UI/Input.file/Input.file';

const Main = ({ theme }: { theme: string }) => {
  const [text, setText] = useState<string>();
  const [file, setFile] = useState<File>();
  const [filePreview, setFilePreview] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e !== null && e) {
      setFilePreview(URL.createObjectURL(e!.target!.files![0]));
      setFile(e!.target!.files![0]);
    }
  };

  useEffect(() => {
    if (file) {
      setText('конвертированный текст');
      console.log('FILE CHANGED');
    }
  }, [file, filePreview]);

  return (
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
              <Input handleChange={handleChange} />
            </>
          )}
        </div>
      </div>
      <div className={s.arrow}>
        <img src={arrow} alt="arrow" />
      </div>
      <div className={s.output}>
        <div
          className={`${s.border} ${s.border_no_dash} ${text && s.border_text}`}
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
  );
};

export default Main;
