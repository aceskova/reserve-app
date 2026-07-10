import { Card } from "../../components/card";
import { TrainingSessionCard } from "../../components/training-session-card";
import { getTrainingSessions } from "../../lib/training-sessions";

const DASHBOARD_TRAINING_SESSIONS_LIMIT = 3;

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
            Nadcházející lekce
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Nejbližší vypsané lekce v rozvrhu.
          </p>
        </div>
      </div>

      {upcomingTrainingSessions.length === 0 ? (
        <div className="mt-6 rounded-md border border-dashed border-gray-300 p-6 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-400">
          Zatím nejsou vypsané žádné nadcházející lekce.
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
