/**
 * ОБРАБАТЫВАЕМ ДАННЫЕ В НУЖНЫЙ ВИД ДЛЯ ПРИЛОЖЕНИЯ И СОХРАНЯЕМ
 *
 * Слой сервиса предназначен для обработки данных полученных репозиторием или выполнения бизнес-логики.
 *
 * В этом слое преобразуем данные, которые пришли из репозитория в нужный вид.
 * Взаиможействие со стором (сохранение, удаление, преобразование данных) так же происходит тут.
 * Обработка специфических ошибок, которые не может обработать стандартный обработчик HTTP-ошибок
 * так же производятся тут.
 *
 * Экземпляр сервиса является приватным полем контроллера, вызывать методы сервиса может только контроллер.
 */
import UserInstanceRepository from "@/app/userInstance/user-instance.repository";
import {userInstanceState} from "@/app/userInstance/user-instance.state";
import {notificationsHelper} from "@/helpers/notifications.helper";

export default class UserInstanceService {

    #repository = new UserInstanceRepository()

    async signIn(credentials) {
        try {
            const data = await this.#repository.signIn(credentials)
            notificationsHelper.success({ message: 'Авторизация прошла успешно' })
            return data
        } catch (error) {
            console.log(error)
            notificationsHelper.error()
            throw error
        }
    }

    async getMe() {
        try {
            const data = await this.#repository.getMe()
            userInstanceState.info = data
            return data
        } catch (error) {
            console.log(error)
        }
    }
    
}
