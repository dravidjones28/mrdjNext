import "./globals.css";
import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import NavBar from "./NavBar/page";
import AuthProvider from "./auth/Provider";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500"] });
export const metadata: Metadata = {
  title: "Mrdj",
  description: "I'm learning Next.js",
  openGraph: { title: "..", description: "...." },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="winter">
      <body className={roboto.className}>
        <AuthProvider>
          <NavBar />
          <main className="p-5">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
