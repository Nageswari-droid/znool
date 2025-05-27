import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BookForm from "./BookForm";

const mockOnSubmit = jest.fn();

describe("BookForm", () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("renders without crashing and shows form fields", () => {
    render(<BookForm onSubmitHandler={mockOnSubmit} submitLabel="Submit" />);

    expect(screen.getByLabelText(/book title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/author's name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/published year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/submit/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/clear/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /clear/i })).toBeDisabled();
  });

  it("fills out the form and submits", () => {
    render(
      <BookForm onSubmitHandler={mockOnSubmit} submitLabel="Add new book" />
    );

    fireEvent.change(screen.getByLabelText(/book title/i), {
      target: { value: "Book" },
    });
    fireEvent.change(screen.getByLabelText(/author's name/i), {
      target: { value: "Author" },
    });
    fireEvent.change(screen.getByLabelText(/published year/i), {
      target: { value: "2020" },
    });
    fireEvent.change(screen.getByLabelText(/genre/i), {
      target: { value: "Fiction" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add new book/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: "Book",
      author: "Author",
      genre: "Fiction",
      year: "2020",
      description: "",
    });
  });

  it("disables submit if required fields are empty", () => {
    render(
      <BookForm onSubmitHandler={mockOnSubmit} submitLabel="Add new book" />
    );

    fireEvent.change(screen.getByLabelText(/book title/i), {
      target: { value: "Book" },
    });

    expect(
      screen.getByRole("button", { name: /add new book/i })
    ).toBeDisabled();
  });

  it("shows year error and disables submit if year is in the future", () => {
    render(<BookForm onSubmitHandler={mockOnSubmit} submitLabel="Submit" />);

    const yearInput = screen.getByLabelText(/published year/i);

    fireEvent.change(yearInput, { target: { value: "9999" } });

    expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled();
  });

  it("disables submit if required fields are empty", () => {
    render(
      <BookForm onSubmitHandler={mockOnSubmit} submitLabel="Add new book" />
    );

    fireEvent.change(screen.getByLabelText(/book title/i), {
      target: { value: "Book" },
    });

    expect(
      screen.getByRole("button", { name: /add new book/i })
    ).toBeDisabled();
  });

  it("enables clear if fields are not empty", () => {
    render(<BookForm onSubmitHandler={mockOnSubmit} submitLabel="Submit" />);

    fireEvent.change(screen.getByLabelText(/book title/i), {
      target: { value: "Book" },
    });

    expect(
      screen.getByRole("button", { name: "Clear", exact: true })
    ).toBeEnabled();
  });

  it("clear button resets fields", () => {
    render(<BookForm onSubmitHandler={mockOnSubmit} submitLabel="Submit" />);

    fireEvent.change(screen.getByLabelText(/book title/i), {
      target: { value: "Book" },
    });
    fireEvent.change(screen.getByLabelText(/author's name/i), {
      target: { value: "Author" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Clear", exact: true }));

    expect(screen.getByLabelText(/book title/i)).toHaveValue("");
    expect(screen.getByLabelText(/author's name/i)).toHaveValue("");
  });
});
