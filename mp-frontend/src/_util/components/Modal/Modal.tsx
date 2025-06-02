import React from "react";
import "./modal.style.css";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children, title }) => {
    if (!open) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Cerrar modal">
                    ×
                </button>
                {title && <h2 className="modal-title">{title}</h2>}
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;