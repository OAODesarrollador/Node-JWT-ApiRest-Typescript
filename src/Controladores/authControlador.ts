import { Request, Response } from "express";
import { hashPassword } from "../servicios/password.servicio";
import prisma from "../Modelos/usuarios";
import { generarToken } from "../servicios/auth.servicio";
import { comparaPasswords } from "../servicios/password.servicio";
export const registrar = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        if (!email) {
            res.status(400).json({ error: "Email es requerido" });
        }
        if (!password) {
            res.status(400).json({ error: "Password es requerido" });
        }
        const hashedPassword = await hashPassword(password);
        console.log(hashedPassword);

        const user = await prisma.create({
            data: {
                email,
                password: hashedPassword,
                actualizadoEl: new Date(),
                nombre: email.split("@")[0],
                apellido: email.split("@")[1],
                creadoEl: new Date()
            }
        })
        const token = generarToken(user);
        res.status(201).json({ token });
    } catch (error:any) {
        
        if (error.code === "P2002" && error.meta?.target?.includes("email")) {
            res.status(400).json({ error: "Email ya registrado" });
        }
        console.log(error);
        res.status(500).json({ error: "Error al registrar el usuario" });
    }
}
export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        if (!email) {
            res.status(400).json({ error: "Email es requerido" });
        }
        if (!password) {
            res.status(400).json({ error: "Password es requerido" });
        }
        const user = await prisma.findUnique({ where: { email } });
        if (!user) {
            res.status(404).json({ error: "Usuario no encontrado" });
            return;
        }

        const esValido = await comparaPasswords(password, user.password);
        if (!esValido) {
            res.status(401).json({ error: "Usuario y contraseña no coinciden" });
            return;
        }
        const token = generarToken(user);
        res.status(200).json({ token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
    

}
