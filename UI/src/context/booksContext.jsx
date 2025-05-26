import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchBooks,
  createBook,
  updateBookApi,
  deleteBookApi,
} from "../api/booksApi";
import { withAsync } from "../utils/withAsync";
import { groupByAuthor, groupByGenre, sortByTitle } from "../utils/transform";

const BooksContext = createContext();
export const useBooksContext = () => useContext(BooksContext);

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sortBooks = () => {
    setBooks(sortByTitle(books));
  };

  const getBooksGroupedByAuthor = () => {
    return groupByAuthor(books);
  };

  const getBooksGroupedByGenre = () => {
    return groupByGenre(books);
  };

  const getBooks = async () => {
    await withAsync(
      fetchBooks,
      setLoading,
      navigate,
      { 500: "/error/500", default: "/error/500" },
      setBooks
    );
  };

  const addBooks = async (newBook) => {
    await withAsync(
      () => createBook(newBook),
      setLoading,
      navigate,
      { 400: "/error/400", default: "/error/500" },
      (data) =>
        setBooks((prevBooks) => ({
          ...prevBooks,
          [data.id]: data,
        }))
    );
  };

  const updateBook = async (id, updatedBook) => {
    await withAsync(
      () => updateBookApi(id, updatedBook),
      setLoading,
      navigate,
      { 404: "/error/404", default: "/error/500" },
      () => setBooks((prev) => ({ ...prev, [id]: updatedBook }))
    );
  };

  const deleteBook = async (id) => {
    await withAsync(
      () => deleteBookApi(id),
      setLoading,
      navigate,
      { 404: "/error/404", default: "/error/500" },
      () =>
        setBooks((prev) => {
          const copy = { ...prev };
          delete copy[id];
          return copy;
        })
    );
  };

  return (
    <BooksContext.Provider
      value={{
        books,
        sortBooks,
        getBooksGroupedByAuthor,
        getBooksGroupedByGenre,
        getBooks,
        addBooks,
        updateBook,
        deleteBook,
        loading,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};
