import ReactDOM from 'react-dom';
import { Button } from 'components';
import { joinClassNames } from 'modules/arrays';
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
  const getShowTypeClass = (type: 'modal' | 'backdrop') => {
    if (isOpen) {
      if (type === 'modal') {
        if (showWithDelay) {
          return styles.showDelayedModal;
        }
        return styles.showModal;
      }

      if (type === 'backdrop') {
        if (showWithDelay) {
          return styles.showBackdropWithDelay;
        }
        return styles.showBackdrop;
      }
    }
    return styles.hide;
  };

  const content = (
    <div
      className={joinClassNames([
        styles.backdrop,
        getShowTypeClass('backdrop'),
      ])}
      onClick={onClose}
    >
      <div
        className={joinClassNames([styles.modal, getShowTypeClass('modal')])}
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
