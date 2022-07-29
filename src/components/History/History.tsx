import s from './History.module.scss';
import close from '../../static/img/close_icon.svg';
import { useEffect, useState } from 'react';
import { getImageById, getNextImages } from '../../api/api_calls';
import { motion } from 'framer-motion';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useForceUpdate } from '../../utils/hooks';
import ClipLoader from 'react-spinners/ClipLoader';

interface IHistory {
  file_id: number;
  image: string;
  text: string;
  name: string;
}

interface IImage {
  file_id: number;
  image: string;
}

const History = ({
  setShowHistory,
  history,
  selectFromHistory,
}: {
  setShowHistory: React.Dispatch<React.SetStateAction<boolean>>;
  history: IHistory[];
  setHistory: React.Dispatch<React.SetStateAction<IHistory[]>>;
  selectFromHistory: (id: number) => void;
}) => {
  const [images, setImages] = useState<IImage[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  let index = history.length - 7;
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const newImages: IImage[] = [];

    history.slice(history.length - 7, history.length).forEach((item) => {
      getImageById(item.file_id).then((res) => {
        const blob = URL.createObjectURL(res.data);
        newImages.push({ file_id: item.file_id, image: blob });
      });
      setImages(newImages);
    });

    setTimeout(() => {
      setImagesLoaded(true);
    }, 2000);
  }, []);

  useEffect(() => {
    forceUpdate();
  }, [history]);

  const fetchData = async () => {
    if (index >= 7) {
      const { data } = await getNextImages(index - 7, 7);
      const newImages: IImage[] = [];
      data.forEach((item: IImage) => {
        getImageById(item.file_id).then((res) => {
          const blob = URL.createObjectURL(res.data);
          newImages.push({ file_id: item.file_id, image: blob });
        });
      });
      index = index - 7;
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  if (history.length < 1) {
    return (
      <motion.div
        key="history"
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
        exit={{ x: [0, -150], opacity: [1] }}
        className={s.container}
      >
        <div className={s.title_container}>
          <div className={s.title}>История</div>
          <div onClick={() => setShowHistory(false)} className={s.close}>
            <img src={close} alt="close" />
          </div>
        </div>
        <div className={s.placeholder_cont}>
          <div className={s.placeholder}>Здесь пока пусто</div>
        </div>
      </motion.div>
    );
  }
  if (!imagesLoaded)
    return (
      <motion.div
        key="history"
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
        exit={{ x: [0, -150], opacity: [1] }}
        className={s.container}
      >
        <ClipLoader color="#757575" />
      </motion.div>
    );
  return (
    <motion.div
      key="history"
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
      exit={{ x: [0, -150], opacity: [1, 0.5, 0] }}
      className={s.container}
      id="scrollableDiv"
    >
      <div className={s.title_container}>
        <div className={s.title}>История</div>
        <div onClick={() => setShowHistory(false)} className={s.close}>
          <img src={close} alt="close" />
        </div>
      </div>
      <div className={s.items}>
        <InfiniteScroll
          dataLength={history.length}
          next={fetchData}
          scrollableTarget="scrollableDiv"
          hasMore={true}
          loader={<ClipLoader />}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {images
            .slice(0)
            .reverse()
            .map((image) => {
              const text = history.filter(
                (item) => item.file_id === image.file_id
              )[0].text;
              return (
                <div
                  key={image.file_id}
                  className={s.item}
                  onClick={() => selectFromHistory(image.file_id)}
                >
                  <div className={s.picture_container}>
                    <img
                      src={image.image}
                      className={s.picture}
                      alt="image"
                      loading="lazy"
                    />
                    <div className={s.pic_text}>
                      {text
                        ? `${text.slice(0, 50)}...`
                        : 'Текст пока не распознан'}
                    </div>
                  </div>
                </div>
              );
            })}
        </InfiniteScroll>
      </div>
    </motion.div>
  );
};

export default History;
