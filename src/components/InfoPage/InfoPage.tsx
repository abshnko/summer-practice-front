import { Link } from 'react-router-dom';
import { switchTheme } from '../../utils/utils';
import Layout from '../Layout';
import Button from '../UI/Button/Button';
import s from './InfoPage.module.scss';

const InfoPage = () => {
  return (
    <Layout>
      <main className={s.container}>
        <div className={s.wrapper}>
          <div>
            <div className={s.title_container}>
              <div className={s.title}>
                Как перевести рукописный текст в печатный?
              </div>
              <div className={s.info}>
                Все просто: загрузите изображение с рукописным текстом и нажмите
                кнопку &quot;Сканировать&quot;
              </div>
            </div>
          </div>
          <Link to="/scan">
            <Button>Начать</Button>
          </Link>
        </div>
      </main>
    </Layout>
  );
};

export default InfoPage;
