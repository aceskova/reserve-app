"use client";

import { useActionState } from "react";
import {
  type LoginActionState,
  type LoginFields,
  loginAction,
} from "../actions/auth";
import { createInitialFormState } from "../../lib/form-state";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { FieldError } from "../../components/field-error";
import { FormError } from "../../components/form-error";

const initialState: LoginActionState = createInitialFormState<LoginFields>();

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <label className="block">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Email
        </span>
        <Input
          name="email"
          inputMode="email"
          required
          type="email"
          autoComplete="email"
          defaultValue={state.values.email}
        />
      </label>
      <FieldError errors={state.errors.email} />

      <label className="block">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Heslo
        </span>
        <Input
          name="password"
          required
          type="password"
          autoComplete="current-password"
        />
      </label>
      <FieldError errors={state.errors.password} />

      <Button className="w-full" type="submit" disabled={pending}>
        {pending ? "Přihlašuji..." : "Přihlásit se"}
      </Button>
      <FormError message={state.error} />
    </form>
  );
}
