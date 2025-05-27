/**
 * Page component for adding a new book.
 *
 * Provides a form to add a new book and navigates to the books list after submission.
 */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useBooksContext } from "../../context/booksContext";
import { ADD_BOOK } from "../../constants/string";
import BookForm from "../../components/BookForm/BookForm";
import Loading from "../../components/Loading/Loading";

/**
 * AddNewBook page for adding a new book.
 * @component
 * @returns {JSX.Element}
 */
const AddNewBook = () => {
  const navigate = useNavigate();
  const { addBooks, loading } = useBooksContext();

  /**
   * Handles the add book action and navigation.
   * @param {Object} bookData - New book data
   */
  const handleAddBook = async (bookData) => {
    await addBooks(bookData);
    navigate("/get-all-books", { state: { refresh: true } });
  };

  if (loading) return <Loading />;

  return <BookForm onSubmitHandler={handleAddBook} submitLabel={ADD_BOOK} />;
};

export default AddNewBook;
