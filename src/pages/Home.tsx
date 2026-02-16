import { useState } from "react";
import { HiEye } from "react-icons/hi2";
import Header from "../components/Header";
import MusicPlayer from "../components/MusicPlayer";
import DiscordPresence from "../components/DiscordPresence";
import SplashScreen from "../components/SplashScreen";
import { useTypingTitle } from "../hooks/useTypingTitle";
import { usePageViews } from "../hooks/usePageViews";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { AVATAR_URL, BANNER_URL, BG_IMAGES, BG_DURATION, TYPING_WORDS, socials, subLinks } from "../constants";
import { useTypingRotate } from "../hooks/useTypingRotate";

function Home() {
  useTypingTitle();
  const views = usePageViews();
  const [entered, setEntered] = useState(false);
  const typingText = useTypingRotate(TYPING_WORDS);

  const total = BG_IMAGES.length;

  return (
    <div className="relative min-h-dvh overflow-hidden bg-black">
      {!entered && <SplashScreen onEnter={() => setEntered(true)} />}
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

      <main className="relative z-10 mx-auto flex min-h-dvh max-w-4xl flex-col items-center justify-center px-4 pt-20 pb-16">
        <div className="relative w-full">
          <img
            src="/konata.gif"
            alt="konata"
            className="pointer-events-none absolute -top-17 right-6 z-20 w-24 drop-shadow-lg max-md:w-16 max-md:-top-14 max-md:right-2"
          />

          <div className="flex w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
            <div className="relative h-40 w-full overflow-hidden">
              <img
                src={BANNER_URL}
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/40" />
            </div>

            <div className="flex max-md:flex-col">
              <div className="flex flex-1 flex-col border-r border-white/10 max-md:border-r-0 max-md:border-b">
                <div className="flex items-center gap-1 px-6 pt-3 text-white/40">
                  <HiEye className="h-3.5 w-3.5" />
                  <span className="text-xs tabular-nums">
                    {views !== null ? views.toLocaleString() : "---"}
                  </span>
                </div>

                <div className="flex flex-col items-center px-8">
                  <div className="-mt-17 mb-3 animate-float">
                    <img
                      src={AVATAR_URL}
                      alt="なまけもの"
                      className="h-28 w-28 rounded-full border-4 border-white/10 object-cover shadow-lg"
                    />
                  </div>

                  <h1 className="mb-1 text-3xl font-bold tracking-tight text-white">
                    なまけもの
                  </h1>
                  <p className="h-5 text-sm text-white/40">
                    {typingText}
                    <span className="ml-px inline-block w-px animate-pulse bg-white/40 align-middle" style={{ height: "1em" }} />
                  </p>

                  <div className="mt-4 mb-6 flex items-center gap-3">
                    {socials.map(({ label, url, icon: Icon }) => (
                      <a
                        key={label}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="group relative z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition-all duration-200 hover:bg-white/15 hover:text-white hover:scale-110"
                      >
                        <Icon className="h-5 w-5" />
                        <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white/15 px-2.5 py-1 text-xs text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
                          {label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="mx-6 border-t border-white/10" />

                <div className="px-6 py-5">
                  <MusicPlayer entered={entered} />
                </div>

                <div className="mx-6 border-t border-white/10" />

                <div className="px-6 py-5">
                  <DiscordPresence />
                </div>
              </div>

              <div className="flex w-80 shrink-0 flex-col max-md:w-full">
                <div className="px-5 py-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                    Links
                  </p>
                  <div className="flex flex-col gap-2">
                    {subLinks.map(({ label, url }) => (
                      <a
                        key={label}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-all duration-200 hover:bg-white/10 hover:scale-[1.02]"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-white/90">
                            {label}
                          </p>
                        </div>
                        <HiArrowTopRightOnSquare className="ml-3 h-4 w-4 shrink-0 text-white/30 transition-colors group-hover:text-white/60" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
