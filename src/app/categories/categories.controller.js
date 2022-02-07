import CategoriesService from "@/app/categories/categories.service";

class CategoriesController {

    #service = new CategoriesService()

    async getCategories() {
        return await this.#service.getCategories()
    }

}

export const categoriesController = new CategoriesController()
