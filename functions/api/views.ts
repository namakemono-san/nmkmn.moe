export const onRequestGet: PagesFunction<{ VIEWS: KVNamespace }> = async ({ env }) => {
  const key = "page_views";
  const current = Number(await env.VIEWS.get(key)) || 0;
  const next = current + 1;
  await env.VIEWS.put(key, String(next));
  return Response.json({ views: next });
};
