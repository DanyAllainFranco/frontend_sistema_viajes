import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Environment } from '../environment/enviorement';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private role: string | null = null;

  constructor(private router: Router,private http: HttpClient, private env: Environment) {}

  login(user_username: string, user_password_hash: string): Observable<any> {
    return new Observable((observer) => {
      this.http.post(`${this.env.apiUrl}/login`, { user_username, user_password_hash }).subscribe(
        (response: any) => {
          const token = response.token;
          localStorage.setItem('token', token);

          const decodedToken: any = jwtDecode(token);
          this.role = decodedToken.role;

          observer.next(response);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getRoleFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.role || null;
    }
    return null;
  }

  logout(): void {
    // Eliminar el token del almacenamiento local
    localStorage.removeItem('token');
    this.role = null;

    // Redirigir al usuario al login
    this.router.navigate(['/auth']);
  }
}
