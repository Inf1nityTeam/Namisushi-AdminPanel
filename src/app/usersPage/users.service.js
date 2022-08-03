import UsersRepository from "@/app/usersPage/users.repository";
import {usersState} from "@/app/usersPage/users.state";

export default {
    async getUsers() {
        return await UsersRepository.getUsers(usersState.filters)
    }
}