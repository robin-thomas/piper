const webpack = require("webpack");
const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");

// next.config.js
module.exports = withPlugins([optimizedImages], {
  webpack: config => {
    config.node = {
      console: false,
      fs: "empty",
      net: "empty",
      tls: "empty"
    };

    config.plugins.push(
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    );

    return config;
  },
  exportPathMap: () => {
    return {
      "/": { page: "/" }
    };
  }
});
