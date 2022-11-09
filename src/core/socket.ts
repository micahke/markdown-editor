import { io } from "socket.io-client";


export const API_PREFIX = process.env.NEXT_PUBLIC_API_URL as string;

export const socket = io(API_PREFIX, {
    autoConnect: false,
})


export function joinRoom(room: string, name: string) {
    socket.auth = {
        room: room,
        username: name
    }
    if (!socket.active) {
        socket.connect()
    }
}


export function updateLiveDoc(doc: string) {
    console.log('sending update')
    socket.emit('update-doc', doc)
}
