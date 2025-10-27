import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sessionwrapper from "./component/Sessionwrapper";
import { EdgeStoreProvider } from "@/lib/edgestore";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LinkUP",
  description: "A place to link with others",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <EdgeStoreProvider>
        <Sessionwrapper>
        {children}
        </Sessionwrapper>
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
