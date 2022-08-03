import {reactive} from 'vue'

export const usersState = reactive({
    filters: {
        name: '',
        email: '',
        phone: '',
        address: ''
    }
})
