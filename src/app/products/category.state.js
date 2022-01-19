import {reactive} from 'vue'
import axios from "axios";

export const categoriesState = reactive({
    categoriesList: [],
})

export async function GET_CATEGORIES() {
    await axios.get('/api/categories')
        .then(response => {
            categoriesState.categoriesList = JSON.parse(JSON.stringify(response.data.categories))
        })
}