import { redirect } from "next/navigation";
import { getCurrentUser } from "../../lib/auth";
import { logoutAction } from "../actions/auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <form action={logoutAction}>
        <button type="submit">Odhlasit se</button>
      </form>

      <section>
        <h2>Prihlaseny uzivatel</h2>

        <dl>
          <div>
            <dt>Jmeno</dt>
            <dd>{user.name}</dd>
          </div>

          <div>
            <dt>Email</dt>
            <dd>{user.email}</dd>
          </div>

          <div>
            <dt>Role</dt>
            <dd>{user.role}</dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
