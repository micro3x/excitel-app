import { useRef, useEffect, CSSProperties } from 'react';
import { Title } from '../Title';
import './styles.scss';

export default function Modal({
  children,
  onClose,
  titleText,
  show,
  styles,
  cssClass,
  noCloseIcon,
}: {
  children?: React.ReactNode;
  onClose: () => void;
  titleText?: string;
  show?: boolean;
  styles?: CSSProperties;
  cssClass?: string;
  noCloseIcon?: boolean;
}) {
  const modalElement = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    if (modalElement.current) {
      modalElement.current.classList.add('hide-modal');
    }
    setTimeout(onClose, 350);
  };

  // we want the user to have ability to close it by pressing ESC ..
  useEffect(() => {
    const listenOnKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && document.activeElement?.tagName !== 'INPUT') {
        closeModal();
      }
    };

    if (show) {
      document.addEventListener('keyup', listenOnKeyPress);
    }
    return () => {
      document.removeEventListener('keyup', listenOnKeyPress);
    };
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <>
      <div className="modal-bg" onClick={closeModal}></div>
      <div
        className={'modal' + (cssClass ? ' ' + cssClass : '')}
        ref={modalElement}
        style={styles}
      >
        {titleText && <Title size="big">{titleText || 'Modal'}</Title>}
        <div className="modal-content">{children}</div>
        {!noCloseIcon && (
          <button className="close-icon" onClick={closeModal}>
            ✖️
          </button>
        )}
      </div>
    </>
  );
}
