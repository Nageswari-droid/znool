import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TextArea from "./TextArea";

describe("TextArea", () => {
  it("renders without crashing and shows text area", () => {
    render(
      <TextArea
        label={"Description"}
        value={"value"}
        onChangeHandler={() => {}}
      />
    );

    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  it("calls onChangeHandler when user types", () => {
    const handleChange = jest.fn();
    render(
      <TextArea
        label="Description"
        value=""
        placeholder="Enter description"
        onChangeHandler={handleChange}
      />
    );

    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "New value" },
    });

    expect(handleChange).toHaveBeenCalledWith("New value");
  });
});
