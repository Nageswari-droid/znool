/**
 * GroupedCard component for displaying a group of book cards (e.g., by author or genre).
 *
 * Renders a group title and a grid of cards, with a delete modal for each group.
 */
import React from "react";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import { CANCEL, CONFIRM, MODAL_TITLE } from "../../constants/string";

/**
 * GroupedCard component for displaying a group of book cards.
 * @component
 * @param {Object} props
 * @param {string} props.groupKey - The group title (e.g., author or genre)
 * @param {Object} props.booksObj - Books in the group (id -> book object)
 * @param {Function} props.onDeleteHandler - Handler for delete action
 * @param {boolean} props.modalOpen - Whether the delete modal is open
 * @param {Function} props.handleCancelDelete - Handler to cancel delete
 * @param {Function} props.handleConfirmDelete - Handler to confirm delete
 * @returns {JSX.Element}
 */
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
