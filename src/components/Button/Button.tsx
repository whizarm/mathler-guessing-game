import styles from './Button.module.scss';

type ButtonProps = {
  children: JSX.Element;
  onClick: () => void;
  className?: string;
};

export const Button = ({ children, onClick, className = '' }: ButtonProps) => (
  <button className={[styles.button, className].join(' ')} onClick={onClick}>
    {children}
  </button>
);
