import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss']
})
export class ClientesListComponent implements OnInit {
  clientes: any = [];
  selectedcliente: any = null;
  clientForm: FormGroup;
  isModalOpenEliminar: boolean = false;
  isModalOpen: boolean = false;
  isModalOpenEditar: boolean = false;
  constructor(
    public clienteService: ClienteService,
    private fb: FormBuilder,
  ) {
    this.clientForm = this.fb.group({
      apellidos: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      celular: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      preferencias: [''],
      estado: [1],
    });
  }


  ngOnInit(): void { this.listclientes(); }

  listclientes(): void {
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
    this.clientForm.reset(); // Resetea el formulario al abrir el modal
  }


  openModalEliminar(cliente: any = null): void {
    this.isModalOpenEliminar = true;
    this.selectedcliente = cliente;
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
    this.selectedcliente = null;
  }


  onSubmit(): void {
    console.log('Método onSubmit llamado');
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      console.error('El formulario es inválido');
      return;
    }
    const formValue = this.clientForm.value;

    this.clienteService.create(formValue).subscribe(
      (resp: any) => {
        console.log('Cliente creado exitosamente:', resp);
        this.listclientes();
        this.closeModal();
      },
      (createError: any) => {
        console.error('Error al crear cliente:', createError);
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

