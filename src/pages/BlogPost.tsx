import { useParams, Link } from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "../components/Header";
import { getPostBySlug } from "../lib/posts";
import { BG_IMAGES, BG_DURATION } from "../constants";

function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
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
        <Link
          to="/blog"
          className="mb-6 inline-flex items-center gap-1 text-sm text-white/40 transition-colors hover:text-white/70"
        >
          ← 記事一覧に戻る
        </Link>

        {post ? (
          <article className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl max-md:p-6">
            <header className="mb-8">
              <h1 className="mb-3 text-3xl font-bold tracking-tight text-white">
                {post.title}
              </h1>
              <div className="flex items-center gap-3">
                <time className="text-sm text-white/40">{post.date}</time>
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
            </header>

            <div className="prose">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>
          </article>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
            <p className="text-white/50">記事が見つかりませんでした。</p>
            <Link
              to="/blog"
              className="mt-4 inline-block text-sm text-white/40 transition-colors hover:text-white/70"
            >
              ← 記事一覧に戻る
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

export default BlogPost;
