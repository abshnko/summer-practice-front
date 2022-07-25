import s from './History.module.scss';
import close from '../../static/img/close_icon.svg';
import { useEffect, useState } from 'react';
import { getImages } from '../../api/api_calls';
import React from 'react';
import { motion } from 'framer-motion';

interface IHistory {
  id: string;
  image: string;
  text: string;
  name: string;
}

const History = ({
  setShowHistory,
  history,
}: {
  setShowHistory: any;
  history: IHistory[];
}) => {
  //   useEffect(() => {
  //     console.log(history);
  //   }, [history]);

  const onSelect = () => {
    return 0;
  };

  if (history.length < 1) {
    return (
      <div className={s.container}>
        <div className={s.title_container}>
          <div className={s.title}>История</div>
          <div onClick={() => setShowHistory(false)} className={s.close}>
            <img src={close} alt="close" />
          </div>
        </div>
        <div className={s.placeholder_cont}>
          <div className={s.placeholder}>Здесь пока пусто</div>
        </div>
      </div>
    );
  }
  return (
    <motion.div
      key="mobile nav"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        x: [-150, 0],
      }}
      transition={{
        duration: 0.2,
        type: 'spring',
      }}
      //   exit={{ x: [0, -50] }}
      className={s.container}
    >
      <div className={s.title_container}>
        <div className={s.title}>История</div>
        <div onClick={() => setShowHistory(false)} className={s.close}>
          <img src={close} alt="close" />
        </div>
      </div>
      <div className={s.items}>
        {history
          .slice(0)
          .reverse()
          .map((item) => {
            return (
              <div className={s.item} key={item.id}>
                <div className={s.picture}>
                  <img src={''} alt={''} />
                  <div>{item.name}</div>
                </div>
                <div className={s.text}>{item.text}</div>
              </div>
            );
          })}
      </div>
    </motion.div>
  );
};

export default React.memo(History);
