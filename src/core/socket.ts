import { io } from "socket.io-client";

const URL = 'https://markdown--server.herokuapp.com'
export const socket = io(URL, {
    autoConnect: false,
})


export function joinRoom(room: string) {
    socket.auth = {
        room: room
    }
    socket.connect()
}


export function updateLiveDoc(doc: string) {
    socket.emit('update-doc', doc)
}
