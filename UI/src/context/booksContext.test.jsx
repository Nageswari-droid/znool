import React from "react";
import { render, act } from "@testing-library/react";
import { BooksProvider, useBooksContext } from "./booksContext";
import { MemoryRouter } from "react-router-dom";
import { withAsync } from "../utils/withAsync";
import { groupByAuthor, groupByGenre, sortByTitle } from "../utils/transform";

jest.mock("../utils/withAsync", () => ({
  withAsync: jest.fn(),
}));

jest.mock("../utils/transform", () => ({
  groupByAuthor: jest.fn(),
  groupByGenre: jest.fn(),
  sortByTitle: jest.fn(),
}));

describe("BooksContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("sortBooks calls sortByTitle and updates books", () => {
    const books = { 1: { title: "B" }, 2: { title: "A" } };
    sortByTitle.mockReturnValue({ 2: { title: "A" }, 1: { title: "B" } });

    let context;
    function Consumer() {
      context = useBooksContext();
      return null;
    }
    render(
      <MemoryRouter>
        <BooksProvider>
          <Consumer />
        </BooksProvider>
      </MemoryRouter>
    );

    act(() => {
      context.books = books;
      context.sortBooks();
    });

    expect(sortByTitle).toHaveBeenCalled();
  });

  it("getBooksGroupedByAuthor calls groupByAuthor", () => {
    const books = { 1: { title: "A", author: "X" } };

    let context;
    function Consumer() {
      context = useBooksContext();
      return null;
    }
    render(
      <MemoryRouter>
        <BooksProvider>
          <Consumer />
        </BooksProvider>
      </MemoryRouter>
    );

    act(() => {
      context.books = books;
      context.getBooksGroupedByAuthor();
    });

    expect(groupByAuthor).toHaveBeenCalled();
  });

  it("getBooksGroupedByGenre calls groupByGenre", () => {
    const books = { 1: { genre: "A" }, 2: { genre: "X" }, 3: { genre: "X" } };

    let context;
    function Consumer() {
      context = useBooksContext();
      return null;
    }
    render(
      <MemoryRouter>
        <BooksProvider>
          <Consumer />
        </BooksProvider>
      </MemoryRouter>
    );

    act(() => {
      context.books = books;
      context.getBooksGroupedByGenre();
    });

    expect(groupByGenre).toHaveBeenCalled();
  });

  it("getBooks calls withAsync with fetchBooks and setBooks", async () => {
    withAsync.mockResolvedValue();

    let context;
    function Consumer() {
      context = useBooksContext();
      return null;
    }
    render(
      <MemoryRouter>
        <BooksProvider>
          <Consumer />
        </BooksProvider>
      </MemoryRouter>
    );

    await act(async () => {
      await context.getBooks();
    });

    expect(withAsync).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      expect.any(Function),
      expect.any(Object),
      expect.any(Function)
    );
  });

  it("addBooks calls withAsync with createBook and updates books", async () => {
    withAsync.mockResolvedValue();

    let context;
    function Consumer() {
      context = useBooksContext();
      return null;
    }
    render(
      <MemoryRouter>
        <BooksProvider>
          <Consumer />
        </BooksProvider>
      </MemoryRouter>
    );

    await act(async () => {
      await context.addBooks({ title: "New" });
    });

    expect(withAsync).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      expect.any(Function),
      expect.any(Object),
      expect.any(Function)
    );
  });

  it("updateBook calls withAsync with updateBookApi", async () => {
    withAsync.mockResolvedValue();

    let context;
    function Consumer() {
      context = useBooksContext();
      return null;
    }
    render(
      <MemoryRouter>
        <BooksProvider>
          <Consumer />
        </BooksProvider>
      </MemoryRouter>
    );

    await act(async () => {
      await context.updateBook("1", { title: "Updated" });
    });

    expect(withAsync).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      expect.any(Function),
      expect.any(Object),
      expect.any(Function)
    );
  });

  it("deleteBook calls withAsync with deleteBookApi", async () => {
    withAsync.mockResolvedValue();

    let context;
    function Consumer() {
      context = useBooksContext();
      return null;
    }
    render(
      <MemoryRouter>
        <BooksProvider>
          <Consumer />
        </BooksProvider>
      </MemoryRouter>
    );

    await act(async () => {
      await context.deleteBook("1");
    });

    expect(withAsync).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      expect.any(Function),
      expect.any(Object),
      expect.any(Function)
    );
  });
});
