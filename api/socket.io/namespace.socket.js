const {
    ConversationModel
} = require("../models/conversation");
const fs = require("fs");
const path = require("path");
module.exports = class NamespaceSocketHandler {
    #io;
    constructor(io) {
        this.#io = io
    }
    initConnection() {
        this.#io.on("connection", async socket => {
            // const namespaces = await ConversationModel.find({}, {
            //     title: 1,
            //     endpoint: 1,
            //     rooms: 1
            // }).sort({
            //     _id: -1
            // })
            socket.emit("namespacesList", 'webinars')
            console.log("socket server is running init connetction")
        })
    }
    async createNamespacesConnection() {

        this.#io.of(`webinars`).on("connection", async (socket) => {
            console.log("socket server is running creat name space ")})
    }
    async getCountOfOnlineUsers(endpoint, roomName) {
        const onlineUsers = await this.#io.of(`/${endpoint}`).in(roomName).allSockets()
        this.#io.of(`/${endpoint}`).in(roomName).emit("countOfOnlineUsers", Array.from(onlineUsers).length)
    }
    getNewMessage(socket){
        socket.on("newMessage", async data => {
            const {message, roomName, endpoint, sender} = data
            await ConversationModel.updateOne({endpoint, "rooms.name": roomName}, {
                $push : {
                    "rooms.$.messages" : {
                        sender,
                        message, 
                        dateTime: Date.now()
                    } 
                }
            })
            this.#io.of(`/${endpoint}`).in(roomName).emit("confirmMessage", data)
        })
    }
    getNewLocation(socket){
        socket.on("newLocation", async data => {
            const {location, roomName, endpoint, sender} = data
            await ConversationModel.updateOne({endpoint, "rooms.name": roomName}, {
                $push : {
                    "rooms.$.locations" : {
                        sender,
                        location, 
                        dateTime: Date.now()
                    } 
                }
            })
            this.#io.of(`/${endpoint}`).in(roomName).emit("confirmLocation", data)
        })
    }
    uploadFiles(socket){
        socket.on("upload", ({file, filename}, callback) => {
            const ext = path.extname(filename)
            fs.writeFile("public/uploads/sockets/" + String(Date.now() + ext) , file, (err) => {
              callback({ message: err ? "failure" : "success" });
            });
        });
    }
}