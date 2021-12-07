import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from "../app/loginPage";

const routes = [
    {
        path: '/login',
        name: 'login-page',
        component: LoginPage
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
