import axios from 'axios'


export async function createRoom() {

    try {
        const response = await axios.get('http://localhost:2500/create-room')
        return response.data
    } catch(error: any) {
        console.log(error)
        return false
    }

}