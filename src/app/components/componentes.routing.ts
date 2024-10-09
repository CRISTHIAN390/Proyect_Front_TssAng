import { Routes } from '@angular/router';
import { UsersListComponent } from './usuarios/usuarios-list/usuarios-list.component';
import { ClientesListComponent } from './colaboradores/clientes-list/clientes-list.component';
import { ProveedoresListComponent } from './colaboradores/proveedores-list/proveedores-list.component';
export const ComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'usuarioslist',
        component: UsersListComponent,
      },
      {
        path: 'clientelist',
        component: ClientesListComponent,
      },
      {
        path: 'proveedorlist',
        component: ProveedoresListComponent,
      },
      // Otras rutas se pueden añadir aquí
    ],
  },
];
