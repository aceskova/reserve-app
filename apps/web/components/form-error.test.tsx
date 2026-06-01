import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { FormError } from "./form-error";

it("renders nothing when message is missing", () => {
  const { container } = render(<FormError />);

  expect(container).toBeEmptyDOMElement();
});

it("renders the error message", () => {
  render(<FormError message="Přihlášení se nepodařilo." />);

  expect(screen.getByText("Přihlášení se nepodařilo.")).toBeInTheDocument();
});
