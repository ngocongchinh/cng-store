import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AutocompleteDropdown from "./AutocompleteDropdown";
import type { Product } from "../../types/product";

describe("AutocompleteDropdown", () => {
  beforeAll(() => {
    Element.prototype.scrollIntoView = vi.fn();
  });

  const mockSuggestions: Product[] = [
    {
      id: 1,
      title: "Product 1",
      price: 10,
      description: "",
      category: "",
      image: "",
    },
    {
      id: 2,
      title: "Product 2",
      price: 20,
      description: "",
      category: "",
      image: "",
    },
  ];

  it("should not render when isOpen is false", () => {
    const { container } = render(
      <AutocompleteDropdown
        suggestions={mockSuggestions}
        loading={false}
        error={null}
        activeIndex={-1}
        isOpen={false}
        query="test"
        onSelect={vi.fn()}
        inputId="test-input"
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("should render suggestions when open", () => {
    render(
      <AutocompleteDropdown
        suggestions={mockSuggestions}
        loading={false}
        error={null}
        activeIndex={-1}
        isOpen={true}
        query="test"
        onSelect={vi.fn()}
        inputId="test-input"
      />,
    );
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  it("should show loading spinner when loading", () => {
    render(
      <AutocompleteDropdown
        suggestions={[]}
        loading={true}
        error={null}
        activeIndex={-1}
        isOpen={true}
        query="test"
        onSelect={vi.fn()}
        inputId="test-input"
      />,
    );
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("should show error message when error occurs", () => {
    const error = new Error("API Error");
    render(
      <AutocompleteDropdown
        suggestions={[]}
        loading={false}
        error={error}
        activeIndex={-1}
        isOpen={true}
        query="test"
        onSelect={vi.fn()}
        inputId="test-input"
      />,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("API Error")).toBeInTheDocument();
  });

  it("should show no suggestions message when query is long enough but no results", () => {
    render(
      <AutocompleteDropdown
        suggestions={[]}
        loading={false}
        error={null}
        activeIndex={-1}
        isOpen={true}
        query="test query"
        onSelect={vi.fn()}
        inputId="test-input"
      />,
    );
    expect(screen.getByText(/No suggestions found/)).toBeInTheDocument();
  });

  it("should have correct ARIA attributes", () => {
    render(
      <AutocompleteDropdown
        suggestions={mockSuggestions}
        loading={false}
        error={null}
        activeIndex={0}
        isOpen={true}
        query="test"
        onSelect={vi.fn()}
        inputId="test-input"
      />,
    );
    const combobox = screen.getByRole("combobox");
    expect(combobox).toHaveAttribute("aria-expanded", "true");
    expect(combobox).toHaveAttribute(
      "aria-activedescendant",
      "test-input-option-0",
    );
  });
});
