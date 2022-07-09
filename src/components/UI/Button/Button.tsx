import s from './Button.module.scss';

const Button = ({ text }: { text: string }) => {
  return <button className={s.button}>{text}</button>;
};

export default Button;
