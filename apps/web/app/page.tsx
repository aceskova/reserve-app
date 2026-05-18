import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Reserve App</h1>

        <p>Rezervacni system pro trenery a klienty.</p>

        <Link href="/login">Prihlasit se</Link>
        <Link href="/register">Registrovat se</Link>
      </main>
    </div>
  );
}
