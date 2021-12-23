import {reactive} from 'vue'
import axios from "axios";
import {AUTH} from "@/store/authentification";

export const productsState = reactive({
    productsList: [],
    productsCount: null
})

export async function GET_PRODUCTS(limit, page) {
    await AUTH()
        //await axios.get('/api/admin/products', {params: {limit, page}})
    await axios.get('/api/products', {params: {limit, page}})
        .then(response => {
            productsState.productsList = response.data.products
            productsState.productsCount = response.data.total
            console.log(productsState.productsList)
        })
}