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

    async updateCategory(category) {
        try {
            const data = await this.#repository.updateCategory(category)
            const index = categoriesState.categories.findIndex(item => item._id === category._id)
            categoriesState.categories[index] = data
            notificationsHelper.success({ message: 'Категория успешно обновлена' })
            return data
        } catch (error) {
            console.log(error)
            notificationsHelper.error()
            throw error
        }
    }

    async deleteCategory(categoryId) {
        try {
            const data = await this.#repository.deleteCategory(categoryId)
            const index = categoriesState.categories.findIndex(item => item._id === categoryId)
            categoriesState.categories.splice(index, 1)
            notificationsHelper.success({ message: 'Категория успешно удалена' })
            return data
        } catch (error) {
            console.log(error)
            notificationsHelper.error()
            throw error
        }
    }

}
