import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SuggestionItem from "./SuggestionItem";
import type { Product } from "../../types/product";

describe("SuggestionItem", () => {
  const mockSuggestion: Product = {
    id: 1,
    title: "Test Product",
    price: 10,
    description: "",
    category: "",
    image: "",
  };

  it("should render suggestion title", () => {
    render(
      <SuggestionItem
        suggestion={mockSuggestion}
        query="test"
        isActive={false}
        onSelect={vi.fn()}
        id="test-option-0"
      />,
    );
    expect(screen.getByRole("option")).toHaveTextContent("Test Product");
  });

  it("should highlight matching query text", () => {
    render(
      <SuggestionItem
        suggestion={mockSuggestion}
        query="Test"
        isActive={false}
        onSelect={vi.fn()}
        id="test-option-0"
      />,
    );
    const mark = screen.getByText("Test");
    expect(mark.tagName).toBe("MARK");
  });

  it("should call onSelect when clicked", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <SuggestionItem
        suggestion={mockSuggestion}
        query="test"
        isActive={false}
        onSelect={onSelect}
        id="test-option-0"
      />,
    );

    const item = screen.getByRole("option");
    await user.click(item);

    expect(onSelect).toHaveBeenCalledWith(mockSuggestion);
  });

  it("should have active styling when isActive is true", () => {
    render(
      <SuggestionItem
        suggestion={mockSuggestion}
        query="test"
        isActive={true}
        onSelect={vi.fn()}
        id="test-option-0"
      />,
    );
    const item = screen.getByRole("option");
    expect(item).toHaveClass("bg-blue-100");
    expect(item).toHaveAttribute("aria-selected", "true");
  });

  it("should have correct id attribute", () => {
    render(
      <SuggestionItem
        suggestion={mockSuggestion}
        query="test"
        isActive={false}
        onSelect={vi.fn()}
        id="test-option-0"
      />,
    );
    const item = screen.getByRole("option");
    expect(item).toHaveAttribute("id", "test-option-0");
  });
});
