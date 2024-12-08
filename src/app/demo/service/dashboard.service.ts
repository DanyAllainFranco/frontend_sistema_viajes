import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import{Environment} from '../environment/enviorement' 

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private http: HttpClient, private env: Environment) {}

    obtenerMetricas(): Observable<any> {
        
       
return this.http.get(`${this.env.apiUrl}/dashboard/metricas`);
    }
}