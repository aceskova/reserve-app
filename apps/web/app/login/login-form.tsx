"use client";

import { useActionState } from "react";
import { LoginActionState, loginAction } from "../actions/auth";

//  return <form action={loginAction}>...</form>
export default function LoginForm() {
  const initialState: LoginActionState = {
    error: undefined,
    errors: {},
  };

  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <main>
      <h1>Prihlaseni</h1>

      <form action={formAction}>
        <label>
          Email
          <input name="email" required type="email" />
        </label>
        {state.errors?.email && (
          <p className="text-red-500">{state.errors.email}</p>
        )}
        <label>
          Heslo
          <input name="password" required type="password" />
        </label>
        {state.errors?.password && (
          <p className="text-red-500">{state.errors.password}</p>
        )}

        <button type="submit" disabled={pending}>
          Prihlasit se
        </button>
        {state.error && (
          <p className="text-red-500">{state.error}</p>
        )}
      </form>
    </main>
  );
}
