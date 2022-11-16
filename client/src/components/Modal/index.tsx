import React from "react";
import Modal from "@mui/material/Modal";

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  onOk?: () => void;
  onCancel?: () => void;
}
const ModalComponent = ({ isOpen }: Props) => {
  return (
    <Modal open={isOpen}>
      <>aaaaaaaaaaaaa</>
    </Modal>
  );
};

export default ModalComponent;
