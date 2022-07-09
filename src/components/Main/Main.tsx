import { useState } from 'react';
import Button from '../UI/Button/Button';
import s from './Main.module.scss';
import arrow from '../../static/img/arrow.svg';
import placeholder_light from '../../static/img/placeholder_light.svg';
import placeholder_dark from '../../static/img/placeholder_dark.svg';

const Main = ({ theme }: { theme: string }) => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  return (
    <main className={s.container}>
      <div className={s.input}>
        <div className={`${s.border} ${s.border_dashed}`}>
          <img
            src={theme === 'light' ? placeholder_light : placeholder_dark}
            alt="asd"
          />
          <Button text={'Выберите изображение'} />
          <div className={s.optional_text}>или перетащите сюда</div>
        </div>
      </div>
      <div className={s.arrow}>
        <img src={arrow} alt="" />
      </div>
      <div className={s.output}>
        <div className={`${s.border} ${s.border_no_dash}`}>
          {showPlaceholder && (
            <div className={s.placeholder_text}>
              Здесь будет результат конвертации из рукописного текста в
              печатный...
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Main;
