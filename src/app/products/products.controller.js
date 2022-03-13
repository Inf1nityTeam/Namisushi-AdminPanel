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
        return await this.#service.createProduct(product)
    }
    async editProduct(product, id) {
        return await this.#service.editProduct(product, id)
    }
    getTags() {
        return this.#service.getTags()
    }
    getProductTypes() {
        return this.#service.getProductTypes()
    }
}

export const productsController = new ProductsController()
