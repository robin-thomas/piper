// next.config.js
module.exports = {
  webpack: config => {
    config.node = {
      console: false,
      fs: "empty",
      net: "empty",
      tls: "empty"
    };

    return config;
  },
  exportPathMap: () => {
    return {
      "/": { page: "/" }
    };
  }
};
