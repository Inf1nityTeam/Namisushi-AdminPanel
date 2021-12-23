export const baseWrapperRoutes = [{
    path: '/users',
    name: 'users',
    component: () => import('@/app/users')
}, {
    path: '/products',
    name: 'products',
    component: () => import('@/app/products/Products')
}]
