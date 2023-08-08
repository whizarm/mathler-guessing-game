import ReactDOM from 'react-dom';
import { Button } from 'components';
import styles from './Modal.module.scss';

export type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  showWithDelay?: boolean;
};

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  title = '',
  showWithDelay = false,
}) => {
  const content = (
    <div
      className={[
        styles.backdrop,
        isOpen
          ? showWithDelay
            ? styles.showBackdropWithDelay
            : styles.showBackdrop
          : styles.hide,
      ].join(' ')}
      onClick={onClose}
    >
      <div
        className={[
          styles.modal,
          isOpen
            ? showWithDelay
              ? styles.showDelayedModal
              : styles.showModal
            : styles.hide,
        ].join(' ')}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <Button onClick={onClose} className={styles.closeButton}>
            X
          </Button>
        </div>
        {children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById('modal-container') as Element,
  );
};
