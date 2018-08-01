require("ignore-styles");

require("babel-core/register")({
  ignore: [/(node_modules)/],
  presets: ["react"]
});

require("./index");
