import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { ColaboradorService } from '../../../services/colaborador.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss']
})
export class ClientesListComponent implements OnInit {
  clientes: any = [];
  selectedcliente: any = null;
  isModalOpen: boolean = false;
  constructor(
    public colaboradorService: ColaboradorService,
  ) {}

  ngOnInit(): void {
    this.listclientes();
  }

  listclientes() {
    this.colaboradorService.list().subscribe((resp: any) => {
      this.clientes = resp;
    },
      (error) => {
        console.error('Error al cargar los clientes', error);
      }
    );
  }

/*
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
  }*/
}

