import UsersRepository from "@/app/users/users.repository";
import {notificationsHelper} from "@/helpers/notifications.helper";

export default class UsersService {
    #repository = new UsersRepository()
    async getUsers() {
        try {
            const response = await this.#repository.getUsers()
            return {
                ...response,
                users: response.users.map(user => ({
                    ...user,
                    avatar: "https://dev.namisushi.dn.ua/" + user.avatar
                }))
            }
        } catch(error) {
            notificationsHelper.fromHttpError(error)
            throw error
        }
    }
}
