import path from "node:path";

export default {
  layout: "entry.njk",
  eleventyComputed: {
    permalink: (data) => {
      if (data.page.date > new Date()) {
        return false;
      }
      const slug = path.basename(data.page.inputPath, path.extname(data.page.inputPath));
      return `/log/${slug}/`;
    },
    crumb: (data) => data.title,
  },
};
