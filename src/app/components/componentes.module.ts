import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { MatNativeDateModule } from '@angular/material/core';
import { UsersListComponent } from './usuarios/usuarios-list/usuarios-list.component';
import { ClientesListComponent } from './colaboradores/clientes-list/clientes-list.component';
import { ComponentsRoutes } from './componentes.routing';
import { ProveedoresListComponent } from './colaboradores/proveedores-list/proveedores-list.component';
import { MaterialModule } from '../material.module';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes), // Usa las rutas configuradas
    MatIconModule,
    MaterialModule,
    MatCardModule,
    MatInputModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
  ],
  declarations: [
    UsersListComponent,
    ClientesListComponent,
    ProveedoresListComponent,
  ],
})
export class ComponentsModule {}
