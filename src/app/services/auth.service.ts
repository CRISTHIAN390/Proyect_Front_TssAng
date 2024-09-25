import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../environments/environment'; // Ajusta la ruta según tu estructura
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl; // URL de la API desde environment
  private isLoggedInCustomer: boolean = false;
  public isLoggedInChanged = new Subject<boolean>();
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // Método para actualizar el estado de la sesión
  updateStatusLoginService(isLoggedIn: boolean) {
    this.isLoggedInCustomer = isLoggedIn; // Actualiza el estado local
    this.isLoggedInChanged.next(isLoggedIn); // Notifica a los suscriptores
  }

  // Método para obtener el estado actual de la sesión
  get isLoggedInService(): boolean {
    return this.isLoggedInCustomer;
  }

  // Método de inicio de sesión
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/`, credentials);
  }

 // Método de cierre de sesión
 logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('rol');
  this.updateStatusLoginService(false); // Actualiza el estado de sesión
  this.router.navigate(['/login']); // Redirige al usuario a la página de login
}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
