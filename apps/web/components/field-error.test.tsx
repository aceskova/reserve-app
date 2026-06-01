import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { FieldError } from "./field-error";

it("renders nothing when errors are missing", () => {
  const { container } = render(<FieldError />);

  expect(container).toBeEmptyDOMElement();
});

it("renders field errors", () => {
  render(<FieldError errors={["Zadej platný email."]} />);

  expect(screen.getByText("Zadej platný email.")).toBeInTheDocument();
});

it("renders multiple field errors", () => {
  render(<FieldError errors={["První chyba.", "Druhá chyba."]} />);

  expect(screen.getByText("První chyba.")).toBeInTheDocument();
  expect(screen.getByText("Druhá chyba.")).toBeInTheDocument();
});