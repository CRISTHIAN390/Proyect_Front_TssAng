import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    navCap: 'Ui Components',
  },



  //COMPONENTES A USAR
  {
    displayName: 'Usuarios',
    iconName: 'user-plus',
    route: '/components/usuarioslist',  // Actualiza la ruta aquí
  },















  {
    displayName: 'Vehiculos',
    iconName: 'rosette',
    route: '/ui-components/badge',
  },
  {
    displayName: 'Almacen',
    iconName: 'poker-chip',
    route: '/ui-components/chips',
  },
  {
    displayName: 'Reportes',
    iconName: 'list',
    route: '/ui-components/lists',
  },

  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/authentication/register',
  },

];
