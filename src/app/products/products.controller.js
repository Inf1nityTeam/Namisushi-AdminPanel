import ProductsService from "@/app/products/products.service";

class ProductsController {

    #service = new ProductsService()

    async getProducts() {
        await this.#service.getProducts()
    }
    async toggleBan(value, id) {
        return await this.#service.toggleBan(value, id)
    }
    async createProduct(product) {
        await this.#service.createProduct(product)
    }
    async updateProduct(productId, product) {
        return await this.#service.updateProduct(productId, product)
    }
    async deleteProduct(id) {
        await this.#service.deleteProduct(id)
    }

    getTags() {
        return this.#service.getTags()
    }
    getProductTypes() {
        return this.#service.getProductTypes()
    }
}

export const productsController = new ProductsController()
