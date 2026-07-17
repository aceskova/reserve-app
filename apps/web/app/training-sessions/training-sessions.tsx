import { Card } from "../../components/card";
import { TrainingSessionCard } from "../../components/training-session-card";
import { getTrainingSessions } from "../../lib/training-sessions";

const TRAINING_SESSIONS_COPY = {
  title: "Všechny lekce",
  description: "Všechny vypsané lekce v rozvrhu.",
  empty: "Zatím nejsou vypsané žádné lekce.",
} as const;

export async function TrainingSessions() {
  const trainingSessions = await getTrainingSessions();

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-950 dark:text-gray-50">
            {TRAINING_SESSIONS_COPY.title}
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {TRAINING_SESSIONS_COPY.description}
          </p>
        </div>
      </div>

      {trainingSessions.length === 0 ? (
        <div className="mt-6 rounded-md border border-dashed border-gray-300 p-6 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-400">
          {TRAINING_SESSIONS_COPY.empty}
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {trainingSessions.map((session) => (
            <TrainingSessionCard key={session.id} trainingSession={session} />
          ))}
        </div>
      )}
    </Card>
  );
}
