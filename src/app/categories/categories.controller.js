import CategoriesService from "@/app/categories/categories.service";

class CategoriesController {

    #service = new CategoriesService()

    async getCategories() {
        return await this.#service.getCategories()
    }

    async createCategory(category) {
        return await this.#service.createCategory(category)
    }

}

export const categoriesController = new CategoriesController()
