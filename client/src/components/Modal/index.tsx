import React from "react";
import Modal from "@mui/material/Modal";
import Styled from "./index.style";
import Close from "@mui/icons-material/Close";

interface Props {
  isOpen: boolean;
  title?: string;
  description?: string;
  onClose?: () => void;
  onOk?: () => void;
  onCancel?: () => void;
  cancelText?: string;
  okText?: string;
}
const ModalComponent = ({
  isOpen,
  title,
  description,
  onClose,
  onOk,
  onCancel,
  cancelText = "Cancel",
  okText = "OK",
}: Props) => {
  return (
    <Modal open={isOpen}>
      <Styled.ModalContainer>
        <Styled.ModalChildren>
          <Styled.CloseButton onClick={onClose}>
            <Close />
          </Styled.CloseButton>
          <Styled.ModalTitle>{title}</Styled.ModalTitle>
          <Styled.ModalDescription>{description}</Styled.ModalDescription>
          <div>
            <Styled.OKButton onClick={onOk}>{okText}</Styled.OKButton>
          </div>
          <div>
            <Styled.CancelButton onClick={onCancel}>
              {cancelText}
            </Styled.CancelButton>
          </div>
        </Styled.ModalChildren>
      </Styled.ModalContainer>
    </Modal>
  );
};

export default ModalComponent;
