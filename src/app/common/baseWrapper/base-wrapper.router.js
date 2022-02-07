export const baseWrapperRoutes = [{
    path: '/users',
    name: 'users',
    component: () => import('@/app/users')
}, {
    path: '/products',
    name: 'products',
    component: () => import('@/app/products/Products')
}, {
    path: '/categories',
    name: 'categories',
    meta:{layout:'GroupWrapper'},
    component: () => import('@/app/product_&_category/categories/Categories.vue')
}]
