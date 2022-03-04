import ProductsRepository from "@/app/products/products.repository";

export default class ProductsService {

    #repository = new ProductsRepository()

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
        return await this.#repository.deleteProduct(id)
    }

    async createProduct(product) {
        await this.#repository.createProduct(product)
    }

    async editProduct(id, product) {
        await this.#repository.editProduct(id, product)
    }

    getTags() {
        return this.#repository.getTags()
    }
    getProductTypes() {
        return this.#repository.getProductTypes()
    }
}
