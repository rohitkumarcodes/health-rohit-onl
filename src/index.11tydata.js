export default {
  eleventyComputed: {
    title: (data) => data.collections.entries[0]?.data.title,
  },
};
