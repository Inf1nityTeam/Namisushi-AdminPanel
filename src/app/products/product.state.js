import {reactive} from 'vue'
import products from "./products.json"

export const productsState = reactive({
    productsList: [],
    productsCount: null,
    currentProducts:[]
})

export function GET_PRODUCTS() {
    productsState.productsList = JSON.parse(JSON.stringify(products.products))
    productsState.productsList.forEach((el, i) => el.indexNum = i + 1)
    productsState.productsCount = JSON.parse(JSON.stringify(products.total))
}

export function GET_CURRENT_PRODUCT_LIST(startPosition,endPosition){
    productsState.currentProducts = JSON.parse(JSON.stringify(productsState.productsList.slice(startPosition, endPosition)))
}