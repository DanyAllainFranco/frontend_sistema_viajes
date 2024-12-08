import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from '../environment/enviorement';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ColaboradoresService {
  constructor(private http: HttpClient, private env: Environment,private messageService: MessageService) {}

  getColaboradores(): Observable<any> {
    const url = `${this.env.apiUrl}/colaboradores`;
    return this.http.get(url);
  }

  getSucursales(): Observable<any> {
    const url = `${this.env.apiUrl}/sucursales`;
    return this.http.get(url);
  }

  asignarSucursal(colaboradorId: number, sucursalId: number, distanciaKm: number): Observable<any> {
    const body = { sucursal_id: sucursalId, distancia_km: distanciaKm };
    return this.http.post(`${this.env.apiUrl}/${colaboradorId}/sucursales`, body).pipe(
      catchError((error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema al asignar la sucursal.' });
        throw error;
      })
    );
  }

  // Actualizar sucursal asignada
  actualizarSucursal(colaboradorId: number, sucursalId: number, distanciaKm: number): Observable<any> {
    const body = { distancia_km: distanciaKm };
    return this.http.put(`${this.env.apiUrl}/${colaboradorId}/sucursales/${sucursalId}`, body).pipe(
      catchError((error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema al actualizar la sucursal.' });
        throw error;
      })
    );
  }

  // Eliminar sucursal asignada
  eliminarSucursal(colaboradorId: number, sucursalId: number): Observable<any> {
    return this.http.delete(`${this.env.apiUrl}/${colaboradorId}/sucursales/${sucursalId}`).pipe(
      catchError((error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema al eliminar la sucursal.' });
        throw error;
      })
    );
  }

  // Listar sucursales asignadas a un colaborador
  listarSucursales(colaboradorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.env.apiUrl}/${colaboradorId}/sucursales`).pipe(
      catchError((error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema al obtener las sucursales.' });
        throw error;
      })
    );
  }

}
