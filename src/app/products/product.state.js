import {reactive} from 'vue'
import axios from "axios";
import {AUTH} from "@/store/authentification";

export const productsState = reactive({
    productsList: [],
    productsCount: null,
    showProducts: false,
    activeCategoryId: null,
    currentLimit: 2,
    currentPage: 1
})

export async function GET_PRODUCTS() {
    await AUTH()
    const payload = {limit: productsState.currentLimit, page: productsState.currentPage}
    if (productsState.activeCategoryId) payload.category = productsState.activeCategoryId
    await axios.get('/api/admin/products', {params: payload})
        .then(response => {
            productsState.productsList = (response.data.products)
            productsState.productsCount = response.data.total
        }).then(() => {
            productsState.showProducts = true
        })
}

export async function UPDATE_PRODUCT_STATUS(product) {
    const productId = product._id
    await axios.patch(`/api/admin/product/${productId}`, {show: !product.show})
        .then(() => {
            productsState.productsList.find(el => el._id === productId).show = !product.show
        })
}