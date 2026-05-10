"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { loginUser } from "../../lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const result = await loginUser({ email, password });

      localStorage.setItem("reserve-app-token", result.accessToken);
      localStorage.setItem("reserve-app-user", JSON.stringify(result.user));

      router.push("/dashboard");
    } catch {
      setError("Prihlaseni se nepodarilo.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main>
      <h1>Prihlaseni</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            value={email}
          />
        </label>

        <label>
          Heslo
          <input
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
            value={password}
          />
        </label>

        {error ? <p>{error}</p> : null}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Prihlasuji se..." : "Prihlasit se"}
        </button>
      </form>
    </main>
  );
}
