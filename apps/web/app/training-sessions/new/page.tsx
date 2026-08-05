import Link from "next/link";
import { redirect } from "next/navigation";
import { Card } from "../../../components/card";
import { getCurrentUser } from "../../../lib/auth";

const NEW_TRAINING_SESSION_COPY = {
  forbidden: {
    title: "Nemáš oprávnění vytvářet lekce",
    description:
      "Vytváření lekcí je dostupné pouze pro trenéry a administrátory.",
    backToLessons: "Zpět na lekce",
  },
  page: {
    title: "Vytvořit lekci",
    description: "Tady bude formulář pro vytvoření nové lekce.",
  },
} as const;

export default async function NewTrainingSessionPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const canCreateTrainingSession =
    user.role === "TRAINER" || user.role === "ADMIN";

  if (!canCreateTrainingSession) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-12">
        <Card>
          <h1 className="text-3xl font-bold tracking-tight text-gray-950 dark:text-gray-50">
            {NEW_TRAINING_SESSION_COPY.forbidden.title}
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            {NEW_TRAINING_SESSION_COPY.forbidden.description}
          </p>

          <Link
            href="/training-sessions"
            className="mt-6 inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-100 hover:text-gray-950 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800"
          >
            {NEW_TRAINING_SESSION_COPY.forbidden.backToLessons}
          </Link>
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <Card>
        <h1 className="text-3xl font-bold tracking-tight text-gray-950 dark:text-gray-50">
          {NEW_TRAINING_SESSION_COPY.page.title}
        </h1>

        <p className="mt-3 text-gray-600 dark:text-gray-400">
          {NEW_TRAINING_SESSION_COPY.page.description}
        </p>
      </Card>
    </main>
  );
}
