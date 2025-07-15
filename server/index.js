// import express from 'express';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import { Server } from 'socket.io';
// import http from 'http';
// import helmet from 'helmet';
// import morgan from 'morgan';
// import path from 'path';
// import { fileURLToPath } from 'url';

// import authRoutes from './routes/Route.js';
// import SocketHandler from './SocketHandler.js';


// // config
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();

// app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
// app.use(morgan("common"));

// app.use(bodyParser.json({limit: "30mb", extended: true}))
// app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
// app.use(cors());


// app.use('', authRoutes);

// const server = http.createServer(app);

// const io = new Server(server, {
//     cors: {
//         origin: '*',
//         methods: ['GET', 'POST', 'PUT', 'DELETE']
//     }
// });

// io.on("connection", (socket) =>{
//     console.log("User connected");

//     SocketHandler(socket);
// })


// // mongoose setup

// const PORT = 6001;

// mongoose.connect('mongodb://127.0.0.1:27017/socialex', { 
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     }
// ).then(()=>{

//         server.listen(PORT, ()=>{
//             console.log(`Running @ ${PORT}`);
//         });
//     }
// ).catch((e)=> console.log(`Error in db connection ${e}`));



import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import authRoutes from './routes/Route.js';
import SocketHandler from './SocketHandler.js';

// Load environment variables
dotenv.config();

// Config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('', authRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

io.on("connection", (socket) => {
  console.log("User connected");
  SocketHandler(socket);
});

// Mongoose setup
const PORT = process.env.PORT || 6001;
const MONGO = process.env.MONGO_URL;

mongoose.connect(MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch((e) => {
  console.log(`❌ Error in DB connection: ${e}`);
});
