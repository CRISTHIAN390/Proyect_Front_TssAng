import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss']
})
export class UsersListComponent implements OnInit {
  personas: any = [];
  users: UserModel[]=[];
  filteredUsers: any = [];
  modalDeleteVisible = false;
  selectedUser: UserModel | null = null;
  modalUserVisible = false;
  isCreating = false;
  userForm: FormGroup;
  isEditMode = false;

  constructor(
    public userService: UserService,
    private fb: FormBuilder,
  ) {
    this.userForm = this.fb.group({
      first_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', []],
      DNI: ['', []],
      role_id: [1, Validators.required] // Asumiendo que 1 es un valor por defecto
    });
  }

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers() {
    this.userService.list().subscribe((resp: any) => {
        this.personas = resp;
        this.filteredUsers = resp;
      },
      (error) => {
        console.error('Error al cargar los usuarios', error);
      }
    );
  }

  editUser(user: UserModel) {
    this.selectedUser = user;
    this.isEditMode = true;
    this.userForm.patchValue(user); // Rellenar el formulario con los datos del usuario
    this.modalUserVisible = true; // Mostrar el modal para editar
  }

  deleteUser(user: UserModel) {
    this.selectedUser = user;
    this.modalDeleteVisible = true; // Mostrar el modal de confirmación de eliminación
  }

  // Método para crear o actualizar un usuario según el modo
  submitForm() {
    if (this.isEditMode) {
      // Lógica para actualizar el usuario
    } else {
      // Lógica para crear un nuevo usuario
    }
    this.userForm.reset();
    this.modalUserVisible = false; // Cerrar el modal después de la acción
  }
  // Agrega este método en tu clase UsersListComponent
confirmDelete() {
  if (this.selectedUser) {
    this.userService.delete(this.selectedUser.idpersona).subscribe(
      () => {
        // Actualiza la lista de usuarios después de eliminar
        this.listUsers();
        this.modalDeleteVisible = false; // Cierra el modal
        this.selectedUser = null; // Reinicia el usuario seleccionado
      },
      (error) => {
        console.error('Error al eliminar el usuario', error);
      }
    );
  }
}
}
  // Agrega métodos para crear, editar y eliminar usuarios según sea necesario.

