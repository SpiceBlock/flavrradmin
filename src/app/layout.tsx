import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flavrr Admin Portal"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Icons+Outlined&display=optional"
          />
          <link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet'></link>
        </head>
        <body className={inter.className}>
          {children}
          </body>

      </html>
  );
}
