/**
 * МАНИПУЛЯЦИИ СО СЛОЕМ VIEW
 *
 * Слой контроллер, содержит приватным полем экземпляр сервиса.
 * Контроллер импортируется в слой view.
 *
 * Минимальная реализация контроллера - повторяем все методы сервиса, вызывая их, и возвращая полученное значение.
 *
 * В этом слое можно создавать специфические методы для обработки произвольных событий из слоя view.
 */
import UserInstanceService from "@/app/userInstance/user-instance.service";
import router from "@/router";

class UserInstanceController {

    #service = new UserInstanceService()

    async signIn(credentials) {
        const data = await this.#service.signIn(credentials)
        router.push('/')
        return data
    }

    async signOut() {
        try {
            await this.#service.signOut()
            router.push('/login')
        } catch (error) {
            router.push('/login')
        }
    }
    async getMe() {
        return await this.#service.getMe()
    }

}

export const userInstanceController = new UserInstanceController()
