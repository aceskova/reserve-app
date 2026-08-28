import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FormError } from "./form-error";

describe("FormError", () => {
  it("renders nothing when message is missing", () => {
    const { container } = render(<FormError />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders the error message", () => {
    const errorMessage = "Přihlášení se nepodařilo.";
    render(<FormError message={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
