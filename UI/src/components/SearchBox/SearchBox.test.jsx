import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBox from "./SearchBox";

describe("SearchBox", () => {
  it("renders without crashing and shows search box", () => {
    render(
      <SearchBox
        label={"Search books"}
        value={"Th"}
        onChangeHandler={() => {}}
        onClearHandler={() => {}}
      />
    );

    expect(screen.getByLabelText(/search books/i)).toBeInTheDocument();
  });

  it("calls onChangeHandler when user types", () => {
    const handleChange = jest.fn();
    render(
      <SearchBox
        label={"Search books"}
        value={"Th"}
        onChangeHandler={handleChange}
        onClearHandler={() => {}}
      />
    );

    fireEvent.change(screen.getByLabelText(/search books/i), {
      target: { value: "th" },
    });

    expect(handleChange).toHaveBeenCalledWith("th");
  });
});
