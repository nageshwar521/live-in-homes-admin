import React from "react";
import styled from "@emotion/styled";
import {
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/CloseOutlined";

const StyledModal = styled(Dialog)`
  .cafe-modal-paper {
    width: 100%;
  }
`;

const DialogCloseButton = styled(IconButton)`
  position: absolute !important;
  top: 10px;
  right: 10px;
`;

const StyledDialogContent = styled(DialogContent)`
  padding-top: 20px !important;
`;

export interface ModalProps {
  title: string;
  isOpen: boolean;
  children: any;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, children, onClose }) => {
  const handleDialogClose = () => {
    onClose();
  };
  return (
    <StyledModal
      classes={{ paper: "cafe-modal-paper" }}
      disableEscapeKeyDown
      open={isOpen}
    >
      <DialogCloseButton onClick={handleDialogClose}>
        <CloseIcon />
      </DialogCloseButton>
      <DialogTitle>{title}</DialogTitle>
      <StyledDialogContent>
        <DialogContentText>{children}</DialogContentText>
      </StyledDialogContent>
    </StyledModal>
  );
};

export default Modal;
