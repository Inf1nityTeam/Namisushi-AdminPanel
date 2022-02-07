import CategoriesService from "@/app/categories/categories.service";
import {categoriesState} from "@/app/categories/categories.state";

class CategoriesController {

    #service = new CategoriesService()

    async getCategories() {
        try {
            categoriesState.loading = true
            return await this.#service.getCategories()
        } finally {
            categoriesState.loading = false
        }
    }

    async createCategory(category) {
        try {
            categoriesState.loading = true
            return await this.#service.createCategory(category)
        } finally {
            categoriesState.loading = false
        }
    }

    async updateCategory(category) {
        try {
            categoriesState.loading = true
            return await this.#service.updateCategory(category)
        } finally {
            categoriesState.loading = false
        }
    }

    async deleteCategory(categoryId) {
        try {
            categoriesState.loading = true
            return await this.#service.deleteCategory(categoryId)
        } finally {
            categoriesState.loading = false
        }
    }

}

export const categoriesController = new CategoriesController()
