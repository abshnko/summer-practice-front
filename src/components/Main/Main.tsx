import { useEffect, useState } from 'react';
import s from './Main.module.scss';
import arrow from '../../static/img/arrow.svg';
import placeholder_light from '../../static/img/placeholder_light.svg';
import placeholder_dark from '../../static/img/placeholder_dark.svg';
import Input from '../UI/Input.file/Input.file';
import { convertImageToTextMock } from '../../api/api_calls';

const Main = ({ theme }: { theme: string }) => {
  const [text, setText] = useState<string>();
  const [file, setFile] = useState<File>();
  const [filePreview, setFilePreview] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //полчему ts игнорирует проверку на null?
    if (e !== null && e) {
      setFilePreview(URL.createObjectURL(e!.target!.files![0]));
      setFile(e!.target!.files![0]);
    }
  };

  useEffect(() => {
    if (file) {
      console.log('Файл загружен');
      const formData = new FormData();
      formData.append('image', file, file.name);
      console.log(`Файл подготовлен для отправки на api: `);
      console.log(formData.getAll('image'));
      convertImageToTextMock().then((res) => {
        console.log(`Получен ответ от api: ${res.data[0].text}`);
        setText(res.data[0].text);
      });
    }
  }, [file]);

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
