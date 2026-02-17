import { useEffect } from "react";
import { FaCode, FaStar, FaArrowUpRightFromSquare, FaBookOpen, FaPlay } from "react-icons/fa6";
import Header from "../components/Header";
import { BG_IMAGES, BG_DURATION, projects } from "../constants";
import { useGitHubRepos } from "../hooks/useGitHubRepos";

function Projects() {
  useEffect(() => { document.title = "Projects - nmkmn.moe"; }, []);
  const total = BG_IMAGES.length;
  const repos = useGitHubRepos(projects);

  return (
    <div className="relative min-h-dvh overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-0">
        {BG_IMAGES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl brightness-50 saturate-150 animate-slideshow"
            style={{ animationDelay: `${(BG_DURATION / total) * i}s` }}
          />
        ))}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <Header />

      <main className="relative z-10 mx-auto max-w-3xl px-4 pt-24 pb-16">
        <h1 className="mb-8 animate-fade-in-up text-3xl font-bold tracking-tight text-white">
          Projects
        </h1>

        <div className="flex flex-col gap-4">
          {projects.map((project, i) => {
            const info = repos[project.repo];

            return (
              <div
                key={project.repo}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl animate-fade-in-up"
                style={{ animationDelay: `${(i + 1) * 80}ms` }}
              >
                {/* Left: content */}
                <div className="min-w-0 flex-1">
                  {/* Name */}
                  <h2 className="text-base font-semibold text-white">
                    {project.name}
                  </h2>

                  {/* Description from GitHub */}
                  {info?.description && (
                    <p className="mt-0.5 text-sm leading-snug text-white/50">
                      {info.description}
                    </p>
                  )}

                  {/* Topics from GitHub */}
                  {info?.topics && info.topics.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {info.topics.map((topic) => (
                        <span
                          key={topic}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/50"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: stars top, buttons bottom */}
                <div className="flex shrink-0 flex-col items-end justify-between">
                  {info != null ? (
                    <span className="flex items-center gap-1 text-sm tabular-nums text-white/40">
                      <FaStar className="text-xs text-yellow-500/70" />
                      {info.stars}
                    </span>
                  ) : <span />}

                  <div className="flex gap-1.5">
                    <a
                      href={`https://github.com/${project.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/50 transition-colors duration-150 hover:bg-white/10 hover:text-white/90"
                    >
                      <FaCode className="text-sm" />
                      Source
                    </a>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/50 transition-colors duration-150 hover:bg-white/10 hover:text-white/90"
                      >
                        <FaArrowUpRightFromSquare className="text-[11px]" />
                        Open
                      </a>
                    )}
                    {project.blog && (
                      <a
                        href={project.blog}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/50 transition-colors duration-150 hover:bg-white/10 hover:text-white/90"
                      >
                        <FaBookOpen className="text-[11px]" />
                        Blog
                      </a>
                    )}
                    {project.video && (
                      <a
                        href={project.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/50 transition-colors duration-150 hover:bg-white/10 hover:text-white/90"
                      >
                        <FaPlay className="text-[10px]" />
                        Video
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {projects.length === 0 && (
          <p className="text-center text-white/40">No projects yet.</p>
        )}
      </main>
    </div>
  );
}

export default Projects;
