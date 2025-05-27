import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TextBoxWithError from "./TextBoxWithError";

describe("TextBoxWithError", () => {
  it("renders without crashing and shows text box", () => {
    render(
      <TextBoxWithError
        label={"Title"}
        value={"value"}
        onChangeHandler={() => {}}
      />
    );

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
  });

  it("calls onChangeHandler when user types", () => {
    const handleChange = jest.fn();
    render(
      <TextBoxWithError
        label="Book Title"
        value=""
        id="input-book-title"
        onChangeHandler={handleChange}
        onClearHandler={() => {}}
        errorMessage=""
      />
    );

    fireEvent.change(screen.getByLabelText(/book title/i), {
      target: { value: "New Title" },
    });

    expect(handleChange).toHaveBeenCalledWith("New Title");
  });

  it("calls onClearHandler when clear button is clicked", () => {
    const handleClear = jest.fn();
    render(
      <TextBoxWithError
        label="Title"
        value="value"
        placeholder="Enter description"
        onChangeHandler={() => {}}
        onClearHandler={handleClear}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /clear title/i }));
    expect(handleClear).toHaveBeenCalled();
  });
});
