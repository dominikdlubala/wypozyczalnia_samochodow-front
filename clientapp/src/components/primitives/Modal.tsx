import { ReactNode } from "react";
import { createPortal } from "react-dom"

interface ModalProps {
    children: ReactNode;
    modalClose: () => void;  
}

export default function Modal({ children, modalClose }: ModalProps) {

    const modalContainer = document.querySelector('.modal-container') as Element; 

    return createPortal(
        <div className="modal-background">
            <div className="modal-wrapper">
                <button className="btn-modal--close" onClick={modalClose}>x</button>
                {children}
            </div>
        </div>,
    modalContainer)
}