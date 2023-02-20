import type { ModalSizes } from "flowbite-react";
import { Modal as ModalUI } from "flowbite-react";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import PrimaryButton from "./PrimaryButton";

const wrapperId = "modal-root";

interface IProps {
  children: React.ReactNode;
  onClose: () => void;
  size?: keyof ModalSizes;
  closeButton?: boolean;
}

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

const SimpleModal: React.FC<IProps> = ({
  children,
  onClose,
  size,
  closeButton,
}) => {
  useEffect(() => {
    const closeOnEscKey = (ev: KeyboardEvent) =>
      ev.key === "Escape" && onClose();

    document.body.addEventListener("keydown", closeOnEscKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscKey);
    };
  }, [onClose]);
  return (
    <div>
      <h1>modal</h1>
      <ModalUI show size={size || "2xl"} popup onClose={onClose}>
        <ModalUI.Header />
        <ModalUI.Body>
          <div style={{ maxHeight: "80vh", overflow: "auto" }}>{children}</div>
          {closeButton && (
            <>
              <hr className="my-4" />
              <PrimaryButton fullSized size="sm" onClick={onClose}>
                Cerrar
              </PrimaryButton>
            </>
          )}
        </ModalUI.Body>
      </ModalUI>
    </div>
  );
};

const Modal: React.FC<IProps> = (props) => {
  let modalRoot = document.getElementById(wrapperId);

  if (!modalRoot) {
    modalRoot = createWrapperAndAppendToBody(wrapperId);
  }

  return createPortal(<SimpleModal {...props} />, modalRoot);
};

export default Modal;
