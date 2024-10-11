import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteCreate } from '../../models/cliente.model';
@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss']
})
export class ClientesListComponent implements OnInit {
  clientes: any = [];
  selectedCliente: any = null;
  clientForm: FormGroup;
  isModalOpenEliminar: boolean = false;
  isModalOpen: boolean = false;
  isModalOpenEditar: boolean = false;
  errorMessage: string | null = null;
  constructor(
    private clienteService: ClienteService,
    private fb2: FormBuilder,
  ) {
    this.clientForm = this.fb2.group({
      apellidos: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(8)]],
      celular: ['', [Validators.minLength(9), Validators.maxLength(9)]],
      preferencias: ['--'],
      estado: [1],
    });
  }


  ngOnInit() {
    this.listClientes();
  }

  listClientes(): void {
    this.clienteService.list().subscribe(
      (resp: any) => {
        this.clientes = resp;
      },
      (error) => {
        console.error('Error al cargar los clientes', error);
      }
    );
  }

  openModalRegistrar(): void {
    this.isModalOpen = true;
    this.clientForm.reset();
  }


  openModalEliminar(cliente: any = null): void {
    this.isModalOpenEliminar = true;
    this.selectedCliente = cliente;
  }

  /*
    openModalEditar(cliente: any = null): void {
      //tomar datos los clientes
      this.isModalOpenEditar = true;
      this.selectedcliente = cliente;

      this.clientForm.patchValue({
        apellidos: cliente.apellidos,
        nombres: cliente.nombres,
        edad: cliente.edad,
        dni: cliente.dni,
        estado: cliente.estado
      });
    }
  */
  closeModal(): void {
    this.isModalOpen = false;
    this.isModalOpenEditar = false;
    this.isModalOpenEliminar = false;
    this.selectedCliente = null;
  }


  // Método de envío del formulario
  onSubmit(): void {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      //tomamos los datos del formulario para saber que todos se estan tomando

    }
    const formValu = this.clientForm.value;
    this.clienteService.create(formValu).subscribe(
      (resp: any) => {
        console.log('cliente creado exitosamente:', resp);
        this.listClientes();
        this.closeModal();
      },
      (createError: any) => {
        console.error('Error al crear cliente:', createError);
        this.errorMessage = createError.error.message || 'Error al crear el cliente.'+
        this.clientForm.value.apellidos+'\n'+
        this.clientForm.value.nombres+'\n'+this.clientForm.value.dni+'\n'+this.clientForm.value.celular+'\n'+this.clientForm.value.prefencias+'\n'+this.clientForm.value.estado;
      }
    );
  }

  /*
    deleteCliente(id: number): void {
      this.clienteService.deleteCliente(id).subscribe(() => {
        this.clientes = this.clientes.filter((clien: any) => clien.idcliente !== id);
        this.listclientes();
        this.closeModal();
      });
    }

    editarcliente(): void {
      if (this.clientForm.valid) {
        this.clienteService.updateCliente(this.selectedcliente.idcliente, this.clientForm.value).subscribe(
          (resp: any) => {
            const index = this.clientes.findIndex((clien: any) => clien.idcliente === this.selectedcliente.idcliente);
            if (index !== -1) {
              this.clientes[index] = { ...this.clientes[index], ...this.clientForm.value };
            }
            this.closeModal();
          },
          (error) => {
            console.error('Error al actualizar el cliente', error);
          }
        );
      } else {
        console.error('Formulario inválido');
      }
    }
  */





  //Validacion acceso solo a numeros
  onlyNumber(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    // Verifica si el código del carácter está entre los valores ASCII de los números (0-9)
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }





}

