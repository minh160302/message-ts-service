import { Server, Socket } from "socket.io"

import { addUser, getUser, getUsersInRoom, removeUser } from "../controller/room"

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

    socket.emit("chat-message", (msg) => {
      console.log("message received from client: ", msg)
    })

    socket.on("JOIN", (payload: any, callback) => {
      // console.log(payload)
      const { error, user } = addUser({ id: socket.id, name: payload.name, room: payload.room, senderId: payload.senderId })
      if (error) {
        callback(error)
      }

      // console.log(user)
      socket.emit("message", { user: "admin", content: `Welcome user ${user?.name} to room ${user?.room}` })
      socket.broadcast.to(user?.room).emit("message", { user: "admin", content: `Welcome user ${user?.name} has joined` })

      socket.join(user?.room)


      callback();
    })

    socket.on("sendMessage", (message, callback) => {
      const user = getUser(socket.id);
      console.log("ssss", user)
      
      io.to(user.room).emit("message", { user: user.name, content: message.content, senderId: user.senderId })

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