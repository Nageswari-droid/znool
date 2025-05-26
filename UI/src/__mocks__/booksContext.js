const mockBooksContext = {
  books: {
    1: {
      id: "1",
      title: "Book One",
      author: "Author A",
      genre: "Fiction",
      description: "",
    },
    2: {
      id: "2",
      title: "Book Two",
      author: "Author B",
      genre: "Nonfiction",
      description: "",
    },
  },
  loading: false,
  getBooks: jest.fn(),
  addBooks: jest.fn(),
  updateBook: jest.fn(),
  deleteBook: jest.fn(),
  sortBooks: jest.fn(),
  getBooksGroupedByAuthor: () => ({
    "Author A": {
      1: {
        id: "1",
        title: "Book One",
        author: "Author A",
        genre: "Fiction",
        description: "",
      },
    },
    "Author B": {
      2: {
        id: "2",
        title: "Book Two",
        author: "Author B",
        genre: "Nonfiction",
        description: "",
      },
    },
  }),
  getBooksGroupedByGenre: () => ({
    Fiction: {
      1: {
        id: "1",
        title: "Book One",
        author: "Author A",
        genre: "Fiction",
        description: "",
      },
    },
    Nonfiction: {
      2: {
        id: "2",
        title: "Book Two",
        author: "Author B",
        genre: "Nonfiction",
        description: "",
      },
    },
  }),
};

export default mockBooksContext;
