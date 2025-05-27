import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";

describe("Modal", () => {
  it("renders without crashing and shows modal with two buttons", () => {
    render(
      <Modal
        title={"Delete"}
        optionOne={"confirm"}
        optionTwo={"cancel"}
        handleCancelDelete={() => {}}
        handleConfirmDelete={() => {}}
      />
    );

    expect(screen.getByText(/delete/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /confirm/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("calls handleCancelDelete when cancel button is clicked", () => {
    const handleCancelDelete = jest.fn();
    render(
      <Modal
        title={"Delete"}
        optionOne={"confirm"}
        optionTwo={"cancel"}
        handleCancelDelete={handleCancelDelete}
        handleConfirmDelete={() => {}}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(handleCancelDelete).toHaveBeenCalled();
  });

  it("calls handleConfirmDelete when confirm button is clicked", () => {
    const handleConfirmDelete = jest.fn();
    render(
      <Modal
        title={"Delete"}
        optionOne={"confirm"}
        optionTwo={"cancel"}
        handleCancelDelete={() => {}}
        handleConfirmDelete={handleConfirmDelete}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /confirm/i }));
    expect(handleConfirmDelete).toHaveBeenCalled();
  });

  it("removes modal from DOM when unmounted", () => {
    const { unmount } = render(
      <Modal
        title="Delete"
        optionOne="confirm"
        optionTwo="cancel"
        handleCancelDelete={() => {}}
        handleConfirmDelete={() => {}}
      />
    );

    expect(screen.getByText(/delete/i)).toBeInTheDocument();

    unmount();

    expect(screen.queryByText(/delete/i)).not.toBeInTheDocument();
  });
});
