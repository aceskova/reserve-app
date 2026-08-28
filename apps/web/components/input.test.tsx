import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Input } from "./input";

describe("Input", () => {
  it("can be associated with a visible label", () => {
    render(
      <label>
        Email
        <Input name="email" />
      </label>,
    );

    expect(screen.getByRole("textbox", { name: "Email" })).toBeInTheDocument();
  });

  it("passes native input props to the input element", () => {
    render(
      <Input
        aria-label="Email"
        name="email"
        type="email"
        required
        autoComplete="email"
        defaultValue="test@example.com"
      />,
    );

    const input = screen.getByRole("textbox", { name: "Email" });

    expect(input).toHaveAttribute("name", "email");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("autocomplete", "email");
    expect(input).toHaveValue("test@example.com");
  });

  it("allows the user to enter a value", async () => {
    const user = userEvent.setup();

    render(<Input aria-label="Email" type="email" />);

    const input = screen.getByRole("textbox", { name: "Email" });

    await user.type(input, "test@example.com");

    expect(input).toHaveValue("test@example.com");
  });
});
