import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { NavLink } from "../components/nav-link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Reserve App",
  description: "Rezervacni system pro trenery a klienty.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="min-h-svh">
          <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <Link
                className="font-bold text-gray-950 dark:text-gray-50"
                href="/"
              >
                Reserve App
              </Link>

              <nav className="flex gap-1" aria-label="Hlavní navigace">
                <NavLink href="/dashboard">Dashboard</NavLink>
                <NavLink href="/login">Přihlášení</NavLink>
                <NavLink href="/register">Registrace</NavLink>
              </nav>
            </div>
          </header>

          {children}
        </div>
      </body>
    </html>
  );
}
