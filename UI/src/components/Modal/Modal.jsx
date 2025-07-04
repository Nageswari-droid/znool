/**
 * Modal component for confirming or cancelling actions (e.g., delete).
 *
 * Displays a dialog with two options and handles confirm/cancel actions.
 */
import React from "react";
import { Button, Typography, Utility } from "@visa/nova-react";

/**
 * Modal component for confirming or cancelling actions.
 * @component
 * @param {Object} props
 * @param {string} props.title - Title of the modal
 * @param {string} props.optionOne - Label for the confirm button
 * @param {string} props.optionTwo - Label for the cancel button
 * @param {Function} props.handleConfirmDelete - Handler for confirm action
 * @param {Function} props.handleCancelDelete - Handler for cancel action
 * @returns {JSX.Element}
 */
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
