import { Router } from "express";
import { registrarUsuario, loginUsuario, listarUsuarios } from "../controllers/controller.js";

const router = Router();

router.post("/registrar", registrarUsuario)
router.post("/login", loginUsuario)
router.get("/listar", listarUsuarios)

export default router;