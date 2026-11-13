import {  Injectable, inject, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {  Nota, NuevaNota } from '../interfaces/nota.interface';

@Injectable({
  providedIn: 'root'
})

export class NotaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/notas';

  private _notas: WritableSignal<Nota[]> = signal([]);

  // Es solo lectura desde los componentes
  public notas = this._notas.asReadonly();

  cargarNotas(): void {
    this.http.get<Nota[]>(this.apiUrl).subscribe({
      next: (response) => {
        this._notas.set(response);
      },
      error: (error) => {
        console.error('Error al cargar notas:', error);
      }
    });
  }

  agregarNota(nuevaNota: NuevaNota): Observable<Nota> {
    return this.http.post<Nota>(this.apiUrl, nuevaNota).pipe(
      tap((notaGuardada) => {
        this._notas.update(notas => [
          notaGuardada,
          ...notas
        ]);
      })
    );
  }
}
