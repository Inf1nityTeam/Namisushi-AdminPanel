/**
 * ПОЛУЧАЕМ ДАННЫЕ
 *
 * Слой репозитория предназначен для получения данных с API
 * В этом слое так же реализуем кеширование, если данные есть в сторе отдаем их, если это необходимо.
 * Взаимодействие с конфигом запроса/ответа так же оставляем тут.
 *
 * Экземпляр репозитория является приватным полем сервиса, вызывать методы репозитория может только сервис.
 */
import http from "@/axiosConfig/base-axios-config";

export default class UserInstanceRepository {

    async signIn(credentials) {
        let config = null
        if (process.env.NODE_ENV === 'development') {
            config = {
                headers: { 'x-localhost': 'localhost' } // добавляю дев-хедер для прохождения авторизации с localhost
            }
        }
        const response = await http.post('/api/user/signin', credentials, config)
        return response.data
    }
    async signOut() {
        await http.delete('/api/user/signout')
    }
    async getMe() {
        const response = await http.get('/api/user')
        return response.data.user
    }

}
