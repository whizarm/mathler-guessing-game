import styles from './Button.module.scss';

type ButtonProps = {
  children: JSX.Element | string;
  onClick: () => void;
  className?: string;
  isHighlighted?: boolean;
};

export const Button = ({
  children,
  onClick,
  className = '',
  isHighlighted = false,
}: ButtonProps) => (
  <button
    className={[
      styles.button,
      isHighlighted ? styles.highlighted : '',
      className,
    ].join(' ')}
    onClick={onClick}
  >
    {children}
  </button>
);
