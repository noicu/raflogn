/// <reference types="@types/node" />

import * as path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "RaflognJSRendererVue",
            fileName: (format) => `renderer-vue.${format}.js`,
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                globals: {
                    vue: "Vue",
                },
            },
        },
    },
    plugins: [
        vue(),
        visualizer({
            filename: "dist/report.html",
        }),
    ],
    server: {
        fs: {
            allow: ["../.."],
        },
    },
});
