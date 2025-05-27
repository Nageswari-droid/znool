import React from "react";
import { Button, Typography, Utility } from "@visa/nova-react";

const Modal = ({
  title,
  optionOne,
  optionTwo,
  handleConfirmDelete,
  handleCancelDelete,
}) => {
  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      onClick={handleCancelDelete}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <Typography className="modal-content-title" variant="headline-4" as="h3">
          {title}
        </Typography>
        <Utility
          vFlex
          vAlignContent="center"
          vJustifyContent="center"
          vGap={16}
          vPaddingTop={16}
        >
          <Button colorScheme="destructive" onClick={handleConfirmDelete}>
            {optionOne}
          </Button>
          <Button colorScheme="secondary" onClick={handleCancelDelete}>
            {optionTwo}
          </Button>
        </Utility>
      </div>
    </div>
  );
};

export default Modal;
