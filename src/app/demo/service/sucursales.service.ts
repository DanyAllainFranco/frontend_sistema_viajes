import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from '../environment/enviorement';

@Injectable({
  providedIn: 'root',
})
export class SucursalesService {
  constructor(private http: HttpClient, private env: Environment) { }

  getColaboradores(): Observable<any> {
    const url = `${this.env.apiUrl}/colaboradores`;
    return this.http.get(url);
  }

  getSucursales(): Observable<any> {
    const url = `${this.env.apiUrl}/sucursales`;
    return this.http.get(url);
  }

  getTransportistas(): Observable<any> {
    const url = `${this.env.apiUrl}/transportistas`;
    return this.http.get(url);
  }

  asignarSucursal(colaborador_id: number, sucursalId: number, distanciaKm: number): Observable<any> {
    const body = { sucursal_id: sucursalId, distancia_km: distanciaKm };
    return this.http.post(`${this.env.apiUrl}/colaboradores/${colaborador_id}/sucursales`, body);
  }

  actualizarSucursal(colaborador_id: number, sucursalId: number, distanciaKm: number): Observable<any> {
    const body = { distancia_km: distanciaKm };  
    return this.http.put(`${this.env.apiUrl}/colaboradores/${colaborador_id}/sucursales/${sucursalId}`, body);
  }

  eliminarSucursal(colaborador_id: number, sucursalId: number): Observable<any> {
    return this.http.delete(`${this.env.apiUrl}/${colaborador_id}/sucursales/${sucursalId}`);
  }
  eliminarAsignacion(colaborador_id: number, sucursalId: number): Observable<any> {
    return this.http.delete(`${this.env.apiUrl}/colaboradores/${colaborador_id}/sucursales/${sucursalId}`);
  }
  listarSucursales(colaboradorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.env.apiUrl}/${colaboradorId}/sucursales`);
  }

  cargarSucursalesAsignadas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.env.apiUrl}/colaboradores/sucursalesconcolaborador`);
  }

}
