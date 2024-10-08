import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/usuarios.service';
import { RolService } from '../../../services/roles.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel,UsuarioAcceso } from '../../models/user.model';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss']
})
export class UsersListComponent implements OnInit {
  personas: any = [];
  users: UserModel[] = [];
  usuarioAcceso: UsuarioAcceso[] = [];
  roles: any = [];
  filteredUsers: any = [];
  modalDeleteVisible = false;
  selectedusuario: any = null;
  modalUserVisible = false;
  isModalOpen: boolean = false;
  userForm: FormGroup = this.fb.group({
    idusuario: [{ value: '', disabled: true }],
    idrol: 4,
    estado: 1,
  });

  //modelo de la promocion
  userAcceso: UsuarioAcceso = {
    idusuario: 0,
    idrol: 0,
    estado: 1
  };

  constructor(
    public userService: UserService,
    public rolService: RolService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.listRoles();
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
  }

  openModaleditUser(user: any=null): void{
    this.isModalOpen = true;
    this.selectedusuario = user;
    // Usamos patchValue para cargar los datos
    this.userForm.patchValue({
      idusuario: user.idusuario,
      idrol: user.idrol,
      estado: user.estado
    });
  }

  submitForm() {
    if (this.userForm.valid) {
      this.userService.actualizar_acceso(this.selectedusuario.idusuario, this.userForm.value).subscribe(
        (resp: any) => {
          const index = this.users.findIndex((clien: any) => clien.idcliente === this.selectedusuario.idusuario);
          if (index !== -1) {
            this.users[index] = { ...this.users[index], ...this.userForm.value };
          }
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

