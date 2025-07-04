jest.mock("../../src/books/model", () => ({
  read: jest.fn(),
  write: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
}));

const {
  getAllBooksService,
  addNewBookService,
  updateBookService,
  deleteBookService,
} = require("../../src/books/service");
const { read, write, update, remove } = require("../../src/books/model");

describe("Book Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllBooksService", () => {
    it("should return all books by default", () => {
      const books = {
        "90-7890-678": {
          title: "The Odyssey",
          author: "George Orwell",
          genre: "Fantasy",
          year: 1973,
          description: "A reflective and philosophical narrative.",
        },
        "90-7890-654": {
          title: "The Catcher in the Rye",
          author: "Herman Melville",
          genre: "Adventure",
          year: 1852,
          description: "A masterpiece of storytelling and imagination.",
        },
        "90-7789-654": {
          title: "Hamlet",
          author: "Herman Melville",
          genre: "Fantasy",
          year: 2011,
          description: "A masterpiece of storytelling and imagination.",
        },
      };
      read.mockReturnValue(books);

      const result = getAllBooksService();
      expect(result).toStrictEqual(books);
    });
  });

  describe("addNewBookService", () => {
    it("should return false if fields are missing", () => {
      expect(addNewBookService({ title: "A" })).toBe(false);
    });

    it("should create a new book", () => {
      const book = {
        title: "The Odyssey",
        author: "George Orwell",
        genre: "Fantasy",
        year: 1973,
        description: "A reflective and philosophical narrative.",
      };
      write.mockReturnValue(book);

      const result = addNewBookService(book);
      expect(result.title).toStrictEqual(book.title);
    });
  });

  describe("updateBookService", () => {
    it("should return false if fields are missing", () => {
      expect(addNewBookService("1234-123", { title: "A" })).toBe(false);
    });

    it("should upadte an existing book", () => {
      const book = {
        title: "The Odyssey",
        author: "George Orwell",
        genre: "Fantasy",
        year: 1973,
        description: "A reflective and philosophical narrative.",
      };
      update.mockReturnValue(true);

      const result = updateBookService("1234-123", book);
      expect(result).toBe(true);
    });
  });

  describe("deleteBookService", () => {
    it("should delete an existing book", () => {
      remove.mockReturnValue(true);

      const result = deleteBookService("1234-123");
      expect(result).toBe(true);
    });
  });
});
