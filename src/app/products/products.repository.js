import http from "@/axiosConfig/base-axios-config";

export default class ProductsRepository {

    async getProducts() {
        const response = await http.get('/api/admin/products')
        return response.data
    }

    async deleteProduct(id) {

        const response = await http.delete('/api/admin/product/' + id)
        return response.data
    }

    getTags() {
        return [
            {img: "icon-vegan.svg", label: "vegan", title: "Вегетарианский", bg: "#54B508"},
            {img: "icon-like.svg", label: "favorite", title: "Избранный", bg: "#9A4AFF"},
            {img: "icon-fire.svg", label: "sharp", title: "Острый", bg: "#F92C23"},
            {img: "icon-new.svg", label: "new", title: "Новый", bg: "#2864F3"}
        ]
    }
    getProductTypes() {
        return [
            {label: "variousFillings", title: "С различными начинками"},
            {label: "default", title: "Обычный"}
        ]
    }
}
