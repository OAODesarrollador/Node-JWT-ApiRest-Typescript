import dotenv from "dotenv";
dotenv.config();
import express from "express";
import autorRutas from "./rutas/authRutas";
import usuarioRutas from "./rutas/usuarioRutas";
const app = express();

app.use(express.json());

// Routes
app.use('/auth', autorRutas);
app.use('/users', usuarioRutas);
// Autenticacion

// Users


export default app;