import React from "react";
import { useNavigate } from "react-router-dom";
import { useBooksContext } from "../../context/booksContext";
import { ADD_BOOK } from "../../constants/string";
import BookForm from "../../components/BookForm";
import LoadingPage from "../LoadingPage";

const AddNewBook = () => {
  const navigate = useNavigate();
  const { addBooks, loading } = useBooksContext();

  const handleAddBook = async (bookData) => {
    await addBooks(bookData);
    navigate("/get-all-books", { state: { refresh: true } });
  };

  if (loading) return <LoadingPage />;

  return <BookForm onSubmitHandler={handleAddBook} submitLabel={ADD_BOOK} />;
};

export default AddNewBook;
