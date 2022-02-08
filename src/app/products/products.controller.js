import ProductsService from "@/app/products/products.service";

class ProductsController {

    #service = new ProductsService()

    async getProducts() {
        return await this.#service.getProducts()
    }
    async deleteProduct(id) {
        await this.#service.deleteProduct(id)
    }
}

export const productsController = new ProductsController()
