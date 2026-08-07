"use client";

import { useActionState, useState } from "react";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { createInitialFormState } from "../../../lib/form-state";
import type {
  CreateTrainingSessionActionState,
  CreateTrainingSessionField,
} from "../../actions/training-session";
import { createTrainingSessionAction } from "../../actions/training-session";
import { FormError } from "../../../components/form-error";
import { FormField } from "../../../components/form-field";

type DurationOption = "45" | "60" | "90" | "custom";

const initialState: CreateTrainingSessionActionState =
  createInitialFormState<CreateTrainingSessionField>();

export function TrainingSessionForm() {
  const [state, formAction, pending] = useActionState(
    createTrainingSessionAction,
    initialState,
  );

  const [durationOption, setDurationOption] = useState<DurationOption>("60");
  const [startsAt, setStartsAt] = useState(state.values.startsAt ?? "");
  const [endsAt, setEndsAt] = useState(state.values.endsAt ?? "");

  const isCustomDuration = durationOption === "custom";

  function handleStartsAtChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    setStartsAt(value);

    if (!isCustomDuration) {
      setEndsAt(calculateEndsAt(value, durationOption));
    }
  }

  function handleDurationOptionChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const value = event.target.value as DurationOption;

    setDurationOption(value);

    if (value !== "custom") {
      setEndsAt(calculateEndsAt(startsAt, value));
    }
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <FormField label="Název lekce" required errors={state.errors.title}>
        <Input
          name="title"
          type="text"
          required
          defaultValue={state.values.title}
        />
      </FormField>

      <FormField label="Popis" errors={state.errors.description}>
        <textarea
          name="description"
          className="mt-2 block min-h-28 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-950 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50"
          defaultValue={state.values.description}
        />
      </FormField>

      <fieldset>
        <legend className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Délka lekce
        </legend>

        <div className="mt-2 grid max-w-md grid-cols-4 gap-2">
          <label className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm">
            <input
              type="radio"
              name="durationOption"
              value="45"
              checked={durationOption === "45"}
              onChange={handleDurationOptionChange}
            />
            45 min
          </label>

          <label className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm">
            <input
              type="radio"
              name="durationOption"
              value="60"
              checked={durationOption === "60"}
              onChange={handleDurationOptionChange}
            />
            60 min
          </label>

          <label className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm">
            <input
              type="radio"
              name="durationOption"
              value="90"
              checked={durationOption === "90"}
              onChange={handleDurationOptionChange}
            />
            90 min
          </label>

          <label className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm">
            <input
              type="radio"
              name="durationOption"
              value="custom"
              checked={durationOption === "custom"}
              onChange={handleDurationOptionChange}
            />
            Vlastní
          </label>
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Začátek" required errors={state.errors.startsAt}>
          <Input
            name="startsAt"
            type="datetime-local"
            required
            value={startsAt}
            onChange={handleStartsAtChange}
          />
        </FormField>

        <FormField
          label={isCustomDuration ? "Konec" : "Konec (dopočítaný)"}
          required={isCustomDuration}
          errors={state.errors.endsAt}
        >
          <Input
            name="endsAt"
            type="datetime-local"
            required={isCustomDuration}
            value={endsAt}
            readOnly={!isCustomDuration}
            onChange={(event) => setEndsAt(event.target.value)}
            className={
              !isCustomDuration ? "cursor-not-allowed opacity-70" : undefined
            }
          />
        </FormField>
      </div>

      <div className="grid gap-5 sm:grid-cols-[1fr_1fr_120px]">
        <FormField label="Kapacita" required errors={state.errors.capacity}>
          <Input
            name="capacity"
            type="number"
            min={1}
            required
            defaultValue={state.values.capacity}
          />
        </FormField>

        <FormField label="Cena" required errors={state.errors.price}>
          <Input
            name="price"
            type="number"
            min={0}
            step="1"
            required
            defaultValue={state.values.price}
          />
        </FormField>

        <FormField label="Měna" required errors={state.errors.currency}>
          <Input
            name="currency"
            type="text"
            minLength={3}
            maxLength={3}
            required
            defaultValue={state.values.currency || "CZK"}
          />
        </FormField>
      </div>

      <Button className="w-full" type="submit" disabled={pending}>
        {pending ? "Vytvářím..." : "Vytvořit lekci"}
      </Button>
      <FormError message={state.error} />
    </form>
  );
}

function calculateEndsAt(startsAt: string, durationOption: DurationOption) {
  if (!startsAt || durationOption === "custom") {
    return "";
  }

  const date = new Date(startsAt);
  date.setMinutes(date.getMinutes() + Number(durationOption));

  return formatDateTimeLocal(date);
}

function formatDateTimeLocal(date: Date) {
  const pad = (value: number) => String(value).padStart(2, "0");

  return [
    date.getFullYear(),
    "-",
    pad(date.getMonth() + 1),
    "-",
    pad(date.getDate()),
    "T",
    pad(date.getHours()),
    ":",
    pad(date.getMinutes()),
  ].join("");
}
