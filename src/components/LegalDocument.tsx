import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "./Header";
import { BG_IMAGES, BG_DURATION } from "../constants";

type LegalDocumentProps = {
  appName: string;
  documentTitle: string;
  lastUpdated: string;
  content: string;
};

function LegalDocument({ appName, documentTitle, lastUpdated, content }: LegalDocumentProps) {
  useEffect(() => {
    document.title = `${appName} ${documentTitle} - nmkmn.moe`;
  }, [appName, documentTitle]);

  const total = BG_IMAGES.length;

  return (
    <div className="relative min-h-dvh overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-0">
        {BG_IMAGES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover blur-2xl brightness-50 saturate-150 scale-110 animate-slideshow"
            style={{ animationDelay: `${(BG_DURATION / total) * i}s` }}
          />
        ))}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <Header />

      <main className="relative z-10 mx-auto min-h-dvh max-w-3xl px-4 pt-24 pb-16">
        <article className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl max-md:p-6">
          <header className="mb-8">
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-white">
              {appName}
            </h1>
            <p className="text-lg text-white/70">{documentTitle}</p>
            <time className="mt-3 block text-sm text-white/40">
              最終更新日: {lastUpdated}
            </time>
          </header>

          <div className="prose overflow-x-auto">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        </article>
      </main>
    </div>
  );
}

export default LegalDocument;
