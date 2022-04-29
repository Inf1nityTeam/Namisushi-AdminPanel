import ProductsRepository from "@/app/products/products.repository";
import CategoriesRepository from "@/app/categories/categories.repository";
import {notificationsHelper} from "@/helpers/notifications.helper";
import {productsState} from "@/app/products/products.state";

export default class ProductsService {

    #categoriesRepository = new CategoriesRepository()
    #productsRepository = new ProductsRepository()

    async getProducts() {

        const products = await this.#productsRepository.getProducts()
        const categories = await this.#categoriesRepository.getCategories()
        //Todo: свойство "categories" нужно для показа списка категорий в таблице
        //Todo: возможно есть способы оптимизировать этот код O(n^3)
        //Todo: но мне кажется, что бэкендеру следует добавить свойство "categories" непосредственно в объект продукта, а не запрашивать список категорий отдельно
        productsState.products = JSON.parse(JSON.stringify(
            products.products.map(product => ({
                ...product,
                images: product.images?.map(image => 'https://nami.devserver.host/api/product/image/' + image),
                categories: categories.reduce((acc, category) => {
                    const {productIds} = category

                    if (!(productIds.length > 0)) return acc

                    for (let index = 0; index < productIds.length; index++) {
                        if (productIds[index] === product._id) {
                            acc.push({
                                title: category.title,
                                _id: category._id
                            })
                        }
                    }
                    return acc
                }, [])
            }))
        ))
    }

    async toggleStatus(id, status) {
        try {
            return await this.#productsRepository.toggleStatus(id, status)
        } catch (error) {
            notificationsHelper.fromHttpError(error)
            throw error
        }
    }

    async deleteProduct(id) {
        try {
            return await this.#productsRepository.deleteProduct(id)
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

            const data = await this.#productsRepository.createProduct({ title, description, ingredients, visible, cost, weight })
            const createdProduct = data.product
            const { _id } = createdProduct

            if (images.length > 0) {
                const formData = new FormData()

                images.forEach(image => {
                    formData.append('images', image)
                })
                const addedImages = await this.#productsRepository.addImagesToProduct(_id, formData)
                createdProduct.images = addedImages.images.map(image => 'https://nami.devserver.host/api/product/image/' + image)

            }

            const addedCategories = []
            if (categories.length > 0) {
                for (let index = 0; index < categories.length; index++) {
                    const categoryId = categories[index]
                    const newCategory = await this.#productsRepository.addProductToCategory(_id, categoryId)
                    addedCategories.push(newCategory._id)
                }
            }
            createdProduct.categories = addedCategories

            productsState.products.push(createdProduct)

            return createdProduct
        } catch (error) {
            notificationsHelper.fromHttpError(error)
            throw error
        }


    }

    async updateProduct(productId, product) {
        try {
            const { title, description, ingredients, visible, cost, weight, images, categories } = product

            const originalProductIndex = productsState.products.findIndex(item => item._id === product._id)
            const originalProduct = productsState.products[originalProductIndex]

            const formData = new FormData()

            if (images.length > 0) {

                for (let index = 0; index < images.length; index++) {
                    const image = images[index]

                    if (typeof image !== 'string') {
                        formData.append('images', image)
                    }
                }
                if (formData.entries().next().value) {
                    await this.#productsRepository.addImagesToProduct(productId, formData)
                }
            }

            const removedImages = originalProduct.images.filter(image => !images.includes(image));
            if (removedImages.length > 0) {
                for (let index = 0; index < removedImages.length; index++) {
                    const removedImage = removedImages[index]
                    const imageId = removedImage.split("/").slice(-1)
                    await this.#productsRepository.deleteImageFromProduct(productId, imageId)
                }
            }


            const updatedCategories = []
            if (categories.length > 0) {
                for (let index = 0; index < categories.length; index++) {
                    const categoryId = categories[index]

                    if (!originalProduct.categories.some(category => categoryId === category._id)) {

                        const newCategory = await this.#productsRepository.addProductToCategory(productId, categoryId)

                        updatedCategories.push({
                            _id: newCategory.category._id,
                            title: newCategory.category.title
                        })
                    } else {
                        const oldCategory = originalProduct.categories.find(category => category._id === categoryId)
                        if (oldCategory) {
                            updatedCategories.push({
                                _id: oldCategory._id,
                                title: oldCategory.title
                            })
                        }
                    }
                }
            }

            const removedCategories = originalProduct.categories.filter(productCategory => {
                return !categories.some(category => productCategory._id === category)
            })
            if (removedCategories.length > 0) {
                for (let index = 0; index < removedCategories.length; index++) {
                    const categoryId = removedCategories[index]._id
                    await this.#categoriesRepository.deleteCategoryFromProduct(productId, categoryId)
                }
            }

            const data = await this.#productsRepository.updateProduct(productId, { title, description, ingredients, visible, cost, weight })
            const updatedProduct = data.product

            updatedProduct.images = updatedProduct.images.map(image => 'https://nami.devserver.host/api/product/image/' + image)
            updatedProduct.categories = updatedCategories

            productsState.products[originalProductIndex] = updatedProduct
        } catch (error) {
            notificationsHelper.fromHttpError(error)
            throw error
        }
    }

    getTags() {
        return this.#productsRepository.getTags()
    }

    getProductTypes() {
        return this.#productsRepository.getProductTypes()
    }

}
