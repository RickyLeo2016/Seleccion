import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'tipoCatalogo',
        //loadComponent: () => import('./basic-badge/basic-badge.component')
        loadComponent: () => import('./tipo-catalogo/tipo-catalogo.component').then(c => c.TipoCatalogoComponent)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrosGeneralesRoutingModule {}
