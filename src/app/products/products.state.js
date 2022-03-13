import {reactive} from 'vue'

export const productsState = reactive({
    loading: false,
    products: [],
    totalProductsCount: 0,
    searchData: {
        title: "",
        categories: []
    }
})
