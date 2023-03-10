import { createRouter, createWebHistory } from "vue-router";

let routes = [
  {
    path: "/",
    name: "home",
    //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
    component: () => import("@/views/login/index.vue"),
  },
  {
    //   配置404页面
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import("@/views/404.vue"),
  },
  {
    //   配置404页面
    path: "/pinia",
    name: "pinia",
    component: () => import("@/views/Pinia.vue"),
  },
];
// 路由
const router = createRouter({
  history: createWebHistory(),
  routes,
});
// 导出
export default router;
