import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Loading from "./Loading";

describe("Loading", () => {
  it("renders loading component", () => {
    render(
      <MemoryRouter>
        <Loading />
      </MemoryRouter>
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
