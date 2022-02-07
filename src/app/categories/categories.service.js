import CategoriesRepository from "@/app/categories/categories.repository";
import {categoriesState} from "@/app/categories/categories.state";

export default class CategoriesService {

    #repository = new CategoriesRepository()

    async getCategories() {
        const categories = await this.#repository.getCategories()
        categoriesState.categories = categories
        return categories
    }

}
