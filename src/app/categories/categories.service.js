import CategoriesRepository from "@/app/categories/categories.repository";
import {categoriesState} from "@/app/categories/categories.state";
import {notificationsHelper} from "@/helpers/notifications.helper";

export default class CategoriesService {

    #repository = new CategoriesRepository()

    async getCategories() {
        const categories = await this.#repository.getCategories()
        categoriesState.categories = categories
        return categories
    }

    async createCategory(category) {
        try {
            const data = await this.#repository.createCategory(category)
            notificationsHelper.success({ message: 'Категория успешно создана' })
            return data
        } catch (error) {
            console.log(error)
            notificationsHelper.error()
            throw error
        }
    }

}
