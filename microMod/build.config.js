module.exports = {
  // externals:
  //   process.env.NODE_ENV === "production"
  //     ? {
  //         react: "React",
  //         "react-dom": "ReactDOM",
  //         lodash: "_",
  //         moment: "moment",
  //         "@alifd/next": "Next",
  //       }
  //     : {},
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    lodash: "_",
    moment: "moment",
    "@alifd/next": "Next",
  },
  plugins: [
    [
      "build-plugin-component",
      // {
      //   "disableGenerateStyle": true
      // }
    ],
    // ["build-plugin-stark-module"],
    ["build-plugin-css-assets-local", { activeInDev: true }],
    // [
    //   "build-plugin-restart",
    //   { "watchPatterns": ["plugin/**", "package.json"] }
    // ],
    ["./plugin.js"],
  ],
};
