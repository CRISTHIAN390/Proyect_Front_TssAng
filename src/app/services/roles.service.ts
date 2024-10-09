import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs'; // Importa Observable si lo necesitas para las respuestas

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private apiUrl = environment.apiUrl + "/api/rol"; // Corrige la URL base

  constructor(
    private http: HttpClient
  ) { }

  // Listar todos los roles
  listarR(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  // Crear un nuevo usuario
  create(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, user);
  }

  // Obtener un usuario por su ID
  getById(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }


  // Actualizar un rol
  edit(userId: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, user);
  }

  // Eliminar un rol
  delete(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }
}
