import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routes/index";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
const pinia = createPinia();
import "@/styles/index.scss"; // 全局 css
pinia.use(piniaPersist);
createApp(App).use(router).use(pinia).mount("#app");
