import mongoose from 'mongoose';

export const dbConnection = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/notas-rapidas-db';

  await mongoose.connect(uri);

  console.log('Base de datos conectada con éxito');
};