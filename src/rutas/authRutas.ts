import express from "express";
import { registrar } from "../Controladores/authControlador";
import { login } from "../Controladores/authControlador";

const autorRutas = express.Router();

autorRutas.post("/registrar",registrar);
autorRutas.post("/login", login); 

export default autorRutas;