import { redirect } from "next/navigation";
import { Button } from "../../components/button";
import { getCurrentUser } from "../../lib/auth";
import { logoutAction } from "../actions/auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section>
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
          Dashboard
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 dark:text-gray-50">
          Vítej, {user.name}
        </h1>

        <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
          Tady bude později správa rezervací, lekcí a profilu.
        </p>
      </section>

      <section className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-lg font-semibold text-gray-950 dark:text-gray-50">
          Přihlášený uživatel
        </h2>

        <dl className="mt-6 grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-sm text-gray-500 dark:text-gray-400">Jméno</dt>
            <dd className="mt-1 font-medium text-gray-950 dark:text-gray-50">
              {user.name}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500 dark:text-gray-400">Email</dt>
            <dd className="mt-1 font-medium text-gray-950 dark:text-gray-50">
              {user.email}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500 dark:text-gray-400">Role</dt>
            <dd className="mt-1 font-medium text-gray-950 dark:text-gray-50">
              {user.role}
            </dd>
          </div>
        </dl>
      </section>

      <form action={logoutAction} className="mt-8">
        <Button
          className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-950 dark:hover:bg-gray-200"
          type="submit"
        >
          Odhlásit se
        </Button>
      </form>
    </main>
  );
}
