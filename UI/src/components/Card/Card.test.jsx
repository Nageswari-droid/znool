import React from "react";
import Card from "./Card";
import { render, screen, fireEvent } from "@testing-library/react";
import { EDIT, DELETE } from "../../constants/string";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("Card", () => {
  const book = {
    title: "Book",
    author: "Author",
    year: "2020",
    genre: "Fiction",
    description: "",
  };
  const id = "123";

  it("renders book details", () => {
    render(<Card book={book} id={id} onDeleteHandler={() => {}} />);

    expect(screen.getByText(book.title)).toBeInTheDocument();
    expect(screen.getByText(book.author)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: EDIT })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: DELETE })).toBeInTheDocument();
  });

  it("calls onDeleteHandler when delete button is clicked", () => {
    const onDeleteHandler = jest.fn();
    render(<Card book={book} id={id} onDeleteHandler={onDeleteHandler} />);

    fireEvent.click(screen.getByRole("button", { name: DELETE }));

    expect(onDeleteHandler).toHaveBeenCalledWith(id);
  });

  it("navigates to edit page when edit button is clicked", () => {
    const mockNavigate = jest.fn();

    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(mockNavigate);
    render(<Card book={book} id={id} onDeleteHandler={() => {}} />);

    fireEvent.click(screen.getByRole("button", { name: EDIT }));

    expect(mockNavigate).toHaveBeenCalledWith(`/edit-book/${id}`);
  });
});
