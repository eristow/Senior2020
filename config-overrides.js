const webpack = require("webpack");

module.exports = function override(config, env) {
  // Extend the config to work with the videojs-wavesurfer project without ejecting create react app.
  // Reference: https://github.com/collab-project/videojs-wavesurfer/wiki/React
  const videojsPlugin = new webpack.ProvidePlugin({
    videojs: "video.js/dist/video.cjs.js"
  });
  const videojsAlias = {
    videojs: "video.js",
    WaveSurfer: "wavesurfer.js"
  };
  config.resolve.alias = { ...config.resolve.alias, ...videojsAlias };
  config.plugins.push(videojsPlugin);
  return config;
};
