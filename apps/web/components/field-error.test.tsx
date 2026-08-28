import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FieldError } from "./field-error";

describe("FieldError", () => {
  it("renders nothing when errors are missing", () => {
    const { container } = render(<FieldError />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders field errors", () => {
    const errorMessage = "Zadej platný email.";
    render(<FieldError errors={[errorMessage]} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("renders multiple field errors", () => {
    const errorMessage1 = "První chyba.";
    const errorMessage2 = "Druhá chyba.";

    render(<FieldError errors={[errorMessage1, errorMessage2]} />);

    expect(screen.getByText(errorMessage1)).toBeInTheDocument();
    expect(screen.getByText(errorMessage2)).toBeInTheDocument();
  });
});
