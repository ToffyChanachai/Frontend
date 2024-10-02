import { createRouter, createWebHistory } from "vue-router";
import TodoList from "./components/TodoList.vue";
import About from "./components/About.vue";

const routes = [
  { path: "/", component: TodoList },
  { path: "/about", component: About },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
