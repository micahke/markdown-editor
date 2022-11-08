import { io } from "socket.io-client";


export const API_PREFIX = 'https://markdown--server.herokuapp.com';

export const socket = io(API_PREFIX, {
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
