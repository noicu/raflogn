import { defaultTheme, defineUserConfig } from "vuepress";
import { path } from "@vuepress/utils";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";

export default defineUserConfig({
    lang: "en-US",
    title: "RaflognJS",
    description: "Graph / node editor in the browser using VueJS",

    theme: defaultTheme({
        repo: "https://github.com/noicu/raflogn",
        navbar: [
            {
                text: "API Reference",
                link: "/api-reference.md",
            },
        ],
        sidebar: [
            "/getting-started.md",
            "/core-concepts.md",
            {
                text: "Nodes",
                children: [
                    "/nodes/nodes.md",
                    "/nodes/interfaces.md",
                    "/nodes/pre-defined-interfaces.md",
                    "/nodes/interface-types.md",
                    "/nodes/lifecycle.md",
                    "/nodes/dynamic-nodes.md",
                ],
            },
            {
                text: "Editor",
                children: ["/editor/registering-nodes.md", "/editor/subgraphs.md"],
            },
            {
                text: "Visual Editor",
                children: [
                    "/visual-editor/setup.md",
                    "/visual-editor/commands.md",
                    "/visual-editor/toolbar.md",
                    "/visual-editor/customization.md",
                ],
            },
            {
                text: "Graph Execution",
                children: ["/execution/setup.md", "/execution/dependency.md", "/execution/forward.md"],
            },
            "/event-system.md",
            "/browser-build.md",
            "/migration.md",
        ],
    }),

    plugins: [
        registerComponentsPlugin({
            components: {
                StaticLink: path.resolve(__dirname, "./components/StaticLink.vue"),
                ApiLink: path.resolve(__dirname, "./components/ApiLink.vue"),
                Mermaid: path.resolve(__dirname, "./components/Mermaid.vue"),
            },
        }),
    ],
});
