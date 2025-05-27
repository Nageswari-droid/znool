import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RadioButtonGroup from "./RadioButtonGroup";

describe("RadioButtonGroup", () => {
  const arr = [
    { id: "sort", value: "sort", label: "All Books" },
    { id: "group", value: "group", label: "Grouped by author" },
  ];

  it("renders all radio buttons with correct labels", () => {
    render(
      <RadioButtonGroup arr={arr} viewOption="all" setViewOption={() => {}} />
    );

    arr.forEach((item) => {
      expect(screen.getByLabelText(item.label)).toBeInTheDocument();
    });
  });

  it("calls setViewOption when a radio is selected", () => {
    const setViewOption = jest.fn();
    render(
      <RadioButtonGroup arr={arr} viewOption="sort" setViewOption={setViewOption} />
    );

    fireEvent.click(screen.getByLabelText("Grouped by author"));

    expect(setViewOption).toHaveBeenCalledWith("group");
  });
});
