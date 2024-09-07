import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import "./css/tailwind.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta
          property="twitter:image"
          content="https://nmkmn.moe/images/bg_1.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="namakemono" />
        <meta property="twitter:description" content="Hi! I'm namakemono :)" />
        <title>nmkmn.moe</title>
        <meta name="description" content="Hi! I'm namakemono :)" />
        <meta name="theme-color" content="#b4f0faa8" />
        <meta property="og:image" content="https://nmkmn.moe/images/bg_1.png" />
        <meta property="og:site_name" content="nmkmn.moe" />
        <meta property="og:title" content="namakemono" />
        <meta property="og:description" content="Hi! I'm namakemono :)" />
        <meta property="og:url" content="https://nmkmn.moe" />

        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
