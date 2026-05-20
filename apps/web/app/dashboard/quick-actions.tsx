import { Button } from "../../components/button";
import { Card } from "../../components/card";

export function QuickActions() {
  return (
    <Card>
      <h2 className="text-lg font-semibold text-gray-950 dark:text-gray-50">
        Rychlé akce
      </h2>

      <div className="mt-6 grid gap-3">
        <Button className="w-full" type="button" disabled>
          Vytvořit rezervaci
        </Button>

        <Button
          className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-950 dark:hover:bg-gray-200"
          type="button"
          disabled
        >
          Upravit profil
        </Button>
      </div>
    </Card>
  );
}
