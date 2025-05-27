/**
 * Page component for editing an existing book.
 *
 * Provides a form to update book details. Handles loading, validation, and navigation after update.
 */
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBooksContext } from "../../context/booksContext";
import {
  EDIT_WITHOUT_BOOK_SUBTITLE_ONE,
  EDIT_WITHOUT_BOOK_SUBTITLE_TWO,
  EDIT_WITHOUT_BOOK_TITLE,
  UPDATE_BOOK,
} from "../../constants/string";
import BookForm from "../../components/BookForm/BookForm";
import Loading from "../../components/Loading/Loading";
import NoBookFound from "../../components/NoBookFound/NoBookFound";

/**
 * EditBook page for editing an existing book.
 * @component
 * @returns {JSX.Element}
 */
const EditBook = () => {
  const navigate = useNavigate();
  const { books, updateBook, loading } = useBooksContext();
  const { id } = useParams();

  const initalValue = books[id];

  /**
   * Checks if the book data has changed.
   * @param {Object} book - Book data to compare
   * @returns {boolean}
   */
  const isChanged = (book) => {
    return (
      initalValue.title === book.title &&
      initalValue.author === book.author &&
      initalValue.year === book.year &&
      initalValue.genre === book.genre &&
      initalValue.description === book.description
    );
  };

  /**
   * Handles the update book action and navigation.
   * @param {Object} bookData - Updated book data
   */
  const handleUpdateBook = async (bookData) => {
    let refresh = false;

    if (!isChanged(bookData)) {
      await updateBook(id, bookData);
      refresh = true;
    }

    navigate("/get-all-books", { state: { refresh } });
  };

  if (loading) return <Loading />;

  if (!books || Object.entries(books).length === 0) {
    return (
      <NoBookFound
        title={EDIT_WITHOUT_BOOK_TITLE}
        subtitleOne={EDIT_WITHOUT_BOOK_SUBTITLE_ONE}
        subtitleTwo={EDIT_WITHOUT_BOOK_SUBTITLE_TWO}
        isAddBtnRequired={true}
        isGetBooksBtnRequired={true}
      />
    );
  }

  return (
    <BookForm
      initialValue={initalValue}
      onSubmitHandler={handleUpdateBook}
      submitLabel={UPDATE_BOOK}
    />
  );
};

export default EditBook;
