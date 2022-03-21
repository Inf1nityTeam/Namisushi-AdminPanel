import ProductsService from "@/app/products/products.service";

class ProductsController {

    #service = new ProductsService()

    async getProducts(params) {
        await this.#service.getProducts(params)
    }
    async deleteProduct(id) {
        await this.#service.deleteProduct(id)
    }
    async createProduct(product) {
        await this.#service.createProduct(product)
    }
    async editProduct(product, id) {
        return await this.#service.editProduct(product, id)
    }
    async toggleBan(value, id) {
        return await this.#service.toggleBan(value, id)
    }
    getTags() {
        return this.#service.getTags()
    }
    getProductTypes() {
        return this.#service.getProductTypes()
    }
}

export const productsController = new ProductsController()
