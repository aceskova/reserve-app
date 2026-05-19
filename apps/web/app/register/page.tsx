import RegisterForm from "./register-form";

export default function RegisterPage() {
  return (
    <main className="mx-auto max-w-md px-6 py-12">
      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h1 className="text-3xl font-bold tracking-tight text-gray-950 dark:text-gray-50">
          Registrace
        </h1>

        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Vytvoř si účet. Po registraci tě vrátíme na přihlášení.
        </p>

        <div className="mt-8">
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}
