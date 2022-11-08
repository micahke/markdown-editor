import axios from 'axios'
import { API_PREFIX } from './socket'


export async function createRoom() {

    console.log(API_PREFIX)
    try {
        const response = await axios.get(`${API_PREFIX}/create-room`)
        console.log(response.data)
        return response.data
    } catch(error: any) {
        console.log(error)
        return false
    }

}