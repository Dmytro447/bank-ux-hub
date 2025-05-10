// src/app/layout.tsx
import Layout from "@/components/Layout";
import { TrpcProvider } from "@/utils/trpc";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TrpcProvider>
          <Layout>{children}</Layout>
        </TrpcProvider>
      </body>
    </html>
  );
}
