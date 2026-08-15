import { DateTime } from "luxon";

const TIME_ZONE = "Asia/Kolkata";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");

  eleventyConfig.addDateParsing(function (dateValue) {
    let localDate;
    if (dateValue instanceof Date) {
      localDate = DateTime.fromJSDate(dateValue, { zone: "utc" }).setZone(
        TIME_ZONE,
        { keepLocalTime: true },
      );
    } else if (typeof dateValue === "string") {
      localDate = DateTime.fromISO(dateValue, { zone: TIME_ZONE });
    }
    if (localDate?.isValid === false) {
      throw new Error(
        `Invalid date value (${dateValue}) in ${this.page.inputPath}: ${localDate.invalidReason}`,
      );
    }
    return localDate;
  });

  eleventyConfig.addFilter("dateFormat", (date) => {
    return DateTime.fromJSDate(date, { zone: TIME_ZONE }).toFormat(
      "yyyy-MM-dd",
    );
  });

  eleventyConfig.addFilter("dateDisplay", (date) => {
    return DateTime.fromJSDate(date, { zone: TIME_ZONE }).toFormat(
      "ccc yyyy-MM-dd",
    );
  });

  eleventyConfig.addFilter("entryNeighbors", (entries, url) => {
    const index = entries.findIndex((entry) => entry.url === url);
    if (index === -1) {
      return { previous: null, next: null };
    }
    return {
      previous: entries[index + 1] ?? null,
      next: index > 0 ? entries[index - 1] : null,
    };
  });

  eleventyConfig.addCollection("entries", (api) => {
    const now = new Date();
    return api
      .getFilteredByGlob("./src/entries/*.md")
      .filter((item) => item.date <= now)
      .sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
