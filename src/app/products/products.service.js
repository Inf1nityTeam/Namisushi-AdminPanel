import ProductsRepository from "@/app/products/products.repository";
import {notificationsHelper} from "@/helpers/notifications.helper";
import {productsState} from "@/app/products/products.state";

export default class ProductsService {

    #repository = new ProductsRepository()

    async getProducts() {

        const data = await this.#repository.getProducts()

        productsState.products = data.products.map(product => ({
            ...product,
            images: product.images?.map(image => 'https://nami.devserver.host/api/product/image/' + image),
        }))

        console.log(data)

        productsState.totalProductsCount = data.products.length
    }

    async toggleBan(value, id) {
        try {
            return await this.#repository.toggleBan(value, id)
        } catch (error) {
            notificationsHelper.fromHttpError(error)
            throw error
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
            const {
                title, description, ingredients, visible, cost, weight, images, categories
            } = product

            const data = await this.#repository.createProduct({ title, description, ingredients, visible, cost, weight })
            const createdProduct = data.product
            const { _id } = createdProduct

            if (images.length > 0) {
                const formData = new FormData()

                images.forEach(image => {
                    formData.append('images', image)
                })
                const addedImages = await this.#repository.addImagesToProduct(_id, formData)
                createdProduct.images = addedImages.images.map(image => 'https://nami.devserver.host/' + image)

            }

            if (categories.length > 0) {
                for (let i = 0; i < categories.length; i++) {
                    const categoryId = categories[i]._id
                    await this.#repository.addProductToCategory(_id, categoryId)
                }
            }

            return createdProduct
        } catch (error) {
            notificationsHelper.fromHttpError(error)
            throw error
        }


    }

    async updateProduct(product, productId) {
        const { title, description, ingredients, visible, cost, weight } = product
        const updatedProduct = await this.#repository.updateProduct(productId, { title, description, ingredients, visible, cost, weight })

        const { images } = product
        const formData = new FormData()

        images.forEach(image => {
            formData.append('images', image)
        })

        const addedImages = await this.#repository.addImagesToProduct(formData)
        updatedProduct.images = addedImages.map(image => 'https://nami.devserver.host/' + image)

        const { categories } = product
        const { _id } = updatedProduct

        for (let i = 0; i < categories.length; i++) {
            const categoryId = categories[i]._id
            await this.#repository.addProductToCategory(_id, categoryId)
        }
    }

    getTags() {
        return this.#repository.getTags()
    }

    getProductTypes() {
        return this.#repository.getProductTypes()
    }

}
