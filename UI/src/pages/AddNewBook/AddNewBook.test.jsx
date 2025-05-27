import React from "react";
import AddNewBook from "./AddNewBook";
import mockBooksContext from "../../__mocks__/booksContext";
import * as booksContextModule from "../../context/booksContext";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

jest.mock("../DisplayAllBooks/DisplayAllBooks", () => (
  <div data-testid="display-all-books">Display all books!</div>
));

jest.mock("../../components/BookForm/BookForm", () => (props) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      props.onSubmitHandler({ title: "New Book" });
    }}
  >
    <input aria-label="title" />
    <button type="submit">Add new book</button>
  </form>
));

describe("AddANewBook", () => {
  beforeEach(() => {
    jest
      .spyOn(booksContextModule, "useBooksContext")
      .mockReturnValue(mockBooksContext);
  });

  afterEach(() => {
    booksContextModule.useBooksContext.mockRestore();
  });

  it("renders form with a text box and button", () => {
    render(
      <MemoryRouter>
        <AddNewBook />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add new book/i })
    ).toBeInTheDocument();
  });

  it("call addBooks when form is submitted", async () => {
    render(
      <MemoryRouter>
        <AddNewBook />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "My New Book" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Add new book/i }));

    await waitFor(() => {});
  });

  it("renders loading page when loading is true", () => {
    booksContextModule.useBooksContext.mockReturnValue({
      loading: true,
      addBooks: jest.fn(),
    });

    render(
      <MemoryRouter>
        <AddNewBook />
      </MemoryRouter>
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
