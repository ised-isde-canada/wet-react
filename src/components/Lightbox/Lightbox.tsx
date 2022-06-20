import React from 'react';
import ModalRB from 'react-bootstrap/Modal';
import './Lightbox.css';
import '../../style.css';

export interface LightboxProps extends React.HTMLAttributes<HTMLElement> {
  /** title of lightbox */
  title?: string;
  /** link(s) to the lightbox(es) image(s) */
  src?: string;
  /** use to hide lightbox, recommended for galleries where you want to only show the first image */
  hidden?: boolean;
  /** use to convert all lightbox text to french */
  french?: boolean;
  /** content of Lightbox */
  children?: React.ReactNode;
}

const Lightbox = ({
  title = '',
  src = '',
  hidden = false,
  french = false,
  children,
}: LightboxProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <span className="lightbox-breezy">
      <a
        href={src}
        title={title}
        hidden={hidden}
        onClick={(e) => {
          e.preventDefault();
          const gallery = (e.target as Element).closest('.lbx-gal');
          if (!gallery) {
            setIsOpen(true);
          }
        }}
      >
        {children}
      </a>
      <ModalRB
        size="xl"
        show={isOpen}
        centered // supposed to center it, but css class doesn't exist...
        animation={false}
        backdropClassName="mfp-zoom-out-cur" // supposed to add cursor: zoom-out, but broken bc it's behind lightbox div (siblings, lower z-index)
        onHide={() => setIsOpen(false)}
        className="mfp-zoom-out-cur"
      >
        <ModalRB.Body bsPrefix="bg-darker" style={{ cursor: 'auto' }}>
          <button
            title={
              french
                ? "Fermer la fenêtre superposée (touche d'échappement)"
                : 'Close overlay (escape key)'
            }
            type="button"
            className="mfp-close"
            onClick={() => setIsOpen(false)}
            style={{ width: 'auto' }}
          >
            ×
            <span className="wb-inv">
              {french
                ? " Fermer la fenêtre superposée (touche d'échappement)"
                : ' Close overlay (escape key)'}
            </span>
          </button>
          <img className="mfp-img" src={src} alt="alternate" />
          <figcaption>
            <div className="mfp-bottom-bar" id="lbx-title">
              <div className="mfp-title">{title}</div>
              <div className="mfp-counter" />
            </div>
          </figcaption>
        </ModalRB.Body>
      </ModalRB>
    </span>
  );
};

export default Lightbox;
