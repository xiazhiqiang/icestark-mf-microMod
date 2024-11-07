const buildPluginStarkModule = require("build-plugin-stark-module").default;
const fse = require("fs-extra");
const path = require("path");

module.exports = (props) => {
  const { context, onGetWebpackConfig, onHook } = props;
  const { command, rootDir } = context;

  const buildPluginStarkModuleConfig = {
    filenameStrategy: "modules/[name]",
    // moduleExternals: {
    //   react: {
    //     root: "React",
    //     url: "https://unpkg.com/react@16.14.0/umd/react.production.min.js",
    //   },
    //   "react-dom": {
    //     root: "ReactDOM",
    //     url: "https://unpkg.com/react-dom@16.14.0/umd/react-dom.production.min.js",
    //   },
    //   lodash: {
    //     root: "_",
    //     url: "https://unpkg.com/lodash@4.17.21/lodash.js",
    //   },
    //   moment: {
    //     root: "moment",
    //     url: "https://unpkg.com/moment@2.29.1/min/moment.min.js",
    //   },
    // },
  };

  if (command === "build") {
    // 修改build-plugin-stark-module插件配置
    buildPluginStarkModuleConfig.outputDir = "build"; // 构建产物umd放到build目录下面
  }
  buildPluginStarkModule(props, buildPluginStarkModuleConfig);

  onGetWebpackConfig((config) => {
    // 构建读取publicPath
    config.output.publicPath(
      process.env.NODE_ENV === "production" ? "http://localhost:8883/" : "/"
    );
  });

  // do something before build
  onHook("before.build.load", () => {
    // 清空构建目录
    const buildTargets = ["dist", "build"];
    buildTargets.forEach((target) => {
      const destPath = path.join(rootDir, target);
      fse.emptyDirSync(destPath);
    });
  });

  // do something after build
  onHook("after.build.compile", (stats) => {
    // // 将config.json 拷贝到build目录下
    // fse.writeFileSync(
    //   path.join(rootDir, "build/config.json"),
    //   JSON.stringify(StepConfig)
    // );
  });
};
