import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SelectBox from "./SelectBox";

describe("SelectBox", () => {
  const options = ["Fiction", "Nonfiction", "Adventure"];

  it("renders with label and options", () => {
    render(
      <SelectBox
        id="genre-select"
        label="Genre"
        value=""
        options={options}
        onChangeHandler={() => {}}
      />
    );

    expect(screen.getByLabelText(/genre/i)).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /select a genre/i })).toBeInTheDocument();
  });

  it("calls onChangeHandler when selection changes", () => {
    const handleChange = jest.fn();
    render(
      <SelectBox
        id="genre-select"
        label="Genre"
        value=""
        options={options}
        onChangeHandler={handleChange}
      />
    );

    fireEvent.change(screen.getByLabelText(/genre/i), { target: { value: "Fiction" } });

    expect(handleChange).toHaveBeenCalledWith("Fiction");
  });
});
