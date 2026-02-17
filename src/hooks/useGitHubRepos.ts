import { useEffect, useState } from "react";
import type { Project } from "../constants";

export interface RepoInfo {
  stars: number;
  description: string;
  topics: string[];
}

const CACHE_KEY = "gh_repos";
const CACHE_TTL = 1000 * 60 * 10;

function loadCache(): { ts: number; data: Record<string, RepoInfo> } | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.ts < CACHE_TTL) return parsed;
  } catch { /* ignore */ }
  return null;
}

function saveCache(data: Record<string, RepoInfo>) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  } catch { /* ignore */ }
}

export function useGitHubRepos(projects: Project[]) {
  const [repos, setRepos] = useState<Record<string, RepoInfo>>(() => {
    return loadCache()?.data ?? {};
  });

  useEffect(() => {
    const cached = loadCache();
    if (cached) {
      setRepos(cached.data);
      return;
    }

    const controller = new AbortController();

    async function fetchAll() {
      const results: Record<string, RepoInfo> = {};

      await Promise.allSettled(
        projects.map(async (p) => {
          try {
            const res = await fetch(
              `https://api.github.com/repos/${p.repo}`,
              {
                signal: controller.signal,
                headers: { Accept: "application/vnd.github.mercy-preview+json" },
              },
            );
            if (!res.ok) return;
            const data = await res.json();
            results[p.repo] = {
              stars: data.stargazers_count,
              description: data.description ?? "",
              topics: data.topics ?? [],
            };
          } catch {
            // ignore
          }
        }),
      );

      if (!controller.signal.aborted && Object.keys(results).length > 0) {
        saveCache(results);
        setRepos(results);
      }
    }

    fetchAll();
    return () => controller.abort();
  }, [projects]);

  return repos;
}
