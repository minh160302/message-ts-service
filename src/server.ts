import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import MongoURI from "./config/db.config"
import { config } from "node-config-ts"
import { createServer } from "http"
// import eurekaClient from "./config/eureka_client"
import { registerWithEureka } from "./config/eureka.helper"
// routes
import messageRoutes from "./routes/message_routes"
import conversationRoutes from "./routes/conversation_routes"
import userRoutes from "./routes/user_routes"
import { socketConnection } from "./config/socket.io"

const PORT = 8300

const app = express()
const router = express.Router();

const httpServer = createServer(app);

// config http request
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// db connection
const uri: string = MongoURI.mongoURI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connect successfully");
  }).catch((err) => {
    console.log("Database connect failed", err);
  });

// user routes
app.use("/", messageRoutes)
app.use("/conversation", conversationRoutes)
app.use("/user", userRoutes)

// connect to socket.io
socketConnection(httpServer)

// initialize server
httpServer.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${PORT}`);
});


// uncomment when zuul proxy all-set
// registerWithEureka("message-service", PORT)