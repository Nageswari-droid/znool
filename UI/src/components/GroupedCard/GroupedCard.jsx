import React from "react";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import { CANCEL, CONFIRM, MODAL_TITLE } from "../../constants/string";

const GroupedCard = ({
  groupKey,
  booksObj,
  onDeleteHandler,
  modalOpen,
  handleCancelDelete,
  handleConfirmDelete,
}) => {
  return (
    <div
      className="author-group-section"
      role="region"
      aria-labelledby={`author-title-${groupKey}`}
    >
      <h2
        className="author-group-title"
        id={`author-title-${groupKey}`}
        tabIndex={0}
      >
        {groupKey}
      </h2>
      <div
        className="books-grid"
        role="list"
        aria-label={`Books by ${groupKey}`}
        aria-labelledby={`author-title-${groupKey}`}
      >
        {Object.entries(booksObj).map(([id, book]) => (
          <Card
            key={id}
            book={book}
            id={id}
            onDeleteHandler={onDeleteHandler}
          />
        ))}
        {modalOpen && (
          <Modal
            title={MODAL_TITLE}
            optionOne={CONFIRM}
            optionTwo={CANCEL}
            handleCancelDelete={handleCancelDelete}
            handleConfirmDelete={handleConfirmDelete}
          />
        )}
      </div>
    </div>
  );
};

export default GroupedCard;
