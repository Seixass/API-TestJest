import Usuario from "../models/model.js";
import bcrypt from "bcrypt";
import { z } from "zod";

const createUserSchema = z.object({
  nome: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  senha: z
    .string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
});
  const loginSchema = z.object({
    email: z.string().email({ message: "Email inválido" }),
    senha: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
  });

export const registrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = createUserSchema.parse(req.body);
    const hashedSenha = await bcrypt.hash(senha, 10);

    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: hashedSenha,
    });

    res
      .status(201)
      .json({ msg: "Usuário registrado com sucesso", usuario: novoUsuario });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const { email, senha } = loginSchema.parse(req.body);

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ msg: "Senha incorreta" });
    }

    res.status(200).json({ msg: "Login bem-sucedido", usuario});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listarUsuarios = async (req, res) => {
    try {
      const usuarios = await Usuario.findAll();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
