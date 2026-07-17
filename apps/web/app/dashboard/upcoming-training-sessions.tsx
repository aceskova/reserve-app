import Link from "next/link";
import { Card } from "../../components/card";
import { TrainingSessionCard } from "../../components/training-session-card";
import { getTrainingSessions } from "../../lib/training-sessions";

const DASHBOARD_TRAINING_SESSIONS_LIMIT = 3;

const DASHBOARD_COPY = {
  upcomingTrainingSessions: {
    title: "Nadcházející lekce",
    description: "Nejbližší lekce vypsané v rozvrhu.",
    empty: "Zatím nejsou vypsané žádné nadcházející lekce.",
    viewAll: "Zobrazit všechny →",
  },
} as const;

export async function UpcomingTrainingSessions() {
  const trainingSessions = await getTrainingSessions();
  const now = new Date();

  const upcomingTrainingSessions = trainingSessions
    .filter((session) => new Date(session.startsAtUtc) > now)
    .slice(0, DASHBOARD_TRAINING_SESSIONS_LIMIT);

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-950 dark:text-gray-50">
            {DASHBOARD_COPY.upcomingTrainingSessions.title}
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {DASHBOARD_COPY.upcomingTrainingSessions.description}
          </p>
        </div>
        <Link
          href="/training-sessions"
          className="inline-flex items-center justify-center rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-100 hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800"
        >
          {DASHBOARD_COPY.upcomingTrainingSessions.viewAll}
        </Link>
      </div>

      {upcomingTrainingSessions.length === 0 ? (
        <div className="mt-6 rounded-md border border-dashed border-gray-300 p-6 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-400">
          {DASHBOARD_COPY.upcomingTrainingSessions.empty}
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {upcomingTrainingSessions.map((session) => (
            <TrainingSessionCard key={session.id} trainingSession={session} />
          ))}
        </div>
      )}
    </Card>
  );
}
