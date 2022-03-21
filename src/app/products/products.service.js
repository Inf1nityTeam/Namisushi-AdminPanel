import ProductsRepository from "@/app/products/products.repository";
import {copyDeep} from "@/utils/copy-deep";
import {notificationsHelper} from "@/helpers/notifications.helper";
import {productsState} from "@/app/products/products.state";

export default class ProductsService {

    #repository = new ProductsRepository()

    _sanitizeProduct(product) {
        const formData = new FormData()
        const productCopy = copyDeep(product)

        for (let i = 0; i < productCopy.images.length; ++i) {
            const image = productCopy.images[i].image

            if (typeof image !== 'string') {
                formData.append('images', image)
            }
        }

        delete productCopy.images
        delete productCopy._id

        if (!productCopy.description) {
            delete productCopy.description
        }

        formData.append('data', JSON.stringify(productCopy))

        return formData
    }

    async getProducts(params) {
        const paramsCopy = copyDeep(params)
        for (let key in paramsCopy) {
            if (!paramsCopy[key]) delete paramsCopy[key]
        }

        const data = await this.#repository.getProducts(paramsCopy)

        productsState.products = data.products.map(product => ({
            ...product,
            images: product.images?.map(image => 'https://dev.namisushi.dn.ua' + image),
        }))

        productsState.totalProductsCount = data.total

    }

    async deleteProduct(id) {
        try {
            return await this.#repository.deleteProduct(id)
        } catch (error) {
            notificationsHelper.fromHttpError(error)
            throw error
        }
    }

    async createProduct(product) {
        try {
            const sanitizedProduct = this._sanitizeProduct(product)
            const data = await this.#repository.createProduct(sanitizedProduct)
            notificationsHelper.success({message: "Продукт успешно создан"})

            const createdProduct = data.product
            createdProduct.images = createdProduct.images.map(item => 'https://dev.namisushi.dn.ua' + item)


            const isTruthyValue = !productsState.searchData.category
                || createdProduct.categories.some(category => category._id === productsState.searchData.category)

            if (!isTruthyValue) return createdProduct

            if (productsState.products.length === productsState.pagination.limit) {
                productsState.products.pop()
            }

            productsState.products.unshift(createdProduct)
            productsState.totalProductsCount += 1
            return createdProduct
        } catch (error) {
            notificationsHelper.fromHttpError(error)
            throw error
        }
    }

    async editProduct(product, id) {
        try {
            const sanitizedProduct = this._sanitizeProduct(product)

            const data = await this.#repository.editProduct(sanitizedProduct, id)
            notificationsHelper.success({message: "Продукт успешно обновлен"})

            const updatedProduct = data.product
            updatedProduct.images = updatedProduct.images.map(item => 'https://dev.namisushi.dn.ua' + item)
            const index = productsState.products.findIndex(item => item._id === product._id)
            productsState.products[index] = updatedProduct
            return updatedProduct
        } catch (error) {
            notificationsHelper.fromHttpError(error)
            throw error
        }
    }

    async toggleBan(value, id) {
        try {
            return await this.#repository.toggleBan(value, id)
        } catch (error) {
            notificationsHelper.fromHttpError(error)
            throw error
        }
    }

    getTags() {
        return this.#repository.getTags()
    }

    getProductTypes() {
        return this.#repository.getProductTypes()
    }

}
