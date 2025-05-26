import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";

describe("Home", () => {
  const renderWithRouter = (initialEntries = ["/"]) => {
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/add-new-book"
            element={<div data-testid="add-book-page">Add Book Page</div>}
          />
          <Route
            path="/get-all-books"
            element={
              <div data-testid="display-books-page">Display Books Page</div>
            }
          />
        </Routes>
      </MemoryRouter>
    );
  };

  it("renders landing page content", () => {
    renderWithRouter();

    expect(
      screen.getByRole("heading", { name: /welcome to/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /easily add, update, and delete books in one place with Znool’s intuitive interface./i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add new book/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /show all books/i })
    ).toBeInTheDocument();
  });

  it("navigates to add-new-book on Add Book button click", () => {
    renderWithRouter();

    fireEvent.click(screen.getByRole("button", { name: /add new book/i }));

    expect(screen.getByTestId("add-book-page")).toBeInTheDocument();
  });

  it("navigates to get-all-books on Display Books button click", () => {
    renderWithRouter();

    fireEvent.click(screen.getByRole("button", { name: /show all books/i }));

    expect(screen.getByTestId("display-books-page")).toBeInTheDocument();
  });
});
