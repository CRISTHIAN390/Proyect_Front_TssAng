import { Routes } from '@angular/router';
import { UsersListComponent } from './usuarios/usuarios-list/usuarios-list.component';

export const ComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'usuarioslist',
        component: UsersListComponent,
      },
      // Otras rutas se pueden añadir aquí
    ],
  },
];
