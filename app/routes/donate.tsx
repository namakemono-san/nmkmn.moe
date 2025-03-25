// app/routes/old-route.tsx
import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  return redirect("https://ko-fi.com/namakemono_san");
}

export default function Route() {
  return (
    <div></div>
  );
}
