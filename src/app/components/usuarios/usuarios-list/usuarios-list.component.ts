import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/usuarios.service';
import { RolService } from '../../../services/roles.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioAcceso } from '../../models/user.model';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss']
})
export class UsersListComponent implements OnInit {
  personas: any = [];
  roles: any = [];
  isModalOpen: boolean = false;
  selectedusuario: any = null;
  userForm: FormGroup;

  constructor(
    public userService: UserService,
    public rolService: RolService,
    private fb: FormBuilder,
  ) {
    this.userForm = this.fb.group({
      idusuario: [''],
      idrol: [''], // Debe ser un número
      estado: ['']
    });
  }

  ngOnInit(): void {
    this.listRoles();
    this.listUsers();
  }

  listUsers() {
    this.userService.list().subscribe((resp: any) => {
      this.personas = resp;
    },
      (error) => {
        console.error('Error al cargar los usuarios', error);
      }
    );
  }

  listRoles() {
    this.rolService.list().subscribe((resp: any) => {
      this.roles = resp;
    },
      (error) => {
        console.error('Error al cargar los roles', error);
      }
    );
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedusuario = null;
    this.userForm.reset(); // Reinicia el formulario si es necesario
  }

  openModaleditUser(user: any = null): void {
    //tomar datos los usuarios
    this.isModalOpen = true;
    this.selectedusuario = user;

    // Usamos patchValue para cargar los datos
    this.userForm.patchValue({
      idusuario: user.idusuario,
      idrol: user.idrol,
      estado: user.estado ? '1' : '0', // Convertimos booleano a cadena
    });
  }

  submitForm() {
    if (this.userForm.valid) {
      console.log('Valores del formulario:', this.userForm.value); // Agrega esta línea
      const useracc: UsuarioAcceso = {
        idusuario: this.userForm.value.idusuario,
        idrol: this.userForm.value.idrol,
        estado: this.userForm.value.estado
      };
      const userId = this.userForm.value.idusuario;
  
      this.userService.actualizar_acceso(userId, useracc).subscribe(
        response => {
          console.log('Usuario actualizado:', response);
          this.listUsers(); 
          this.closeModal();
        },
        (error) => {
          console.error('Error al actualizar el usuario', error);
        }
      );
    } else {
      console.error('Formulario inválido');
    }
  }
}

