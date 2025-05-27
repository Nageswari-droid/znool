import React from "react";
import { render, screen } from "@testing-library/react";
import Cards from "./Cards";
import mockBooksContext from "../../__mocks__/booksContext";

jest.mock("../Card/Card", () => (props) => (
  <div data-testid="card" data-id={props.id}>
    {props.book.title}
  </div>
));

jest.mock("../GroupedCard/GroupedCard", () => (props) => (
  <div data-testid="grouped-card">{props.groupKey}</div>
));

jest.mock("../Modal/Modal", () => (props) => (
  <div data-testid="modal">
    <button onClick={props.handleConfirmDelete}>Confirm</button>
  </div>
));

jest.mock("../../context/booksContext", () => ({
  useBooksContext: () => mockBooksContext,
}));

describe("Cards", () => {
  it("renders a list of Card components for flat data", () => {
    const data = {
      1: { title: "Book 1" },
      2: { title: "Book 2" },
    };
    render(<Cards data={data} />);

    expect(screen.getAllByTestId("card")).toHaveLength(2);
    expect(screen.getByText("Book 1")).toBeInTheDocument();
    expect(screen.getByText("Book 2")).toBeInTheDocument();
  });

  it("renders GroupedCard components when isGroupedBy is true", () => {
    const data = {
      GroupA: { 1: { title: "Book 1" } },
      GroupB: { 2: { title: "Book 2" } },
    };
    render(<Cards data={data} isGroupedBy />);

    expect(screen.getAllByTestId("grouped-card")).toHaveLength(2);
    expect(screen.getByText("GroupA")).toBeInTheDocument();
    expect(screen.getByText("GroupB")).toBeInTheDocument();
  });
});
