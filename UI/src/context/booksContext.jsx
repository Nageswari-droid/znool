/**
 * React context and provider for managing books state and operations.
 *
 * Provides state, CRUD operations, and grouping/sorting utilities for books.
 */
import React from "react";
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

/**
 * The BooksContext object for sharing books state and actions.
 * @type {React.Context}
 */
const BooksContext = createContext();

/**
 * Custom hook to access the BooksContext.
 * @returns {Object} The books context value
 */
export const useBooksContext = () => useContext(BooksContext);

/**
 * Provider component for books state and actions.
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} The provider wrapping children
 */
export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * Sorts the books state by title.
   */
  const sortBooks = () => {
    setBooks(sortByTitle(books));
  };

  /**
   * Returns books grouped by author.
   * @returns {Object} Books grouped by author
   */
  const getBooksGroupedByAuthor = () => {
    return groupByAuthor(books);
  };

  /**
   * Returns books grouped by genre.
   * @returns {Object} Books grouped by genre
   */
  const getBooksGroupedByGenre = () => {
    return groupByGenre(books);
  };

  /**
   * Fetches all books from the backend and updates state.
   * @async
   * @returns {Promise<void>}
   */
  const getBooks = async () => {
    await withAsync(
      fetchBooks,
      setLoading,
      navigate,
      { 500: "/error/500", default: "/error/500" },
      setBooks
    );
  };

  /**
   * Adds a new book and updates state.
   * @async
   * @param {Object} newBook - The new book data
   * @returns {Promise<void>}
   */
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

  /**
   * Updates a book by ID and updates state.
   * @async
   * @param {string} id - Book ID
   * @param {Object} updatedBook - Updated book data
   * @returns {Promise<void>}
   */
  const updateBook = async (id, updatedBook) => {
    await withAsync(
      () => updateBookApi(id, updatedBook),
      setLoading,
      navigate,
      { 404: "/error/404", default: "/error/500" },
      () => setBooks((prev) => ({ ...prev, [id]: updatedBook }))
    );
  };

  /**
   * Deletes a book by ID and updates state.
   * @async
   * @param {string} id - Book ID
   * @returns {Promise<void>}
   */
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
