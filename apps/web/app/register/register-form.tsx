"use client";

import { useActionState } from "react";
import {
  registerAction,
  type RegisterActionState,
  type RegisterFields,
} from "../actions/auth";
import { createInitialFormState } from "../../lib/form-state";

const initialState: RegisterActionState =
  createInitialFormState<RegisterFields>();

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(
    registerAction,
    initialState,
  );

  return (
    <main>
      <h1>Registrace</h1>

      <form action={formAction}>
        <label>
          Jméno
          <input
            autoComplete="name"
            name="name"
            required
            type="text"
            defaultValue={state.values.name}
          />
        </label>
        {state.errors.name?.map((error) => (
          <p className="text-red-500" key={error}>
            {error}
          </p>
        ))}

        <label>
          Email
          <input
            name="email"
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
            autoComplete="new-password"
          />
        </label>
        {state.errors.password?.map((error) => (
          <p className="text-red-500" key={error}>
            {error}
          </p>
        ))}

        <button type="submit" disabled={pending}>
          {pending ? "Registruji..." : "Registrovat se"}
        </button>
        {state.error && <p className="text-red-500">{state.error}</p>}
      </form>
    </main>
  );
}
