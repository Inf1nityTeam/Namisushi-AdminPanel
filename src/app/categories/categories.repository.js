import http from "@/axiosConfig/base-axios-config";

export default class CategoriesRepository {

    async getCategories() {
        const response = await http.get('/api/admin/product/categories')
        return response.data.categories
    }

    async getCategoriesById() {
        const response = await http.get('/api/admin/product/categories')
        return response.data.categories
    }

    async createCategory(category) {
        const response = await http.post('/api/admin/product/category', category)
        return response.data.category
    }

    async updateCategory(category) {
        const response = await http.patch(`/api/admin/product/category/${category._id}`, category)
        return response.data.category
    }

    async deleteCategory(categoryId) {
        const response = await http.delete(`/api/admin/product/category/${categoryId}`)
        return response.data
    }

}
