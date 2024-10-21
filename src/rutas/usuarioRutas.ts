import express,{ NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";
import { actualizarUsuario, borrarUsuario, crearUsuario, getTodosUsuarios, getUnUsuario } from "../Controladores/usuarioControlador";



const autorRutas = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "palabrasecreta";

// middleware de JWT
const autenticarToken = (req: Request, res: Response, next: NextFunction)  => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        console.log("No hay token");
        return res.status(401).json({ error: "No hay token" });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err){
            console.log(err);
            return res.status(401).json({ error: "No tiene permisos autorizado" });
        }
        next();
    })
}

autorRutas.post("/", autenticarToken, crearUsuario);
autorRutas.get("/", autenticarToken, getTodosUsuarios);
autorRutas.get("/:id", autenticarToken, getUnUsuario);
autorRutas.put("/:id", autenticarToken, actualizarUsuario);
autorRutas.delete("/:id", autenticarToken, borrarUsuario);


export default autorRutas;