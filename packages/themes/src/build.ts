import * as fs from "fs";
import * as path from "path";
import * as sass from "sass";
import rimraf from "rimraf";

const OUTPUT_DIR = path.resolve("./dist");

const THEMES = ["classic", "syrup-dark"];

function buildTheme(name: string) {
    console.log("Building", name);
    const outFile = path.resolve("dist", `${name}.css`);
    const result = sass.renderSync({
        file: path.resolve("src", name, "all.scss"),
        outFile,
    });
    fs.writeFileSync(outFile, result.css);
}

function build() {
    rimraf.sync(OUTPUT_DIR);
    fs.mkdirSync(OUTPUT_DIR);
    for (const theme of THEMES) {
        buildTheme(theme);
    }
}

build();
