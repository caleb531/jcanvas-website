// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  singleQuote: true,
  trailingComma: "none",
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
