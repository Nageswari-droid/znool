import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const BooksContext = createContext();

export const useBooksContext = () => useContext(BooksContext);

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getBooks = async () => {
    setLoading(true);

    try {
      const response = await fetch("/books");

      if (!response.ok) {
        const error = new Error(
          `Request failed with status ${response.status}`
        );
        error.status = response.status;
        throw error;
      }

      const data = await response.json();
      setBooks(data);
    } catch (e) {
      navigate("/error/500");
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
    } catch (e) {
      if (e.status === 400) {
        navigate("/error/400");
      } else navigate("/error/500");
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
    } catch (e) {
      if (e.status === 404) {
        navigate("/error/404");
      } else navigate("/error/500");
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id) => {
    setLoading(true);

    try {
      const response = await fetch(`/books/${id}`, {
        method: "DELETE",
      });
      await response.json();

      setBooks((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } catch (e) {
      if (e.status === 404) {
        navigate("/error/404");
      } else navigate("/error/500");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BooksContext.Provider
      value={{ books, getBooks, addBooks, updateBook, deleteBook, loading }}
    >
      {children}
    </BooksContext.Provider>
  );
};
