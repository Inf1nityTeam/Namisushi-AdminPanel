import {reactive} from 'vue'

export const productsState = reactive({
    loading: false,
    products: [],
    searchData: {
        title: "",
        category: ""
    }
})
