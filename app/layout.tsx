import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "Foca Marketing | Agência de Marketing Digital Completa",
  description:
    "Agência de marketing digital com time completo: tráfego pago, design, copywriting, automação e desenvolvimento web. Resultados reais para seu negócio.",
  keywords:
    "marketing digital, tráfego pago, google ads, meta ads, design gráfico, copywriting, automação, desenvolvimento web",
  authors: [{ name: "Foca Marketing" }],
  openGraph: {
    title: "Foca Marketing | Agência de Marketing Digital Completa",
    description:
      "Agência de marketing digital com time completo. Resultados reais para seu negócio.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Foca Marketing | Agência de Marketing Digital",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={plusJakartaSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
