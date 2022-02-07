import ProductsService from "@/app/products/products.service";

class ProductsController {

    #service = new ProductsService()

    async getProducts() {
        return await this.#service.getProducts()
    }

}

export const productsController = new ProductsController()
