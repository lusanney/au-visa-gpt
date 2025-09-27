import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import { MantineProvider, ColorSchemeScript, createTheme } from "@mantine/core";
import { mantineThemeConfig } from "@/theme/palette";

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
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
