// src/app/layout.tsx
import Layout from "@/components/Layout";
import { TrpcProvider } from "@/utils/trpc";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <TrpcProvider>
            <Layout>{children}</Layout>
          </TrpcProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
