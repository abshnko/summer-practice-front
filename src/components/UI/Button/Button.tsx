import s from './Button.module.scss';

export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {}

const Button = (props: ButtonProps) => {
  const { children, ...rest } = props;
  return (
    <button className={s.button} {...rest}>
      {children}
    </button>
  );
};

export default Button;
