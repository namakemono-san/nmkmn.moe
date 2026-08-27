import { useEffect } from "react";
import { Link } from "react-router";
import { FaGithub } from "react-icons/fa6";
import Header from "../components/Header";
import { BG_IMAGES, BG_DURATION } from "../constants";

const APP_NAME = "YMM4 Cloud Sync";
const REPO_URL = "https://github.com/namakemono-san/YMM4-CloudSync";

const features = [
  {
    title: "プロジェクトのクラウド同期",
    body: "YukkuriMovieMaker 4 のプロジェクトを素材ごと 1 つの .ymmx にまとめてクラウドへ保存し、別の PC で開き直せます。",
  },
  {
    title: "素材ライブラリ",
    body: "クラウド上の素材フォルダーをエクスプローラー風にブラウズし、ダウンロードした素材をタイムラインへドラッグして配置できます。",
  },
  {
    title: "ローカル書き出し",
    body: "クラウドと連携せずに、プロジェクトを .ymmx ファイルとして書き出して配布・受け渡しに使えます。",
  },
];

const services = ["Google ドライブ", "OneDrive", "Dropbox", "WebDAV"];

function Ymm4() {
  useEffect(() => {
    document.title = `${APP_NAME} - nmkmn.moe`;
  }, []);

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
        <section className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl max-md:p-6">
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-white max-md:text-3xl">
            {APP_NAME}
          </h1>
          <p className="mb-6 text-white/70">
            YukkuriMovieMaker 4 のプロジェクトと素材を、お使いのクラウドストレージと同期・管理するためのプラグインです。
          </p>

          <a
            href={`${REPO_URL}/releases`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/20"
          >
            <FaGithub className="h-4 w-4" />
            ダウンロード (GitHub Releases)
          </a>
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl max-md:p-6">
          <h2 className="mb-5 text-xl font-bold tracking-tight text-white">機能</h2>
          <ul className="flex flex-col gap-5">
            {features.map((feature) => (
              <li key={feature.title}>
                <p className="mb-1 font-semibold text-white/90">{feature.title}</p>
                <p className="text-sm leading-relaxed text-white/60">{feature.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl max-md:p-6">
          <h2 className="mb-5 text-xl font-bold tracking-tight text-white">対応クラウドサービス</h2>
          <div className="mb-6 flex flex-wrap gap-2">
            {services.map((service) => (
              <span
                key={service}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70"
              >
                {service}
              </span>
            ))}
          </div>

          <h3 className="mb-2 text-base font-semibold text-white/90">
            Google ドライブへのアクセスについて
          </h3>
          <p className="text-sm leading-relaxed text-white/60">
            本プラグインは、利用者の Google ドライブ上に置かれたプロジェクトと素材を一覧・取得し、
            利用者の PC 上のフォルダーへ同期します。利用者がブラウザや Google ドライブアプリで
            配置したファイルも扱う必要があるため、
            <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-xs text-white/80">
              https://www.googleapis.com/auth/drive
            </code>
            の権限を要求します。取得したデータは利用者の PC 上にのみ保存され、開発者のサーバーへ
            送信されることはありません。
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl max-md:p-6">
          <h2 className="mb-4 text-xl font-bold tracking-tight text-white">規約とポリシー</h2>
          <div className="flex flex-col gap-2">
            <Link
              to="/ymm4/privacy-policy"
              className="text-sm text-blue-300/90 underline underline-offset-2 transition-colors hover:text-blue-200"
            >
              プライバシーポリシー / Privacy Policy
            </Link>
            <Link
              to="/ymm4/terms-of-service"
              className="text-sm text-blue-300/90 underline underline-offset-2 transition-colors hover:text-blue-200"
            >
              利用規約 / Terms of Service
            </Link>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-blue-300/90 underline underline-offset-2 transition-colors hover:text-blue-200"
            >
              ソースコード (GitHub)
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Ymm4;
