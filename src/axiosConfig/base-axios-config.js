import axios from 'axios'
import {userInstanceController} from "@/app/userInstance/user-instance.controller";

const http = axios.create({ })

http.defaults.headers.common['Content-Type'] = 'application/json'

http.interceptors.request.use( async function (config) {
    return config
})

http.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response?.status === 401 && error.response.config.url !== '/api/signout') {
        userInstanceController.signOut()
    }
    throw error
})

export default http
