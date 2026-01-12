export default function(eleventyConfig) {
  // Watch targets for external build pipelines
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addWatchTarget("./src/js/");

  eleventyConfig.addPassthroughCopy("src/assets"); // Example if assets exist

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
