import { io } from "socket.io-client";

const URL = 'http://localhost:2500'
export const socket = io(URL, {
    autoConnect: false,
})


export function joinRoom(room: string) {
    socket.auth = {
        room: room
    }
    socket.connect()
}
