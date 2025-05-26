const mockBooksContext = {
  books: {
    1: { id: "1", title: "Book One", author: "Author A", genre: "Fiction" },
    2: { id: "2", title: "Book Two", author: "Author B", genre: "Nonfiction" },
  },
  loading: false,
  getBooks: jest.fn(),
  addBooks: jest.fn(),
  updateBook: jest.fn(),
  deleteBook: jest.fn(),
  sortBooks: jest.fn(),
  getBooksGroupedByAuthor: () => ({
    "Author A": {
      1: { id: "1", title: "Book One", author: "Author A", genre: "Fiction" },
    },
    "Author B": {
      2: {
        id: "2",
        title: "Book Two",
        author: "Author B",
        genre: "Nonfiction",
      },
    },
  }),
  getBooksGroupedByGenre: () => ({
    Fiction: {
      1: { id: "1", title: "Book One", author: "Author A", genre: "Fiction" },
    },
    Nonfiction: {
      2: {
        id: "2",
        title: "Book Two",
        author: "Author B",
        genre: "Nonfiction",
      },
    },
  }),
};

export default mockBooksContext;
