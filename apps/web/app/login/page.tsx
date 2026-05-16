import LoginForm from "./login-form";

type LoginPageProps = {
  searchParams: Promise<{
    message?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <main>
      <h1>Prihlaseni</h1>

      {params.message === "registered" ? (
        <p>Registrace probehla uspesne. Ted se muzes prihlasit.</p>
      ) : null}

      <LoginForm />
    </main>
  );
}
