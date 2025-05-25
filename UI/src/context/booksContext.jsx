import { createContext, useContext, useState } from "react";

const initialValue = {
  "14da279a-3ce3-40a7-9c9f-3c95d8aa640e": {
    title: "The Great Gatsby",
    author: "Homer",
    genre: "Thriller",
    year: 1900,
    description: "A journey through fantastical lands.",
  },
  "e2e2afe6-1f37-447a-8ce9-e6619db62ff6": {
    title: "Jane Eyre",
    author: "Aldous Huxley",
    genre: "Adventure",
    year: 1959,
    description: "A fascinating exploration of society and norms.",
  },
  "1b72253c-8ef4-4eb3-9813-462e10de4121": {
    title: "The Lord of the Rings",
    author: "Leo Tolstoy",
    genre: "Historical",
    year: 1902,
    description: "A story that challenges perceptions and conventions.",
  },
  "1dfb555e-f089-4834-b75a-40883439def2": {
    title: "The Great Gatsby",
    author: "J.D. Salinger",
    genre: "Historical",
    year: 1858,
    description: "An emotional rollercoaster of a novel.",
  },
  "4b359c52-054f-4435-a127-f00bc79f9559": {
    title: "1984",
    author: "Fyodor Dostoevsky",
    genre: "Thriller",
    year: 1996,
    description: "An emotional rollercoaster of a novel.",
  },
  "46ac25ae-55d0-4d4c-994d-856b36602eb9": {
    title: "Moby Dick",
    author: "Aldous Huxley",
    genre: "Historical",
    year: 1933,
    description: "A deep dive into the human psyche.",
  },
  "408951e5-c357-4a73-a326-4e9fcb07276d": {
    title: "The Odyssey",
    author: "George Orwell",
    genre: "Fantasy",
    year: 1973,
    description: "A reflective and philosophical narrative.",
  },
  "af10bab5-0038-4c1c-a721-c909f6a714ab": {
    title: "The Catcher in the Rye",
    author: "Harper Lee",
    genre: "Adventure",
    year: 1852,
    description: "A masterpiece of storytelling and imagination.",
  },
  "2eaf73b3-93d8-4d56-a6d9-cb2d50b09de6": {
    title: "Hamlet",
    author: "Herman Melville",
    genre: "Mystery",
    year: 2011,
    description: "A masterpiece of storytelling and imagination.",
  },
};

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

  const addBooks = (newBook) => {
    setBooks((prevBooks) => ({
      ...prevBooks,
      [newBook.id]: newBook,
    }));
  };

  const deleteBook = (id) => {
    setBooks((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const updateBook = (id, updatedBook) =>
    setBooks((prev) => ({ ...prev, [id]: updatedBook }));

  return (
    <BooksContext.Provider
      value={{ books, getBooks, addBooks, updateBook, deleteBook, loading }}
    >
      {children}
    </BooksContext.Provider>
  );
};
