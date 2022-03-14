import {reactive} from 'vue'

export const productsState = reactive({
    loading: false,
    products: [],
    totalProductsCount: 0,
    limit: 5,
    searchData: {
        title: "",
        categories: []
    }
})
