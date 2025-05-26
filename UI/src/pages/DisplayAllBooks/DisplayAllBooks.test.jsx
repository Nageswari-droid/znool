import React from "react";
import DisplayAllBooks from "./DisplayAllBooks";
import mockBooksContext from "../../__mocks__/booksContext";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../context/booksContext", () => ({
  useBooksContext: () => mockBooksContext,
}));

jest.mock("../../components/SearchBox", () => (props) => (
  <input
    aria-label="Search books"
    value={props.value}
    onChange={(e) => props.onChangeHandler(e.target.value)}
  />
));

jest.mock("../../components/RadioButtonGroup", () => (props) => (
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
));

jest.mock("../../components/Cards", () => () => <div>Cards Area</div>);

describe("DisplayAllBooks", () => {
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
  });
});
