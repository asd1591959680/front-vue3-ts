import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes/index";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
const pinia = createPinia();
import "@/styles/index.scss"; // 全局 css
import svgIcon from "@/components/SvgIcon/index.vue";
pinia.use(piniaPersist);
createApp(App)
  .use(router)
  .use(pinia)
  .component("svg-icon", svgIcon)
  .mount("#app");
