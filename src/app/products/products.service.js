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
        const updatedProducts = JSON.parse(JSON.stringify(
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

        productsState.products.filteredProducts = updatedProducts
        productsState.products.allProducts = updatedProducts
    }

    async toggleBan(value, id) {
        try {
            return await this.#productsRepository.toggleBan(value, id)
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
                createdProduct.images = addedImages.images.map(image => 'https://nami.devserver.host/' + image)

            }

            const addedCategories = []
            if (categories.length > 0) {
                for (let index = 0; index < categories.length; index++) {
                    const categoryId = categories[index]
                    const newCategory = await this.#productsRepository.addProductToCategory(_id, categoryId)
                    addedCategories.push({
                       title: newCategory.category.title,
                       _id: newCategory.category.id
                    })
                }
            }
            createdProduct.categories = addedCategories

            productsState.products.allProducts.push(createdProduct)

            if (productsState.searchData.category === '' && productsState.searchData.title === '') {
                productsState.products.filteredProducts.push(createdProduct)
            } else if (
                categories?.some(category => category === productsState.searchData.category)
                && title.toLowerCase().includes(productsState.searchData.title.toLowerCase())
            ) {
                productsState.products.filteredProducts.push(createdProduct)
            }
            return createdProduct
        } catch (error) {
            notificationsHelper.fromHttpError(error)
            throw error
        }


    }

    async updateProduct(productId, product) {
        const { title, description, ingredients, visible, cost, weight } = product
        const updatedProduct = await this.#productsRepository.updateProduct(productId, { title, description, ingredients, visible, cost, weight })

        const { images } = product
        const formData = new FormData()

        if (images.length > 0) {
            images.forEach(image => {
                if (typeof image !== 'string') {
                    formData.append('images', image)
                }
            })
            const addedImages = await this.#productsRepository.addImagesToProduct(productId, formData)
            updatedProduct.images = addedImages.images.map(image => 'https://nami.devserver.host/' + image)
        }

        const { categories } = product
        const { _id } = updatedProduct

        if (categories.length > 0) {
            for (let i = 0; i < categories.length; i++) {
                const categoryId = categories[i]._id
                await this.#productsRepository.addProductToCategory(_id, categoryId)
            }
        }

    }

    getTags() {
        return this.#productsRepository.getTags()
    }

    getProductTypes() {
        return this.#productsRepository.getProductTypes()
    }

}
