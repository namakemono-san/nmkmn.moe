import { useEffect } from "react";
import { Link } from "react-router";
import Header from "../components/Header";
import { allPostMetas } from "../lib/posts";
import { BG_IMAGES, BG_DURATION } from "../constants";

function BlogList() {
  useEffect(() => { document.title = "Blog - nmkmn.moe"; }, []);
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
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-white">
          Blog
        </h1>

        <div className="flex flex-col gap-4">
          {allPostMetas.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-200 hover:bg-white/10 hover:scale-[1.01]"
            >
              <div className="mb-2 flex items-center gap-3">
                <time className="text-xs text-white/40">{post.date}</time>
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <h2 className="mb-2 text-lg font-semibold text-white/90 transition-colors group-hover:text-white">
                {post.title}
              </h2>

              <p className="text-sm leading-relaxed text-white/50">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>

        {allPostMetas.length === 0 && (
          <p className="text-center text-white/40">No posts yet.</p>
        )}
      </main>
    </div>
  );
}

export default BlogList;
