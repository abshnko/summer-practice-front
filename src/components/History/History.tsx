import s from './History.module.scss';

interface IImage {
  id: string;
  image: string;
  text: string;
}

const History = ({
  history,
  setShowHistory,
}: {
  history: IImage[];
  setShowHistory: any;
}) => {
  console.log(history);

  if (history.length < 1) {
    return <div>Здесь пока пусто</div>;
  }
  return (
    <div className={s.container}>
      <div className={s.left_side}>
        <div onClick={() => setShowHistory(false)}>back</div>
      </div>
      <div className={s.right_side}>
        <div className={s.title}>История</div>
        <div className={s.items}>
          {history.map((item) => {
            return (
              <div className={s.item} key={item.id}>
                <div className={s.picture}>
                  <img src={item.image} alt="" />
                </div>
                <div className={s.text}>{item.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default History;
