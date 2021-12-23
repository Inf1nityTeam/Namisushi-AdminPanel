import axios from "axios";

export async function AUTH() {
    await axios.post('/api/signin', {
        "email": "admin@nami.ru",
        "password": "123456"
    }).then(response => console.log(response))
}


