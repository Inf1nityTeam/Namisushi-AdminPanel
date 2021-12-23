import axios from "axios";

export async function AUTH() {
    await axios.post('/api/signin', {
        "email": "admin@nami.ru",
        "password": "123456"
    }, {
        headers: { 'x-real-host': 'localhost' }
    })
}


