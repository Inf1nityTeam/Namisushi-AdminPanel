import { reactive } from 'vue'
import axios from "axios";
import { AUTH } from "@/store/authentification";

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

    // await axios.get('/api/admin/products')
    //     .then((response) => {
    //         const tr = response.data.find(el => el.tittle === "roll")._id
    //         axios.delete('/api/admin/product/' + tr)
    //     })

    const payload = { limit: productsState.currentLimit, page: productsState.currentPage }
    if (productsState.activeCategoryId) payload.category = productsState.activeCategoryId
    await axios.get('/api/admin/products', { params: payload })
        .then(response => {
            productsState.productsList = JSON.parse(JSON.stringify(response.data.products))
            productsState.productsCount = response.data.total
            console.log(productsState.productsList);
        }).then(() => {
            productsState.showProducts = true
        })
}

export async function UPDATE_PRODUCT_STATUS(product) {
    const productId = product._id
    await axios.patch(`/api/admin/product/${productId}`, { show: !product.show })
        .then(() => {
            productsState.productsList.find(el => el._id === productId).show = !product.show
        })
}

export async function CREATE_PRODUCT(product) {
    console.log('productState')
    console.log(product)
    await axios.post('/api/admin/product/default', product)
        .then((response) => {
            console.log(response)
        })
        .catch(reject => console.log(reject))

    // console.log('state')
    // console.log(product)
}