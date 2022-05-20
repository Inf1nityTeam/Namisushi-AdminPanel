import UsersRepository from "@/app/users/users.repository";

export default {
    async getUsers() {
        return await UsersRepository.getUsers()
    }
}