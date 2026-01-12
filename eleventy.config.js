import fs from "fs";
import path from "path";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";
import esbuild from "esbuild";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function (eleventyConfig) {
  // Watch targets for external build pipelines
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addWatchTarget("./src/js/");

  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.on("eleventy.before", async () => {
    const tailwindInputPath = path.resolve("./src/css/style.css");
    const tailwindOutputPath = "./dist/css/style.css";

    const cssContent = fs.readFileSync(tailwindInputPath, "utf8");
    const outputDir = path.dirname(tailwindOutputPath);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const result = await postcss([tailwindcss(), autoprefixer()]).process(
      cssContent,
      {
        from: tailwindInputPath,
        to: tailwindOutputPath,
      }
    );

    await esbuild.build({
      entryPoints: ["./src/js/app.js"],
      bundle: true,
      outfile: "./dist/js/app.js",
      sourcemap: true,
    });

    fs.writeFileSync(tailwindOutputPath, result.css);
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
