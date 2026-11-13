import { type Request, type Response } from 'express';
import { NotaModel } from '../models/nota.model.js';

export const getNotas = async (req: Request, res: Response) => {
  try {
    const notas = await NotaModel.find().sort({ _id: -1 }); // Con el id:-1 muetra las notas mas recientes prmiero 

    return res.status(200).json(notas);

  } catch (error) {
    return res.status(500).json({
      msg: 'Error al obtener las notas'
    });
  }
};

export const createNota = async (req: Request, res: Response) => {
  const { titulo, contenido } = req.body;

  if (typeof titulo !== 'string' || typeof contenido !== 'string' || !titulo.trim() || !contenido.trim()) {
    return res.status(400).json({
      msg: 'Título y contenido son obligatorios'
    });
  }

  try {
    const nuevaNota = await NotaModel.create({
      titulo: titulo.trim(), // .trim() elimina los espacios en blanco y valida mejor los campos obligatorios
      contenido: contenido.trim()
    });

    return res.status(201).json(nuevaNota);

  } catch (error) {
    return res.status(500).json({
      msg: 'Error al crear la nota'
    });
  }
};