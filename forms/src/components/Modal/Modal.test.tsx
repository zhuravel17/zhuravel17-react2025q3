import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "./Modal";

describe("Modal component", () => {
  it("renders children inside portal", () => {
    render(
      <Modal onClose={jest.fn()}>
        <p>Test content</p>
      </Modal>
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("calls onClose when clicking overlay", () => {
    const handleClose = jest.fn();
    render(
      <Modal onClose={handleClose}>
        <p>Test</p>
      </Modal>
    );
    fireEvent.click(screen.getByRole("dialog"));
    expect(handleClose).toHaveBeenCalled();
  });

  it("calls onClose when pressing Escape", () => {
    const handleClose = jest.fn();
    render(
      <Modal onClose={handleClose}>
        <p>Test</p>
      </Modal>
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(handleClose).toHaveBeenCalled();
  });

  it("does not close when clicking inside content", () => {
    const handleClose = jest.fn();
    render(
      <Modal onClose={handleClose}>
        <div>Inside</div>
      </Modal>
    );
    fireEvent.click(screen.getByText("Inside"));
    expect(handleClose).not.toHaveBeenCalled();
  });
});
