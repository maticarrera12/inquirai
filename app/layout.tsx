import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  description: "Una plataforma impulsada por la comunidad para formular y responder preguntas de programación. Obtén ayuda, comparte conocimientos y colabora con desarrolladores de todo el mundo. Explora temas como desarrollo web, desarrollo de aplicaciones móviles, algoritmos, estructuras de datos y mucho más.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${spaceGrotesk.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
