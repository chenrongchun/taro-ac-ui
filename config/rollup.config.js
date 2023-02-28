import NodePath from "path";
import RollupJson from "@rollup/plugin-json";
import RollupNodeResolve from "@rollup/plugin-node-resolve";
import RollupCommonjs from "@rollup/plugin-commonjs";
import RollupTypescript from "rollup-plugin-typescript2";
import RollupCopy from "rollup-plugin-copy";
import RollupBabel from "rollup-plugin-babel";
import RollupPostCss from "rollup-plugin-postcss";
import RollupReplace from "@rollup/plugin-replace";
import RollupClear from "rollup-plugin-clear";
import { terser } from "rollup-plugin-terser";
import Package from "../package.json";

const resolveFile = (path) => NodePath.resolve(__dirname, "..", path);

const externalPackages = [
  "react",
  "react-dom",
  "@tarojs/components",
  "@tarojs/runtime",
  "@tarojs/taro",
  "@tarojs/react",
];

export default {
  input: resolveFile(Package.source),
  output: [
    {
      file: resolveFile(Package.main),
      format: "cjs",
      sourcemap: true,
    },
    {
      file: resolveFile(Package.module),
      format: "es",
      sourcemap: true,
    },
    {
      file: resolveFile(Package.browser),
      format: "umd",
      name: "@xnfe/apl-taro-order",
      sourcemap: true,
      globals: {
        react: "React",
        "@tarojs/components": "components",
        "@tarojs/taro": "Taro",
      },
    },
  ],
  external: externalPackages,
  plugins: [
    RollupClear({
      targets: ["dist"], // 每次打包清空dist目录，重新生成
      watch: true,
    }),
    RollupPostCss({
      use: [
        [
          "less",
          {
            javascriptEnabled: true,
          },
        ],
      ],
      extract: `style/index.css`,
      extensions: [".css", ".less"],
    }),
    RollupReplace({
      public: "./public", //替换字符用
      include: "src/mta/taroMta.js", //一定要指定include 不是仅仅引用会替换，全部都会
    }),
    RollupNodeResolve({
      customResolveOptions: {
        moduleDirectory: "node_modules",
      },
    }),
    RollupCommonjs({
      include: [/\/node_modules\//],
    }),
    RollupJson(),
    RollupBabel({
      exclude: ["node_modules/**"],
      presets: ["@babel/env", "@babel/preset-react"],
      plugins: ["@babel/plugin-proposal-class-properties"],
      runtimeHelpers: true,
    }),
    RollupTypescript({
      tsconfig: resolveFile("tsconfig.rollup.json"),
    }),
    RollupCopy({
      targets: [
        {
          src: resolveFile("src/style"),
          dest: resolveFile("dist"),
        },
        {
          src: resolveFile("public"),
          dest: resolveFile("dist"),
        },
      ],
    }),
    terser(),
  ],
};
