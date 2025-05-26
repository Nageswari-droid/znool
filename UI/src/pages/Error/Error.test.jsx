import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Error from "./Error";

const renderWithRoute = (route) => {
  render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/error/:id" element={<Error />} />
        <Route
          path="/"
          element={<div data-testid="landing-page">Landing Page!</div>}
        />
        <Route
          path="/get-all-books"
          element={
            <div data-testid="display-all-books">Display all books!</div>
          }
        />
      </Routes>
    </MemoryRouter>
  );
};

describe("ErrorPage", () => {
  it("renders 500 error title and message", () => {
    renderWithRoute("/error/500");

    expect(screen.getByRole("alert")).toHaveTextContent(
      /Sorry, we couldn't connect to the server. Please try again later./i
    );
    expect(screen.getByRole("button", { name: /return/i })).toBeInTheDocument();
  });

  it("renders 404 error title and message", () => {
    renderWithRoute("/error/404");

    expect(screen.getByRole("alert")).toHaveTextContent(
      /Book doesn't exists!/i
    );
    expect(screen.getByRole("button", { name: /return/i })).toBeInTheDocument();
  });

  it("renders 400 error title and message", () => {
    renderWithRoute("/error/400");

    expect(screen.getByRole("alert")).toHaveTextContent(
      /Book with the same author already exists! Please create a new book/i
    );
    expect(screen.getByRole("button", { name: /return/i })).toBeInTheDocument();
  });

  it("navigates to correct route on button click", () => {
    renderWithRoute("/error/500");

    fireEvent.click(screen.getByRole("button", { name: /return/i }));

    expect(screen.getByTestId("landing-page")).toBeInTheDocument();
  });

  it("navigates to correct route on button click", () => {
    renderWithRoute("/error/400");

    fireEvent.click(screen.getByRole("button", { name: /return/i }));

    expect(screen.getByTestId("display-all-books")).toBeInTheDocument();
  });
});
