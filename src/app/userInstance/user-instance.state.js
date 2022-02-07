import {reactive} from 'vue'
// import {userInstanceController} from "@/app/userInstance/user-instance.controller";

let isLoggedIn = !!localStorage.getItem('isLoggedIn')

export const userInstanceState = reactive({
    isLoggedIn,
    info: {
        _id: null,
        email: null,
        role: null,
        phone: null,
        avatar: null,
        createdAt: null,
        updatedAt: null
    }
})

export function setIsLoggedIn(isLoggedIn) {
    if (isLoggedIn) {
        localStorage.setItem('isLoggedIn', isLoggedIn)
        userInstanceState.isLoggedIn = true
    } else {
        localStorage.removeItem('isLoggedIn')
        userInstanceState.isLoggedIn = false
        Object.keys(userInstanceState.info)
            .forEach(key => userInstanceState.info[key] = null)
    }
}

export function userInstanceStateInit() {
    // if (!userInstanceState.info._id) {
    //     return userInstanceController.getMe()
    // } else {
    //     return null
    // }
}
