import http from "@/axiosConfig/base-axios-config";

export default class ProductsRepository {

    async getProducts() {
        const response = await http.get('/api/admin/products')
        return response.data
    }

}
