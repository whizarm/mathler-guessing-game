import React from 'react';
import ReactDOM from 'react-dom';
import { joinClassNames } from 'modules/arrays';
import styles from './ErrorToast.module.scss';

export interface ErrorToastProps {
  error?: string;
}

export const ErrorToast: React.FC<ErrorToastProps> = ({ error = '' }) => {
  const content = (
    <div className={joinClassNames([styles.toast, [!error, styles.hide]])}>
      {error}
    </div>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById('error-toast') as Element,
  );
};
