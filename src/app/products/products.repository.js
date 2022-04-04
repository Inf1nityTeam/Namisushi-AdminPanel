import http from "@/axiosConfig/base-axios-config";

export default class ProductsRepository {

    async getProducts() {
        const response = await http.get('/api/products')
        return response.data
    }

    async toggleBan(value, id) {
        const response = await http.patch(`/api/admin/product/${id}`, value)
        return response.data
    }


    async addProductToCategory(productId, categoryId) {
        const response = await http.put(`api/admin/product/${productId}/category/${categoryId}`)
        return response.data
    }
    async addImagesToProduct(productId, images) {
        const response = await http.put(`api/admin/product/${productId}/images`, images)
        return response.data
    }

    async createProduct(product) {
        const response = await http.post('api/admin/product/SINGLE', product)
        return response.data
    }

    async deleteImageFromProduct(productId, imageName) {
        const response = await http.patch(`api/admin/product/${productId}/image/${imageName}`)
        return response.data
    }

    async updateProduct(productId, product) {
        const response = await http.patch(`/api/admin/product/SINGLE/${productId}`, product)
        return response.data
    }

    async deleteProduct(id) {
        const response = await http.delete(`/api/admin/product/${id}`)
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
