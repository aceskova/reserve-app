import { Card } from "../../components/card";

export function ReservationsPreview() {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-950 dark:text-gray-50">
            Nadcházející rezervace
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Náhled nejbližších rezervací se zobrazí tady.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-md border border-dashed border-gray-300 p-6 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-400">
        Zatím tu nejsou žádné rezervace. Jakmile vznikne první rezervace,
        zobrazí se tady její náhled.
      </div>
    </Card>
  );
}
