import mongoose from 'mongoose';

const notaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true
  },
  contenido: {
    type: String,
    required: [true, 'El contenido es obligatorio'],
    trim: true
  }
}, {
  versionKey: false
});

export const NotaModel = mongoose.model('Nota', notaSchema);