export function DashboardHeader({ userName }: { userName: string }) {
  return (
    <section>
      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
        Dashboard
      </p>

      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950 dark:text-gray-50">
        Vítej, {userName}
      </h1>

      <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
        Tady bude později správa rezervací, lekcí a profilu.
      </p>
    </section>
  );
}
