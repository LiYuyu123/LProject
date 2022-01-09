import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/Login')
  },
  {
    path: "/404",
    component: () => import("../views/404"),
  },
  { path: "/:pathMatch(.*)*", redirect: "/404" }, //错误页面重定象
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
