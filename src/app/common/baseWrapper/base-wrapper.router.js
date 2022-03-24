export const baseWrapperRoutes = [{
    path: '/users',
    name: 'users',
    component: () => import('@/app/users')
},
    ...['/products', '/categories'].map(path => ({
        path,
        name: 'products-and-categories',
        component: () => import('@/app/productsAndCategories/ProductsAndCategories'),
        children: [{
            path: '/products',
            name: 'products',
            component: () => import('@/app/products/Products')
        }, {
            path: '/categories',
            name: 'categories',
            component: () => import('@/app/categories/Categories')
        }]
    }))
]
