import React from "react";
import { render, screen } from "@testing-library/react";
import GroupedCard from "./GroupedCard";

jest.mock("../Card/Card", () => (props) => (
  <div data-testid="card" data-id={props.id}>
    {props.book.title}
  </div>
));

jest.mock("../Modal/Modal", () => () => <div data-testid="modal">Modal</div>);

describe("GroupedCard", () => {
  const groupKey = "Author A";
  const booksObj = {
    1: { title: "Book 1" },
    2: { title: "Book 2" },
  };
  const onDeleteHandler = jest.fn();
  const handleCancelDelete = jest.fn();
  const handleConfirmDelete = jest.fn();

  it("renders group title and all cards", () => {
    render(
      <GroupedCard
        groupKey={groupKey}
        booksObj={booksObj}
        onDeleteHandler={onDeleteHandler}
      />
    );

    expect(screen.getByRole("heading", { name: groupKey })).toBeInTheDocument();
    expect(screen.getAllByTestId("card")).toHaveLength(2);
    expect(screen.getByText("Book 1")).toBeInTheDocument();
    expect(screen.getByText("Book 2")).toBeInTheDocument();
  });

  it("renders Modal when modalOpen is true", () => {
    render(
      <GroupedCard
        groupKey={groupKey}
        booksObj={booksObj}
        onDeleteHandler={onDeleteHandler}
        modalOpen={true}
        handleCancelDelete={handleCancelDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    );
    
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });
});
