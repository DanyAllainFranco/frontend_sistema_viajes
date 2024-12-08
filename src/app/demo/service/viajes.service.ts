import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from '../environment/enviorement';

@Injectable({
  providedIn: 'root',
})
export class ViajesService {

  constructor(private http: HttpClient, private env: Environment) {}

  getReporteViajes(transportistaId: number, fechaInicio: string, fechaFin: string): Observable<any> {
    const params = new HttpParams()
      .set('trans_id', transportistaId.toString())
      .set('fecha_inicio', fechaInicio)
      .set('fecha_fin', fechaFin);
      
    return this.http.get<any>(`${this.env.apiUrl}/reportes/viajes`, { params });
  }

  getViajes(): Observable<any> {
    return this.http.get(`${this.env.apiUrl}/listarviajes`);
  }

  getViajeById(id: number): Observable<any> {
    return this.http.get(`${this.env.apiUrl}/viajes/${id}`);
  }

  crearViaje(viajeData: any): Observable<any> {
    return this.http.post(`${this.env.apiUrl}/crearviajes`, viajeData);
  }

  actualizarViaje(id: number, viajeData: any): Observable<any> {
    return this.http.put(`${this.env.apiUrl}/editarviaje/${id}`, viajeData);
  }

  eliminarViaje(id: number): Observable<any> {
    return this.http.delete(`${this.env.apiUrl}/eliminarviaje/${id}`);
  }

  getSucursales(): Observable<any> {
    const url = `${this.env.apiUrl}/sucursales`;
    return this.http.get(url);
  }

  getTransportistas(): Observable<any> {
    const url = `${this.env.apiUrl}/transportistas`;
    return this.http.get(url);
  }


  getColaboradoresPorSucursal(sucursalId: number): Observable<any> {
    return this.http.get(`${this.env.apiUrl}/colaboradores/sucursales/${sucursalId}`);
  }
}
