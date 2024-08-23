import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
 
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: 'feather icon-home',
        classes: 'nav-item'
      }
    ]
  },
  {
    id: 'configuracion',
    title: 'Configuración',
    type: 'group',
    icon: 'icon-cogs',
    children: [
      {
        id: 'parametrosGenerales',
        title: 'Parámetros Generales',
        type: 'collapse',
        icon: 'feather icon-settings',
        children: [
          {
            id: 'tipoCatalogo',
            title: 'Tipo Catálogo',
            type: 'item',
            url: '/parametrosGenerales/tipoCatalogo'
          },
        
        ]
      }
    ]
  },

];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
