export const baseWrapperRoutes = [{
    path: '/users',
    name: 'users',
    component: () => import('@/app/users')
}, {
    path: '/products',
    name: 'products',
    meta:{layout:'GroupWrapper'},
    component: () => import('@/app/product_&_category/products/Products.vue')
}, {
    path: '/categories',
    name: 'categories',
    meta:{layout:'GroupWrapper'},
    component: () => import('@/app/product_&_category/categories/Categories.vue')
}]
