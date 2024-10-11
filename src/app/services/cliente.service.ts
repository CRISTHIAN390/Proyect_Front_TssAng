import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs'; // Importa Observable si lo necesitas para las respuestas
import { ClienteCreate } from '../components/models/cliente.model';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = environment.apiUrl+'/api/cliente'; // Corrige la URL base

  constructor(private http: HttpClient) { }


    // Crear un nuevo cliente
    create(client: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/`, client);
    }

    // Listar todos los usuarios
    list(): Observable<any> {
      return this.http.get(`${this.apiUrl}/`);
    }
}
