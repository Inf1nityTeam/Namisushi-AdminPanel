import {reactive} from 'vue'

export const productsState = reactive({
    loading: false,
    products: {
        allProducts: [],
        filteredProducts: []
    },
    searchData: {
        title: "",
        category: ""
    }
})
