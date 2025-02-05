import "./globals.css";
import { Inter } from "next/font/google";
import ApolloWrapper from "../lib/ApolloWrapper"; // ✅ Ensure this is correct

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gigaclear Frontend",
  description: "A frontend challenge using Next.js, Apollo, Tailwind",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
