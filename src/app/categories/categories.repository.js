import http from "@/axiosConfig/base-axios-config";

export default class CategoriesRepository {

    async getCategories() {
        const response = await http.get('/api/categories')
        return response.data.categories
    }

}
