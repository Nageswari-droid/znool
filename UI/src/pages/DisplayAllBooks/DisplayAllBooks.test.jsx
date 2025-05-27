import React from "react";
import DisplayAllBooks from "./DisplayAllBooks";
import mockBooksContext from "../../__mocks__/booksContext";
import * as booksContextModule from "../../context/booksContext";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../components/SearchBox/SearchBox", () => (props) => (
  <div>
    <input
      aria-label="Search books"
      value={props.value}
      onChange={(e) => props.onChangeHandler(e.target.value)}
    />
    {props.value && (
      <button
        aria-label="Clear search"
        onClick={props.onClearHandler}
        type="button"
      >
        X
      </button>
    )}
  </div>
));

jest.mock(
  "../../components/RadioButtonGroup/RadioButtonGroup",
  () => (props) =>
    (
      <div>
        <button
          aria-label="Sort by title"
          onClick={() => props.setViewOption("sort")}
        >
          Sort by title
        </button>
        <button
          aria-label="Group by author"
          onClick={() => props.setViewOption("author")}
        >
          Group by author
        </button>
        <button
          aria-label="Group by genre"
          onClick={() => props.setViewOption("genre")}
        >
          Group by genre
        </button>
      </div>
    )
);

jest.mock("../../components/Cards/Cards", () => () => <div>Cards Area</div>);

describe("DisplayAllBooks", () => {
  beforeEach(() => {
    jest
      .spyOn(booksContextModule, "useBooksContext")
      .mockReturnValue(mockBooksContext);
  });

  afterEach(() => {
    booksContextModule.useBooksContext.mockRestore();
  });

  it("renders search box, radio buttons, and cards", () => {
    render(
      <MemoryRouter>
        <DisplayAllBooks />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/search books/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sort by title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/group by author/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/group by genre/i)).toBeInTheDocument();
    expect(screen.getByText(/cards area/i)).toBeInTheDocument();
  });

  it("updates search value when typing", () => {
    render(
      <MemoryRouter>
        <DisplayAllBooks />
      </MemoryRouter>
    );

    const input = screen.getByLabelText(/search books/i);

    fireEvent.change(input, { target: { value: "Harry" } });

    expect(input.value).toBe("Harry");
  });

  it("changes view option when radio button is clicked", () => {
    render(
      <MemoryRouter>
        <DisplayAllBooks />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByLabelText(/group by author/i));
    fireEvent.click(screen.getByLabelText(/group by genre/i));
    fireEvent.click(screen.getByLabelText(/Sort by title/i));
  });

  it("no page found should be rendered when there are no books", () => {
    booksContextModule.useBooksContext.mockReturnValue({
      books: {},
      loading: false,
      getBooks: jest.fn(),
    });

    render(
      <MemoryRouter>
        <DisplayAllBooks />
      </MemoryRouter>
    );

    expect(screen.getByText(/no books found/i)).toBeInTheDocument();
  });

  it("renders loading page when loading is true", () => {
    booksContextModule.useBooksContext.mockReturnValue({
      books: {},
      loading: true,
      getBooks: jest.fn(),
    });

    render(
      <MemoryRouter>
        <DisplayAllBooks />
      </MemoryRouter>
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("clears the search value when clear button is clicked", () => {
    render(
      <MemoryRouter>
        <DisplayAllBooks />
      </MemoryRouter>
    );

    const input = screen.getByLabelText(/search books/i);
    fireEvent.change(input, { target: { value: "Harry" } });
    expect(input.value).toBe("Harry");

    const clearButton = screen.getByLabelText(/clear search/i);
    fireEvent.click(clearButton);

    expect(input.value).toBe("");
  });
});
