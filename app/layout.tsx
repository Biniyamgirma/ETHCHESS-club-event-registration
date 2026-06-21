import type { Metadata } from "next";
import { Space_Grotesk,  } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";
import { Toaster } from 'sonner'

const spaceGrotesk = localFont({
  src: './fonts/SpaceGrotesk-Bold.otf',
  weight: '700', // bold, since you only have the Bold weight
  variable: '--font-space-grotesk', // optional, lets you use it as a CSS variable
})
const satoshiVariable = localFont({
  src: './fonts/Satoshi-Variable.ttf',
  weight: '700', // bold, since you only have the Bold weight
  variable: '--font-satoshi', // optional, lets you use it as a CSS variable
})


export const metadata: Metadata = {
  title: "ETH CHESS",
  description: "ETH CHESS is a chess club based in ethiopia, this is club event registration page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${satoshiVariable.variable} h-full antialiased`}
    >
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="manifest" href="/site.webmanifest"></link>
      </head>
      <body className="min-h-full flex flex-col">{children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
