import http from "@/axiosConfig/base-axios-config";

export default {
    async getUsers() {
        const response = await http.get('/api/admin/users')
        return response.data
    }
}