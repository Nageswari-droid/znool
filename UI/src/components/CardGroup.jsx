import { useState } from "react";
import { CANCEL, CONFIRM, MODAL_TITLE } from "../constants/string";
import { useBooksContext } from "../context/booksContext";
import Card from "./Card";
import Modal from "./Modal";
import "../styles/DisplayAllBooks.css";

const CardGroup = ({ data, groupBy }) => {
  const { deleteBook } = useBooksContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const handleConfirmDelete = async () => {
    await deleteBook(bookToDelete);
    setModalOpen(false);
    setBookToDelete(null);
  };

  const handleCancelDelete = () => {
    setModalOpen(false);
    setBookToDelete(null);
  };

  const handleDeleteClick = (id) => {
    setBookToDelete(id);
    setModalOpen(true);
  };

  if (groupBy === "author" && typeof Object.values(data)[0] === "object") {
    return (
      <main className="display-books-main" aria-label="All books main content">
        <section
          className="display-books-section"
          aria-label="All books section"
        >
          {Object.entries(data).map(([author, booksObj]) => (
            <div
              key={author}
              className="author-group-section"
              role="region"
              aria-labelledby={`author-title-${author}`}
            >
              <h2
                className="author-group-title"
                id={`author-title-${author}`}
                tabIndex={0}
              >
                {author}
              </h2>
              <div
                className="books-grid"
                role="list"
                aria-label={`Books by ${author}`}
                aria-labelledby={`author-title-${author}`}
              >
                {Object.entries(booksObj).map(([id, book]) => (
                  <Card
                    key={id}
                    book={book}
                    id={id}
                    onDeleteHandler={handleDeleteClick}
                  />
                ))}
              </div>
            </div>
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
        </section>
      </main>
    );
  }

  return (
    <main className="display-books-main" aria-label="All books main content">
      <section className="display-books-section" aria-label="All books section">
        <div className="books-grid" role="list" aria-label="Book list">
          {Object.entries(data).map(([id, book]) => (
            <Card
              key={id}
              book={book}
              id={id}
              onDeleteHandler={handleDeleteClick}
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
      </section>
    </main>
  );
};

export default CardGroup;
