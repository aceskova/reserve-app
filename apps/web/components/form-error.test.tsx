import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { FormError } from "./form-error";

it("renders nothing when message is missing", () => {
  const { container } = render(<FormError />);

  expect(container).toBeEmptyDOMElement();
});

it("renders the error message", () => {
  const errorMessage = "Přihlášení se nepodařilo.";
  render(<FormError message={errorMessage} />);

  expect(screen.getByText(errorMessage)).toBeInTheDocument();
});
