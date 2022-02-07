import http from "@/axiosConfig/base-axios-config";

export default class CategoriesRepository {

    async getCategories() {
        const response = await http.get('/api/categories')
        return response.data.categories
    }

    async createCategory(category) {
        const response = await http.post('/api/admin/product/category', category)
        return response.data
    }

}
