"use client";

import { useActionState } from "react";
import {
  type LoginActionState,
  type LoginFields,
  loginAction,
} from "../actions/auth";
import { createInitialFormState } from "../../lib/form-state";

const initialState: LoginActionState = createInitialFormState<LoginFields>();

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <main>
      <form action={formAction}>
        <label>
          Email
          <input
            name="email"
            inputMode="email"
            required
            type="email"
            autoComplete="email"
            defaultValue={state.values.email}
          />
        </label>
        {state.errors.email?.map((error) => (
          <p className="text-red-500" key={error}>
            {error}
          </p>
        ))}
        <label>
          Heslo
          <input
            name="password"
            required
            type="password"
            autoComplete="current-password"
          />
        </label>
        {state.errors.password?.map((error) => (
          <p className="text-red-500" key={error}>
            {error}
          </p>
        ))}

        <button type="submit" disabled={pending}>
          {pending ? "Přihlašuji..." : "Přihlásit se"}
        </button>
        {state.error && <p className="text-red-500">{state.error}</p>}
      </form>
    </main>
  );
}
