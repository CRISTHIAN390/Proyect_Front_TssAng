import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs'; // Importa Observable si lo necesitas para las respuestas
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = environment.apiUrl + "/api/cliente"; // Corrige la URL base

  constructor(
    private http: HttpClient
  ) { }

  // Listar todos los cliente
  list(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  // Crear un nuevo cliente
  create(clien: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, clien);
  }
}
