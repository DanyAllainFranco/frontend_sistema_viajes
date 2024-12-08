import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Environment {
  public apiUrl = 'http://localhost:3000/api';
}
