import {reactive} from 'vue'

export const productsState = reactive({
    loading: false,
    products: [],
    totalProductsCount: 0,
    pagination: {
        limit: 5,
        currentPage: 1
    },
    searchData: {
        title: "",
        category: ""
    }
})
