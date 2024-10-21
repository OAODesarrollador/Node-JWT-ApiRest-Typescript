export interface IUsuario {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    creadoEl: Date;
    actualizadoEl: Date;
}