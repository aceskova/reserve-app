import { z } from "zod";
import { describe, expect, it } from "vitest";
import { trainingSessionSchema } from "./training-session-schema";

const validTrainingSessionInput = {
  title: "Joga",
  description: "",
  startsAt: "2026-12-31T17:00",
  endsAt: "",
  durationOption: "60",
  capacity: "10",
  price: "250",
  currency: "czk",
};

type FieldName =
  | "title"
  | "description"
  | "startsAt"
  | "endsAt"
  | "durationOption"
  | "capacity"
  | "price"
  | "currency";

function expectFieldError(
  result: ReturnType<typeof trainingSessionSchema.safeParse>,
  field: FieldName,
  message: string,
) {
  expect(result.success).toBe(false);

  if (!result.success) {
    const errors = z.flattenError(result.error);

    expect(errors.fieldErrors[field]).toContain(message);
  }
}

describe("Training Session Schema", () => {
  it("allows preset duration without custom end time and transforms form values", () => {
    const result = trainingSessionSchema.safeParse({
      ...validTrainingSessionInput,
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.description).toBeUndefined();
      expect(result.data.capacity).toBe(10);
      expect(result.data.price).toBe(250);
      expect(result.data.currency).toBe("CZK");
    }
  });

  it("allows custom duration with valid end time", () => {
    const result = trainingSessionSchema.safeParse({
      ...validTrainingSessionInput,
      endsAt: "2026-12-31T18:00",
      durationOption: "custom",
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.startsAt).toBe("2026-12-31T17:00");
      expect(result.data.endsAt).toBe("2026-12-31T18:00");
    }
  });

  it("requires end time for custom duration", () => {
    const result = trainingSessionSchema.safeParse({
      ...validTrainingSessionInput,
      endsAt: "",
      durationOption: "custom",
    });

    expectFieldError(result, "endsAt", "Konec lekce je povinný.");
  });

  it("rejects custom duration when end time is before start time", () => {
    const result = trainingSessionSchema.safeParse({
      ...validTrainingSessionInput,
      startsAt: "2026-12-31T18:00",
      endsAt: "2026-12-31T17:00",
      durationOption: "custom",
    });

    expectFieldError(result, "endsAt", "Konec lekce musí být po začátku.");
  });

  it("rejects empty title", () => {
    const result = trainingSessionSchema.safeParse({
      ...validTrainingSessionInput,
      title: "",
    });

    expectFieldError(result, "title", "Název lekce je povinný.");
  });

  it("rejects zero capacity", () => {
    const result = trainingSessionSchema.safeParse({
      ...validTrainingSessionInput,
      capacity: "0",
    });

    expectFieldError(
      result,
      "capacity",
      "Kapacita musí být celé číslo větší než 0.",
    );
  });

  it("rejects negative price", () => {
    const result = trainingSessionSchema.safeParse({
      ...validTrainingSessionInput,
      price: "-1",
    });

    expectFieldError(
      result,
      "price",
      "Cena musí být celé číslo větší nebo rovno 0.",
    );
  });
});
