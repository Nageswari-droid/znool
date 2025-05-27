import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";

describe("NavBar", () => {
  it("renders navigation bar with add new book button", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText(/znool/i)).toBeInTheDocument();
  });

  it("navigates to add-new-book on Add new book button click", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<NavBar />} />
          <Route
            path="/add-new-book"
            element={<div data-testid="add-new-book">Add new book</div>}
          />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /add new book/i }));

    expect(screen.getByTestId("add-new-book")).toBeInTheDocument();
  });
});
