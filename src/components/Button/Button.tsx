import { joinClassNames } from 'modules/arrays';
import styles from './Button.module.scss';

type ButtonProps = {
  children: JSX.Element | string;
  onClick: () => void;
  className?: string;
  testId?: string;
};

export const Button = ({
  children,
  onClick,
  className = '',
  testId,
}: ButtonProps) => (
  <button
    className={joinClassNames([styles.button, className])}
    onClick={onClick}
    data-testid={testId}
  >
    {children}
  </button>
);
