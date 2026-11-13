export interface Nota {
  _id: string;
  titulo: string;
  contenido: string;
}

export type NuevaNota = Pick<Nota, 'titulo' | 'contenido'>; // Pick es como forzar a que solo tome estos dos cmapos sin el id