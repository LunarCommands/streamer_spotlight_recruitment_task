const autoprefixer = require("autoprefixer");
const tailwindcss = require("tailwindcss");

module.exports = function override(config) {
  config.module.rules.push({
    test: /\.css$/,
    use: [
      {
        loader: "postcss-loader",
        options: {
          postcssOptions: {
            plugins: [tailwindcss, autoprefixer],
          },
        },
      },
    ],
  });

  return config;
};
