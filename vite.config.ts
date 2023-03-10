import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import type { UserConfig, ConfigEnv } from "vite";
import { loadEnv } from "vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
//引入核心ts文件
import { createSvg } from "./src/components/SvgIcon/svgFn";
// https://vitejs.dev/config/
const root = process.cwd();
export default ({ command, mode }: ConfigEnv): UserConfig => {
  // 获取 .env 环境配置文件
  let env = {} as any;
  const isBuild = command === "build";
  if (!isBuild) {
    env = loadEnv(
      process.argv[3] === "--mode" ? process.argv[4] : process.argv[3],
      root
    );
  } else {
    env = loadEnv(mode, root);
  }

  console.log(env);
  return {
    plugins: [
      vue(),
      AutoImport({
        //安装两行后你会发现在组件中不用再导入ref，reactive等
        imports: ["vue", "vue-router"],
        //存放的位置
        dts: "src/auto-import.d.ts",

        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        // 引入组件的,包括自定义组件
        // 存放的位置
        dts: "src/components.d.ts",
      }),
      createSvg("./src/icons/svg/"),
    ],
    resolve: {
      // ↓路径别名
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    // resolve: {
    //   alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
    // },
    server: {
      host: "0.0.0.0",
      // port: Number(env.VITE_APP_PORT),
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 匹配请求路径，
          target: "http://10.254.13.28:5006/", // 代理的目标地址
          // 开发模式，默认的127.0.0.1,开启后代理服务会把origin修改为目标地址
          changeOrigin: true,
          // secure: true, // 是否https接口
          // ws: true, // 是否代理websockets

          // 路径重写，**** 如果你的后端有统一前缀(如:/api)，就不开启；没有就开启
          //简单来说，就是是否改路径 加某些东西
          rewrite: (path) =>
            path.replace(new RegExp("^" + env.VITE_APP_BASE_API), ""),
        },
      },
    },
  };
};
