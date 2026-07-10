import type { TrainingSessionDto } from "@repo/api-contracts";

type TrainingSessionCardProps = {
  trainingSession: TrainingSessionDto;
};

export function TrainingSessionCard({
  trainingSession,
}: TrainingSessionCardProps) {
  const startsAt = new Date(trainingSession.startsAtUtc);
  const formattedStart = startsAt.toLocaleString("cs-CZ", {
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    weekday: "short",
  });
  const formattedPrice = (trainingSession.priceCents / 100).toLocaleString(
    "cs-CZ",
    {
      style: "currency",
      currency: trainingSession.currency,
    },
  );

  return (
    <article className="flex min-h-44 flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-gray-950 dark:text-gray-50">
            {trainingSession.title}
          </h3>

          <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-200">
            {formattedPrice}
          </span>
        </div>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {trainingSession.trainer.name}
        </p>
      </div>

      <dl className="mt-5 grid gap-3 text-sm">
        <div>
          <dt className="text-gray-500 dark:text-gray-400">Začátek</dt>
          <dd className="font-medium text-gray-800 dark:text-gray-100">
            <time dateTime={trainingSession.startsAtUtc}>{formattedStart}</time>
          </dd>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-800">
          <dt className="text-gray-500 dark:text-gray-400">Kapacita</dt>
          <dd className="font-medium text-gray-800 dark:text-gray-100">
            {trainingSession.capacity}
          </dd>
        </div>
      </dl>
    </article>
  );
}
