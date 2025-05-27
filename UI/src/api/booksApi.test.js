import {
  fetchBooks,
  createBook,
  updateBookApi,
  deleteBookApi,
} from "./booksApi";

describe("booksApi", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("fetchBooks", () => {
    it("fetches books", async () => {
      const response = { ok: true, json: jest.fn() };
      fetch.mockResolvedValue(response);

      await fetchBooks();

      expect(fetch).toHaveBeenCalledWith("/books");
      expect(response.json).toHaveBeenCalled();
    });

    it("throws error if fetch fails", async () => {
      const response = { ok: false, status: 500 };
      fetch.mockResolvedValue(response);

      await expect(fetchBooks()).rejects.toEqual({ status: 500 });
    });
  });

  describe("createNewBook", () => {
    it("creates a new book", async () => {
      const response = { ok: true, json: jest.fn() };
      fetch.mockResolvedValue(response);

      await createBook({ title: "New Book" });

      expect(fetch).toHaveBeenCalledWith("/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "New Book" }),
      });
      expect(response.json).toHaveBeenCalled();
    });

    it("throws error if create fails", async () => {
      const response = { ok: false, status: 400 };
      fetch.mockResolvedValue(response);

      await expect(createBook({ title: "New Book" })).rejects.toEqual({
        status: 400,
      });
    });
  });

  describe("updateBook", () => {
    it("updates an existing book", async () => {
      const response = { ok: true, json: jest.fn() };
      fetch.mockResolvedValue(response);

      await updateBookApi(1, { title: "Updated Book" });

      expect(fetch).toHaveBeenCalledWith("/books/1", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Updated Book" }),
      });
      expect(response.json).toHaveBeenCalled();
    });

    it("throws error if update fails", async () => {
      const response = { ok: false, status: 404 };
      fetch.mockResolvedValue(response);

      await expect(updateBookApi(1, { title: "Updated Book" })).rejects.toEqual(
        {
          status: 404,
        }
      );
    });
  });

  describe("deleteBook", () => {
    it("delets an existing book", async () => {
      const response = { ok: true, json: jest.fn() };
      fetch.mockResolvedValue(response);

      await deleteBookApi(1);

      expect(fetch).toHaveBeenCalledWith("/books/1", {
        method: "DELETE",
      });
      expect(response.json).toHaveBeenCalled();
    });

    it("throws error if update fails", async () => {
      const response = { ok: false, status: 404 };
      fetch.mockResolvedValue(response);

      await expect(deleteBookApi(1)).rejects.toEqual({
        status: 404,
      });
    });
  });
});
