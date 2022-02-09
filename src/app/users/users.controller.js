import UsersService from '@/app/users/users.service';

class UsersController {
    #service = new UsersService()

    async getUsers() {
        return this.#service.getUsers()
    }
}

export const usersController = new UsersController()
