import http from "@/axiosConfig/base-axios-config";

export default {
    async getUsers({ name, email }) {
        const response = await http.get('/api/admin/users', {
            params: {
                mUsername: name ? name : undefined,
                mEmail: email ? email : undefined,
                // phone, address
            }
        })
        return response.data
    }
}
