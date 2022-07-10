import s from './Input.module.scss';

const Input = ({
  handleChange,
}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <label htmlFor="upload_photo">Выберите изображение</label>
      <input
        className={s.upload_photo}
        itemID="upload-photo"
        type="file"
        accept="image/*"
        name="photo"
        id="upload_photo"
        onChange={(e) => handleChange(e)}
      />
    </>
  );
};

export default Input;
