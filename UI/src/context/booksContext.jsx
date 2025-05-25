import { createContext, useContext, useState } from "react";

const BooksContext = createContext();

export const useBooksContext = () => useContext(BooksContext);

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState({});
  const [loading, setLoading] = useState(false);

  const getBooks = async () => {
    setLoading(true);

    try {
      const response = await fetch("/books");
      const data = await response.json();
      setBooks(data);
    } finally {
      setLoading(false);
    }
  };

  const addBooks = async (newBook) => {
    setLoading(true);

    try {
      const response = await fetch("/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });
      const data = await response.json();

      setBooks((prevBooks) => ({
        ...prevBooks,
        [data.id]: data,
      }));
    } finally {
      setLoading(false);
    }
  };

  const updateBook = async (id, updatedBook) => {
    setLoading(true);

    try {
      const response = await fetch(`/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBook),
      });
      await response.json();

      setBooks((prev) => ({ ...prev, [id]: updatedBook }));
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = (id) => {
    setBooks((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  return (
    <BooksContext.Provider
      value={{ books, getBooks, addBooks, updateBook, deleteBook, loading }}
    >
      {children}
    </BooksContext.Provider>
  );
};
