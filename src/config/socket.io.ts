import Messages from "../model/messages"
import { Server, Socket } from "socket.io"

import { joinConversation, getUser, saveMessages, fetchMessages } from "../controller/room"

export const socketConnection = (server: any) => {
  // connect to socket.io server
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      preflightContinue: true
    },
    path: "/socket.io/",
  })

  io.on("connection", (socket: Socket) => {
    console.log("Socket io connected ...")

    // function getRoomClients(room) {
    //   return io.in(room).fetchSockets();
    // }

    // join conversation
    socket.on("JOIN", async (payload: any, callback) => {
      // console.log(payload)
      const user = await joinConversation({ id: socket.id, name: payload.name, room: payload.room, senderId: payload.senderId })
      // socket.emit("message", { user: "admin", content: `Welcome user ${user.name} to room with id ${user.id} and name ${user.room}` })
      // socket.broadcast.to(user?.room).emit("message", { user: "admin", content: `Welcome user ${user?.name} has joined` })


      // socket.rooms.add(user.room)
      // console.log(socket.rooms.keys())

      if (!socket.rooms.has(user.room)) {
        socket.join(user.room)
      }

      // const clients = await getRoomClientsn   (user.room);
      // console.log(io.sockets.adapter.rooms)
      callback();
    })

    // fetch messages in conversation
    socket.on("fetch", async (payload: string, callback) => {
      // const messages = await fetchMessages(payload)
      socket.join(payload)
      // io.in([payload]).emit("fetchSuccess", messages)
      callback()
    })



    socket.on("sendMessage", async (message, callback) => {
      console.log("socket id ", socket.id)
      const user = await getUser(message.senderId);
      // io.to(user.room).emit("message", { user: user.name, content: message.content, senderId: user.senderId })
      const messagesUpdate = await saveMessages(user, message);
      socket.join(user.room)

      socket.broadcast.to(user.room).emit('databaseUpdate', messagesUpdate)
      io.in([`${user.room}`]).emit('databaseUpdate', messagesUpdate);
      callback()
    })

    socket.on("disconnect", () => {
      console.log("Client disconnected ...")
    })
  })

  // io.on("connection", (socket: Socket) => {
  //   socket.emit("chat-message", (msg) => {
  //     console.log("message received from client: ", msg)
  //   })
  // })
}