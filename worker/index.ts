interface Env {
  ASSETS: Fetcher;
  VIEWS: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/views" && request.method === "GET") {
      const key = "page_views";
      const current = Number(await env.VIEWS.get(key)) || 0;
      const next = current + 1;
      await env.VIEWS.put(key, String(next));
      return Response.json({ views: next });
    }

    return env.ASSETS.fetch(request);
  },
};
