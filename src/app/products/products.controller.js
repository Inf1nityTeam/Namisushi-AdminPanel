import ProductsService from "@/app/products/products.service";

class ProductsController {

    #service = new ProductsService()

    async getProducts(page, limit) {
        return await this.#service.getProducts(page, limit)
    }
    async deleteProduct(id) {
        await this.#service.deleteProduct(id)
    }
    async createProduct(product) {
        await this.#service.createProduct(product)
    }
    async editProduct(id, product) {
        await this.#service.editProduct(id, product)
    }
    getTags() {
        return this.#service.getTags()
    }
    getProductTypes() {
        return this.#service.getProductTypes()
    }
}

export const productsController = new ProductsController()
