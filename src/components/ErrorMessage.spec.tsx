import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage", () => {
  it("should render default error message", () => {
    render(<ErrorMessage />);
    expect(
      screen.getByText("An error occurred. Please try again."),
    ).toBeInTheDocument();
  });

  it("should render custom error message", () => {
    render(<ErrorMessage message="Custom error message" />);
    expect(screen.getByText("Custom error message")).toBeInTheDocument();
  });
});
