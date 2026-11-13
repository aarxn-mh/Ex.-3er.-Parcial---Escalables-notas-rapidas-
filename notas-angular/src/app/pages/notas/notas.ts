import { Component, inject, OnInit, signal } from '@angular/core';
import {  FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NotaService } from '../../services/nota-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-notas',
  styleUrl: './notas.css',
  templateUrl: './notas.html',
})

export class Notas implements OnInit {

  private notaService = inject(NotaService);
  public notas = this.notaService.notas;

  public guardando = signal(false);
  public mensajeError = signal('');

  notaForm = new FormGroup({
    titulo: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),

    contenido: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  // Cuando se incicia el compnente, esto se ejecuta
  ngOnInit(): void {
    this.notaService.cargarNotas();
  }

  guardar(): void {

    if (this.notaForm.invalid) {
      this.notaForm.markAllAsTouched();
      return;
    }

    const nuevaNota = this.notaForm.getRawValue();

    this.guardando.set(true);
    this.mensajeError.set('');

    this.notaService.agregarNota(nuevaNota).subscribe({
      next: () => {
        this.notaForm.reset();
        this.guardando.set(false);
      },

      error: (error) => {
        console.error(error);
        this.mensajeError.set('No se pudo guardar la nota.');
        this.guardando.set(false);
      }
    });
  }
}
