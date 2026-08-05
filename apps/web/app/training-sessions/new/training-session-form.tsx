"use client";

import { useActionState } from "react";
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

const initialState: CreateTrainingSessionActionState =
  createInitialFormState<CreateTrainingSessionField>();

export function TrainingSessionForm() {
  const [state, formAction, pending] = useActionState(
    createTrainingSessionAction,
    initialState,
  );

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

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Začátek" required errors={state.errors.startsAt}>
          <Input
            name="startsAt"
            type="datetime-local"
            required
            defaultValue={state.values.startsAt}
          />
        </FormField>

        <FormField label="Konec" required errors={state.errors.endsAt}>
          <Input
            name="endsAt"
            type="datetime-local"
            required
            defaultValue={state.values.endsAt}
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
