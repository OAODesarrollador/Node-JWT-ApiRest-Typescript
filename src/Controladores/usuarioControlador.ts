import { Request, Response } from "express";
import { hashPassword } from "../servicios/password.servicio";
import prisma from "../Modelos/usuarios";
export const crearUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!email) {
            res.status(400).json({ error: "Email es requerido" });
            return;
        }
        if (!password) {
            res.status(400).json({ error: "Password es requerido" });
            return;
        }
        const hashedPassword = await hashPassword(password);
        const user = await prisma.create({
            data: {
                email,
                password: hashedPassword,
                actualizadoEl: new Date(),
                nombre: email.split("@")[0],
                apellido: email.split("@")[1],
                creadoEl: new Date()
            }
        });
        res.status(201).json({ user });
    } catch (error:any) {
        if (error.code === "P2002" && error.meta?.target?.includes("email")) {
            res.status(400).json({ error: "Email ya registrado" });
            return;
        }
        console.log(error);
        res.status(500).json({ error: "Error al crear el usuario" });
    }
}

export const getTodosUsuarios = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await prisma.findMany({});
        res.status(200).json({ users });
    } catch (error:any) {
        console.log(error);
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
}

export const getUnUsuario = async (req: Request, res: Response): Promise<void> => {
    const usuarioId = parseInt(req.params.id)
    try {
        const user = await prisma.findUnique({ where: { id: usuarioId } });
        if (!user) {
            res.status(404).json({ error: "Usuario no encontrado" });
            return;
        }
        res.status(200).json({ user });
    } catch (error:any) {
        console.log(error);
        res.status(500).json({ error: "Error al obtener el usuario" });
    }
}

export const actualizarUsuario = async (req: Request, res: Response): Promise<void> => {
    const usuarioId = parseInt(req.params.id)
    const { email, password } = req.body;
    try {
        let datosParaActualizar: any = {...req.body};
        if (password) {
            const hashedPassword = await hashPassword(password);
            datosParaActualizar.password = hashedPassword;
        }
        if (email) {
            datosParaActualizar.email = email;
        }
        const user = await prisma.update({
            where: { id: usuarioId },
            data: datosParaActualizar
        });
        res.status(200).json({ user });
    } catch (error:any) {
        if (error.code === "P2002" && error.meta?.target?.includes("email")) {
            res.status(400).json({ error: "Email ya registrado" });
            return;
        }else if (error.code === "P2025" ) {
            res.status(404).json({ error: "Usuario no encontrado" });
        }else{
            console.log(error);
            res.status(500).json({ error: "Error al actualizar el usuario" }); 
        }
            
    }
}

export const borrarUsuario = async (req: Request, res: Response): Promise<void> => {
    const usuarioId = parseInt(req.params.id)
    try {
        await prisma.delete({ where: { id: usuarioId } });
        res.status(200).json({ message: `Usuario ${usuarioId} borrado correctamente` }).end();
    } catch (error:any) {
        if (error.code === "P2025" ) {
            res.status(404).json({ error: "Usuario no encontrado" });
        }else{
            console.log(error);
            res.status(500).json({ error: "Error al actualizar el usuario" }); 
        }  
    }

}
        