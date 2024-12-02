import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import "./css/index.css";

export const meta: MetaFunction = () => {
  return [
    { property: "og:site_name", content: "nmkmn.moe" },
    { property: "og:title", content: "namakemono" },
    {
      property: "og:description",
      content: "Hi! I'm namakemono :)",
    },
    {
      property: "og:url",
      content: "https://nmkmn.moe",
    },
    {
      property: "og:type",
      content: "website",
    },
    { property: "og:image", content: "https://nmkmn.moe/images/bg_1.png" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "namakemono" },
    { name: "twitter:description", content: "Hi! I'm namakemono :)" },
    { name: "twitter:image", content: "https://nmkmn.moe/images/bg_1.png" },
    { title: "nmkmn.moe" },
    {
      name: "description",
      content: "Hi! I'm namakemono :)",
    },
    {
      name: "theme-color",
      content: "#b4f0fa",
    },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
