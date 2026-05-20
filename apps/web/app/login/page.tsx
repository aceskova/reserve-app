import { Card } from "../../components/card";
import LoginForm from "./login-form";

type LoginPageProps = {
  searchParams: Promise<{
    message?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <main className="mx-auto max-w-md px-6 py-12">
      <Card className="mt-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-950 dark:text-gray-50">
          Přihlášení
        </h1>

        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Přihlas se ke svému účtu a pokračuj do dashboardu.
        </p>

        {params.message === "registered" ? (
          <p className="mt-6 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200">
            Registrace proběhla úspěšně. Teď se můžeš přihlásit.
          </p>
        ) : null}

        <div className="mt-8">
          <LoginForm />
        </div>
      </Card>
    </main>
  );
}
