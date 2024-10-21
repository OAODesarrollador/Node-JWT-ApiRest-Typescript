import { IUsuario } from "../Modelos/usuario.interface";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const generarToken = (user: IUsuario): string => {
    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
}