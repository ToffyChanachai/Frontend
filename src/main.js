// import { createApp } from 'vue'
// import App from './App.vue'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import './assets/styles.css';
// import router from './router';

// createApp(App).mount('#app')

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles.css";

createApp(App).use(router).mount("#app");
