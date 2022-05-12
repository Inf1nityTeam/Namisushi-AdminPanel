import {reactive} from 'vue'

export const productsState = reactive({
    loading: false,
    products: [],
    product: null,
    searchData: {
        title: "",
        category: ""
    }
})
