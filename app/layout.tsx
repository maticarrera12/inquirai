import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { ReactNode } from "react";

const inter = localFont({
  src: "./fonts/InterVF.ttf",
  variable: "--font-inter",
  weight: "100 200 300 400 500 700 800 900",
});
const spaceGrotesk = localFont({
  src: "./fonts/spaceGroteskVF.ttf",
  variable: "--font-space-grotesk",
  weight: "300 400 500 700 800 900",
});

export const metadata: Metadata = {
  title: "InquirAI",
  description:
    "Una plataforma impulsada por la comunidad para formular y responder preguntas de programación. Obtén ayuda, comparte conocimientos y colabora con desarrolladores de todo el mundo. Explora temas como desarrollo web, desarrollo de aplicaciones móviles, algoritmos, estructuras de datos y mucho más.",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <SessionProvider session={session}>
        <body
          className={`${inter.className} ${spaceGrotesk.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
