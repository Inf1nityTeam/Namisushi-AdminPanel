import {createRouter, createWebHistory} from 'vue-router'

import LoginPage from "../app/loginPage/LoginPage";
import BaseWrapper from "../app/baseWrapper/BaseWrapper";
import {baseWrapperRoutes} from "../app/baseWrapper/base-wrapper.router";

const routes = [{
    path: '/login',
    name: 'login-page',
    component: LoginPage
}, {
    path: '/',
    name: 'base-wrapper',
    component: BaseWrapper,
    children: baseWrapperRoutes
}]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
