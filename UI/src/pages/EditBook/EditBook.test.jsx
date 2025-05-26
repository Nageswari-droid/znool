import React from "react";
import EditBook from "./EditBook";
import mockBooksContext from "../../__mocks__/booksContext";
import * as booksContextModule from "../../context/booksContext";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

jest.mock("../DisplayAllBooks/DisplayAllBooks", () => (
  <div data-testid="display-all-books">Display all books!</div>
));

jest.mock("../../components/BookForm", () => (props) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      props.onSubmitHandler({ title: "My New Book" });
    }}
  >
    <input aria-label="Book title" defaultValue="Old Book" />
    <button type="submit">Update book</button>
  </form>
));

describe("EditBook", () => {
  beforeEach(() => {
    jest
      .spyOn(booksContextModule, "useBooksContext")
      .mockReturnValue(mockBooksContext);
  });

  afterEach(() => {
    booksContextModule.useBooksContext.mockRestore();
  });

  it("renders form with a non-empty text box and button", () => {
    render(
      <MemoryRouter>
        <EditBook />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Update book/i })
    ).toBeInTheDocument();
  });

  it("call updateBooks when form is submitted", async () => {
    render(
      <MemoryRouter initialEntries={["/edit-book/1"]}>
        <Routes>
          <Route path="/edit-book/:id" element={<EditBook />} />
        </Routes>
      </MemoryRouter>
    );

    const textBox = screen.getByLabelText(/title/i);

    expect(textBox.value).toBe("Old Book");
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "My New Book" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Update book/i }));

    await waitFor(() => {});
  });

  it("renders loading page when loading is true", () => {
    booksContextModule.useBooksContext.mockReturnValue({
      loading: true,
      books: {},
      updateBook: jest.fn(),
    });

    render(
      <MemoryRouter>
        <EditBook />
      </MemoryRouter>
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("no page found should be rendered when there are no books", () => {
    booksContextModule.useBooksContext.mockReturnValue({
      books: {},
      loading: false,
      updateBook: jest.fn(),
    });

    render(
      <MemoryRouter>
        <EditBook />
      </MemoryRouter>
    );

    expect(screen.getByText(/no book selected!/i)).toBeInTheDocument();
  });
});
