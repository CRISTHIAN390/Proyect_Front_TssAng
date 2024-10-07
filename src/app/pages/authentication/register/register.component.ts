import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/usuarios.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent  implements OnInit{
  usuarioform: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    // Inicializar el formulario
    this.usuarioform = this.fb.group({
      apellidos: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      idrol: [4],  // Valor por defecto
      estado: [1], // Valor por defecto
    });
  }
  ngOnInit(): void {}

  // Método para manejar el registro del usuario
  onSubmit(): void {
    if (this.usuarioform.invalid) {
      this.usuarioform.markAllAsTouched();
      console.error('El formulario es inválido');
      return;
    }

    const formValue = this.usuarioform.value;

    this.userService.create(formValue).subscribe(
      (resp: any) => {
        console.log('Usuario creado exitosamente:', resp);

        // Realizar el login automático después de la creación
        this.authService.login({ email: formValue.email, password: formValue.password }).subscribe(
          (loginResp: any) => {
            localStorage.setItem('token', loginResp.token);
            localStorage.setItem('email', loginResp.email);
            localStorage.setItem('rol', loginResp.rol);
            this.authService.updateStatusLoginService(true);
            this.router.navigate(['/dashboard']);
          },
          (error) => {
            console.error('Error al iniciar sesión:', error);
            this.errorMessage = 'Credenciales incorrectas.';
          }
        );
      },
      (createError: any) => {
        console.error('Error al crear usuario:', createError);
        this.errorMessage = createError.error.message || 'Error al crear el usuario.';
      }
    );
  }
}
