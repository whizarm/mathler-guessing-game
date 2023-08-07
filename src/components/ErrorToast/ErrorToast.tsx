import React from 'react';
import ReactDOM from 'react-dom';
import styles from './ErrorToast.module.scss';

export interface ErrorToastProps {
  error?: string;
}

export const ErrorToast: React.FC<ErrorToastProps> = ({ error = '' }) => {
  const content = (
    <div className={[styles.toast, error ? '' : styles.toast__hide].join(' ')}>
      {error}
    </div>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById('error-toast') as Element,
  );
};
