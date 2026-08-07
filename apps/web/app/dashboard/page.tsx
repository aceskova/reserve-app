import { redirect } from "next/navigation";
import { getCurrentUser } from "../../lib/auth";
import { DashboardHeader } from "./dashboard-header";
import { DashboardStats } from "./dashboard-stats";
import { QuickActions } from "./quick-actions";
import { UserSummary } from "./user-summary";
import { LogoutForm } from "./logout-form";
import { UpcomingTrainingSessions } from "./upcoming-training-sessions";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const canCreateTrainingSession =
    user.role === "TRAINER" || user.role === "ADMIN";

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <DashboardHeader userName={user.name} />

      <DashboardStats userRole={user.role} />

      <section className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <UpcomingTrainingSessions
          canCreateTrainingSession={canCreateTrainingSession}
        />

        <div className="space-y-6">
          <QuickActions />
          <UserSummary user={user} />
          <LogoutForm />
        </div>
      </section>
    </main>
  );
}
