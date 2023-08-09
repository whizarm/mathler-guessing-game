import { joinClassNames } from 'modules/arrays';
import styles from './Button.module.scss';

type ButtonProps = {
  children: JSX.Element | string;
  onClick: () => void;
  className?: string;
};

export const Button = ({ children, onClick, className = '' }: ButtonProps) => (
  <button
    className={joinClassNames([styles.button, className])}
    onClick={onClick}
  >
    {children}
  </button>
);
