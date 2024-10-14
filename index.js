import express from "express"
import { createServer } from 'node:http';
import { createConnection } from "mongoose"
import { Server, Socket } from "socket.io"

const app = express()
const server = createServer(app)
const io = new Server(server)
app.use(express.static("public"))
app.get("/",(req, res)=>{
  res.sendFile("index.html")
})
io.on('connection', (socket) => {
  socket.on("newConnection",(userName)=>{
    io.emit("newConnection", userName)
  })
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(3000,()=>{
    console.log("connected express")
})