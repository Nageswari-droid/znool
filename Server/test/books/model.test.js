jest.mock("fs");
const fs = require("fs");

const { read, write, update, remove } = require("../../src/books/model");

describe("Book Model", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("read", () => {
    it("should return book data", () => {
      const data = { book: "data" };
      fs.readFileSync.mockReturnValue(JSON.stringify(data));

      const result = read();
      expect(result).toStrictEqual(data);
    });
  });

  describe("write", () => {
    it("should return book data", () => {
      fs.readFileSync.mockReturnValue("{}");
      fs.writeFileSync.mockImplementation(() => {});

      const result = write("2", {
        title: "Another Book",
        author: "A",
        genre: "B",
        year: 2020,
      });
      expect(result).toStrictEqual(true);
    });

    it("should return false if book already exists", () => {
      fs.readFileSync.mockReturnValue(
        '{"1": {"title": "Old", "author": "A", "genre": "B", "year": 2020}}'
      );
      fs.writeFileSync.mockImplementation(() => {});

      const result = write("2", {
        title: "Old",
        author: "A",
        genre: "B",
        year: 2020,
      });
      expect(result).toStrictEqual(false);
    });
  });

  describe("update", () => {
    it("should update book data", () => {
      fs.readFileSync.mockReturnValue(
        '{"1": {"title": "Old", "author": "A", "genre": "B", "year": 2020}}'
      );
      fs.writeFileSync.mockImplementation(() => {});

      const updatedBook = { title: "New", author: "A", genre: "B", year: 2021 };
      const result = update("1", updatedBook);
      const writtenData = JSON.parse(fs.writeFileSync.mock.calls[0][1]);

      expect(result).toStrictEqual(true);
      expect(writtenData["1"]).toStrictEqual(updatedBook);
    });

    it("should return false if book does not exist", () => {
      fs.readFileSync.mockReturnValue("{}");
      fs.writeFileSync.mockImplementation(() => {});

      const updatedBook = { title: "New", author: "A", genre: "B", year: 2021 };
      const result = update("1", updatedBook);

      expect(result).toStrictEqual(false);
    });
  });

  describe("delete", () => {
    it("should delete book data", () => {
      fs.readFileSync.mockReturnValue(
        '{"1": {"title": "Old", "author": "A", "genre": "B", "year": 2020}}'
      );
      fs.writeFileSync.mockImplementation(() => {});

      const result = remove("1");
      const writtenData = JSON.parse(fs.writeFileSync.mock.calls[0][1]);

      expect(result).toStrictEqual(true);
      expect(writtenData["1"]).toBeUndefined();
    });

    it("should return false if book does not exist", () => {
      fs.readFileSync.mockReturnValue("{}");
      fs.writeFileSync.mockImplementation(() => {});

      const result = remove("1");

      expect(result).toStrictEqual(false);
    });
  });
});
