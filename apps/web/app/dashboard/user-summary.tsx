import type { PublicUserDto } from "@repo/api-contracts";
import { Card } from "../../components/card";

export function UserSummary({ user }: { user: PublicUserDto }) {
  return (
    <Card role="region" aria-labelledby="user-summary-title">
      <h2
        id="user-summary-title"
        className="text-lg font-semibold text-gray-950 dark:text-gray-50"
      >
        Přihlášený uživatel
      </h2>

      <dl className="mt-6 space-y-4">
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
    </Card>
  );
}
