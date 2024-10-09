import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { ProveedorService } from '../../../services/proveedor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-usuarios-list',
  templateUrl: './proveedores-list.component.html',
  styleUrls: ['./proveedores-list.component.scss']
})
export class ProveedoresListComponent implements OnInit {
  proveedores: any = [];
  selectedcliente: any = null;
  isModalOpen: boolean = false;
  constructor(
    public proveedorService: ProveedorService,
  ) {}

  ngOnInit(): void {
    this.listproveedores();
  }

  listproveedores() {
    this.proveedorService.list().subscribe((resp: any) => {
      this.proveedores = resp;
    },
      (error) => {
        console.error('Error al cargar los proveedores', error);
      }
    );
  }
}
