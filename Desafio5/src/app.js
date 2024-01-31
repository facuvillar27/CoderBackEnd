import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
// import FileStore from 'session-file-store';
import handlebars from 'express-handlebars';
import MongoStore from 'connect-mongo';
import { __dirname } from './utils.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import loginRouter from './routes/login.routes.js';
import signupRouter from './routes/signup.routes.js';
import sessionRouter from './routes/session.routes.js';
import viewsRouter from './routes/views.router.js';
import logoutRouter from './routes/logout.routes.js';

dotenv.config();

const app = express();
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/ecommerce';
const COOKIESECRET = process.env.COOKIESECRET 
app.use(cookieParser(COOKIESECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


app.use(session({
    store: MongoStore.create({ 
        mongoUrl: DB_URL,
        ttl: 15,
        mongoOptions: {
            useNewUrlParser: true,
        }
    }),
    secret: COOKIESECRET,
    resave: false,
    saveUninitialized: false,
})
);

app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/views", viewsRouter);
app.use("/", sessionRouter);
app.use("/logout", logoutRouter);

const enviroment = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log("Base de datos conectada");
    } catch (error) {
        console.log(error);
    }
}

enviroment();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));

// // const FileStore = FileStore(session);
// // app.use(
// //     session({
// //         store: new FileStore({
// //             path: "./sessions",
// //             ttl: 100,
// //             retries: 0,
// //         }),  
// //         secret: "codersecret",
// //         resave: false,
// //         saveUninitialized: false,
// //     })
// // )



// app.get('/session', (req, res) => {
//     if(req.session.counter) {
//         req.session.counter++
//         res.send(`Usted ha visitado el sitio ${req.session.counter} veces`)
//     } else {
//         req.session.counter = 1
//         res.send('Bienvenido')
//     }
// })

// app.get("/login", (req, res) => {
//     res.render("login");
// });

// app.post('/login', (req, res) => {
//     const { username, password } = req.body
//     if ( username !== "pepe" || password !== "pepepass") 
//     return res.status(401).json({ respuesta: "Error" })
// req.session.username = username
// req.session.admin = true
// res.status(200).json({
//     respuesta: "Login OK"
// })
// }
// )

// app.get("/privado", auth, (req, res) => {
//     res.send("<h1>Bienvenido al sitio privado</h1>");
// });




// app.get('/logout', (req, res) => {
//     req.session.destroy(err => {
//         if(!err) res.send('Logout ok')
//         else res.send({ status: 'Logout ERROR', body: err })
//     })
// }
// )