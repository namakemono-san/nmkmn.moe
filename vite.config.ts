import { vitePlugin as remix } from "@remix-run/dev";

//@ts-expect-error 形宣言エラーが出るため
import { defineConfig } from "vite";
//@ts-expect-error 形宣言エラーが出るため
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
  resolve: {
      alias: {
          "@": "./app/",
      },
  },
});
