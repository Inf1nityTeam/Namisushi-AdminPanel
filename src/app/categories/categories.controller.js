import CategoriesService from "@/app/categories/categories.service";

class CategoriesController {

    #service = new CategoriesService()

    async getCategories() {
        return await this.#service.getCategories()
    }

    async createCategory(category) {
        return await this.#service.createCategory(category)
    }

    async updateCategory(category) {
        return await this.#service.updateCategory(category)
    }

    async deleteCategory(categoryId) {
        return await this.#service.deleteCategory(categoryId)
    }

}

export const categoriesController = new CategoriesController()
