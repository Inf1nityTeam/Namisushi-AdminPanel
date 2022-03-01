import ProductsService from "@/app/products/products.service";

class ProductsController {

    #service = new ProductsService()

    async getProducts() {
        return await this.#service.getProducts()
    }
    async deleteProduct(id) {
        await this.#service.deleteProduct(id)
    }
    async createProduct(product) {
        await this.#service.createProduct(product)
    }
    getTags() {
        return this.#service.getTags()
    }
    getProductTypes() {
        return this.#service.getProductTypes()
    }
}

export const productsController = new ProductsController()
