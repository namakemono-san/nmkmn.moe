import { Link } from "react-router";
import Header from "../components/Header";
import { BG_IMAGES, BG_DURATION } from "../constants";

function NotFound() {
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

      <main className="relative z-10 mx-auto flex min-h-dvh max-w-3xl flex-col items-center justify-center px-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-12 py-16 text-center backdrop-blur-xl">
          <p className="mb-2 text-7xl font-bold tracking-tighter text-white/10">
            404
          </p>
          <h1 className="mb-3 text-xl font-bold tracking-tight text-white">
            ページが見つかりません
          </h1>
          <p className="mb-6 text-sm text-white/50">
            お探しのページは存在しないか、移動した可能性があります。
          </p>
          <Link
            to="/"
            className="inline-block rounded-xl border border-white/10 bg-white/5 px-6 py-2 text-sm text-white/70 transition-all duration-200 hover:bg-white/15 hover:text-white"
          >
            ホームに戻る
          </Link>
        </div>
      </main>
    </div>
  );
}

export default NotFound;
