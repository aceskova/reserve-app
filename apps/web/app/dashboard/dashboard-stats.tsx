import { RoleDto } from "@repo/api-contracts";
import { Card } from "../../components/card";

export function DashboardStats({ userRole }: { userRole: RoleDto }) {
  return (
    <section className="mt-8 grid gap-4 sm:grid-cols-3">
      <Card>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Dnešní rezervace
        </p>
        <p className="mt-2 text-3xl font-bold text-gray-950 dark:text-gray-50">
          0
        </p>
      </Card>
      <Card>
        <p className="text-sm text-gray-500 dark:text-gray-400">Nadcházející</p>
        <p className="mt-2 text-3xl font-bold text-gray-950 dark:text-gray-50">
          0
        </p>
      </Card>
      <Card>
        <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
        <p className="mt-2 text-3xl font-bold text-gray-950 dark:text-gray-50">
          {userRole}
        </p>
      </Card>
    </section>
  );
}
