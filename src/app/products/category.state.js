import {reactive} from 'vue'
import categories from "./categories.json"

export const categoriesState = reactive({
    categoriesList: [],
})

export function GET_CATEGORIES() {
    categoriesState.categoriesList = JSON.parse(JSON.stringify(categories.categories))
    categoriesState.categoriesList.forEach((el, i) => el.indexNum = i + 1)
}