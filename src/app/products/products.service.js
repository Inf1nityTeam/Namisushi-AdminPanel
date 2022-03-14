import ProductsRepository from "@/app/products/products.repository";
import {copyDeep} from "@/utils/copy-deep";
import {notificationsHelper} from "@/helpers/notifications.helper";
// import http from "@/axiosConfig/base-axios-config";

export default class ProductsService {

    #repository = new ProductsRepository()

    _sanitizeProduct(product) {
        const formData = new FormData()
        const productCopy = copyDeep(product)

        productCopy.categories = productCopy.categories.map(category => {
            if (typeof category === 'string') {
                return JSON.parse(category)._id
            }
            return category._id
        })

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
    async getProducts(page, limit) {

        const data = await this.#repository.getProducts(page, limit)

        return {
            ...data,
            products: data.products.map(product => ({
                ...product,
                images: product.images?.map(image => 'https://dev.namisushi.dn.ua' + image)
            }))
        }
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

            return data
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

            return data
        } catch(error) {
            notificationsHelper.fromHttpError(error)
            throw error
        }
    }

    async toggleBan(value, id) {
        try {
            return await this.#repository.toggleBan(value, id)
        } catch(error) {
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
