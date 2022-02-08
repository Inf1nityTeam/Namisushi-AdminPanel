export const baseWrapperRoutes = [{
    path: '/users',
    name: 'users',
    component: () => import('@/app/users/Users')
}, {
    path: '/products',
    name: 'products',
    component: () => import('@/app/products/Products')
}, {
    path: '/categories',
    name: 'categories',
    component: () => import('@/app/categories/Categories')
}]
