export const loader = () => {
  const content = "dh=7fccce7e28c369c05310b1703d701323a27a08ea";

  return new Response(content, {
    status: 200,
    headers: { "Content-Type": "plain/text" },
  });
};
