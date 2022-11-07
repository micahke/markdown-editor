import axios from 'axios'


export async function createRoom() {

    try {
        const response = await axios.get('https://markdown--server.herokuapp.com/create-room')
        return response.data
    } catch(error: any) {
        console.log(error)
        return false
    }

}