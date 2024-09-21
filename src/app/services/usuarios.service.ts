import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs'; // Importa Observable si lo necesitas para las respuestas

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl + "/api/users"; // Corrige la URL base

  constructor(
    private http: HttpClient
  ) { }

  // Listar todos los usuarios
  list(): Observable<any> {
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

  // Listar usuarios por rol
  getByRole(roleId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/role/${roleId}`);
  }

  // Actualizar un usuario
  edit(userId: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, user);
  }

  // Actualizar solo la contraseña de un usuario
  updatePassword(userId: number, passwordData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Password/${userId}`, passwordData);
  }

  // Eliminar un usuario
  delete(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }

}
