import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs'; // Importa Observable si lo necesitas para las respuestas
@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private apiUrl = environment.apiUrl + "/api/proveedor"; // Corrige la URL base

  constructor(
    private http: HttpClient
  ) { }

  // Listar todos los clientes
  list(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  // Crear un nuevo cliente
  /*
  create(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, user);
  }
*/
}
