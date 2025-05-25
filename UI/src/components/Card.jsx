import {
  Button,
  ContentCard,
  ContentCardBody,
  ContentCardSubtitle,
  ContentCardTitle,
  Typography,
  Utility,
} from "@visa/nova-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CANCEL,
  DELETE,
  EDIT,
  MODAL_TITLE,
  YEAR,
  CONFIRM,
} from "../constants/string";
import Modal from "./Modal";
import { useBooksContext } from "../context/booksContext";

const Card = () => {
  const naviagte = useNavigate();
  const { books, deleteBook } = useBooksContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const handleDeleteClick = (id) => {
    setBookToDelete(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteBook(bookToDelete);
    setModalOpen(false);
    setBookToDelete(null);
  };

  const handleCancelDelete = () => {
    setModalOpen(false);
    setBookToDelete(null);
  };

  return (
    <div className="books-grid" role="list" aria-label="Book list">
      {Object.entries(books).map(([id, book]) => (
        <ContentCard role="listitem" key={id} className="book-card">
          <Utility element={<ContentCardBody />} vFlex vFlexCol vGap={4}>
            <ContentCardTitle variant="headline-4">
              {book.title}
            </ContentCardTitle>
            <ContentCardSubtitle
              className="truncate-2-lines"
              variant="subtitle-3"
            >
              {book.author}
            </ContentCardSubtitle>
            <Typography className="v-pt-4">
              {YEAR} {book.year} <br />
              {book.genre}
            </Typography>
            <Typography className="v-pt-4 truncate-2-lines" variant="body-2">
              {book.description}
            </Typography>
            <Utility
              vAlignItems="center"
              vFlex
              vFlexWrap
              vGap={16}
              vPaddingTop={12}
            >
              <Button
                size="small"
                colorScheme="primary"
                onClick={() => naviagte(`/edit-book/${id}`)}
              >
                {EDIT}
              </Button>
              <Button
                size="small"
                colorScheme="destructive"
                onClick={() => handleDeleteClick(id)}
              >
                {DELETE}
              </Button>
            </Utility>
          </Utility>
        </ContentCard>
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
  );
};

export default Card;
