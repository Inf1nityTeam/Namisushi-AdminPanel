import ProductsRepository from "@/app/products/products.repository";

export default class ProductsService {

    #repository = new ProductsRepository()

    async getProducts() {

        const data = await this.#repository.getProducts()
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


}
