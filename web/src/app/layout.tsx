import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { mantineThemeConfig } from "@/theme/palette";
import { ClientLayout } from "./components/ClientLayout";
import { QueryProvider } from "./components/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const theme = createTheme(mantineThemeConfig);

export const metadata: Metadata = {
  title: "AU Visa GPT",
  description: "Local dev preview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <QueryProvider>
            <ClientLayout>{children}</ClientLayout>
          </QueryProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
