import axios from 'axios'
import { API_PREFIX } from './socket'


export async function createRoom() {
    console.log('printing env')
    console.log(`${API_PREFIX}/create-room`)
    try {
        const response = await axios.get(`${API_PREFIX}/create-room`)
        return response.data
    } catch(error: any) {
        console.log(error)
        return false
    }

}

export async function authenticatePasscode(room: string, code: string) {
    try {
        const response = await axios.post(`${API_PREFIX}/authenticate-room`, {
            room: room,
            code: code
        })
        return response.data.validated
    } catch(error: any) {
        console.log(error)
        return false;
    }
}