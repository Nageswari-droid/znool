import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NoBookFound from "./NoBookFound";
import { ADD_BOOK, DISPLAY_BOOKS } from "../../constants/string";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("NoBookFound", () => {
  it("renders with title and subtitles", () => {
    render(
      <NoBookFound
        title="No books found"
        subtitleOne="Add new book"
        subtitleTwo="Show all books"
      />
    );

    expect(screen.getByText(/no books found/i)).toBeInTheDocument();
    expect(screen.getByText(/add new book/i)).toBeInTheDocument();
    expect(screen.getByText(/show all books/i)).toBeInTheDocument();
  });

  it("renders Add Book button if isAddBtnRequired is true", () => {
    render(
      <NoBookFound
        title="No books found"
        subtitleOne="Add new book"
        subtitleTwo="Show all books"
        isAddBtnRequired={true}
      />
    );
    expect(screen.getByRole("button", { name: ADD_BOOK })).toBeInTheDocument();
  });

  it("navigates to /add-new-book when Add Book button is clicked", () => {
    const mockNavigate = jest.fn();

    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(mockNavigate);
    render(
      <NoBookFound
        title="No books found"
        subtitleOne="Add new book"
        subtitleTwo="Show all books"
        isAddBtnRequired={true}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: ADD_BOOK }));

    expect(mockNavigate).toHaveBeenCalledWith("/add-new-book");
  });

  it("navigates to /get-all-books when Display Books button is clicked", () => {
    const mockNavigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(mockNavigate);

    render(
      <NoBookFound
        title="No books found"
        subtitleOne="Add new book"
        subtitleTwo="Show all books"
        isGetBooksBtnRequired={true}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: DISPLAY_BOOKS }));

    expect(mockNavigate).toHaveBeenCalledWith("/get-all-books");
  });
});
