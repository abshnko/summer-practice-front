import s from './Navbar.module.scss';
import arrow_small_black from '../../static/img/header_icons/arrow_right_small.svg';
import sun from '../../static/img/header_icons/sun.svg';
import moon from '../../static/img/header_icons/moon.svg';
import tg from '../../static/img/header_icons/telegram.svg';

interface IHeader {
  switchTheme: (theme: string) => void;
  theme: string;
}

const Header = ({ switchTheme, theme }: IHeader) => {
  return (
    <header className={s.navbar}>
      <div className={s.logo}>
        <span className={s.italic_logo}>текст</span>
        <img className={s.arrow_icon} src={arrow_small_black} alt="THEME" />
        <span className={s.regular}>текст</span>
      </div>
      <div className={s.right_side}>
        <div className={s.tg_icon_container}>
          <a href="/">
            <div className={s.tg_icon}>
              <img src={tg} alt="tg" />
            </div>
            <div className={s.tooltip_text}>Telegram bot</div>
          </a>
        </div>

        <div
          onClick={() => switchTheme(theme)}
          className={`${s.theme_icon} ${
            theme === 'light' ? s.theme_icon_light : s.theme_icon_dark
          }`}
        >
          <img src={theme === 'light' ? sun : moon} alt="THEME" />
          <div className={s.tooltip_text}>Изменить тему</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
