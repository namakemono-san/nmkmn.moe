import { useEffect, useState } from "react";

export function usePageViews() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/views")
      .then((res) => res.json())
      .then((data: { views: number }) => setViews(data.views))
      .catch(() => {});
  }, []);

  return views;
}
