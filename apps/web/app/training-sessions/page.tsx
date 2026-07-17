import { redirect } from "next/navigation";
import { getCurrentUser } from "../../lib/auth";
import { TrainingSessions } from "./training-sessions";

export default async function TrainingSessionsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <TrainingSessions />
    </main>
  );
}
