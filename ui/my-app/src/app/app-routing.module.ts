import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuarioComponent } from './usuario/usuario.component';
import { DocumentoComponent } from './documento/documento.component';

const routes: Routes = [
  {path:'usuario',component:UsuarioComponent},
  {path:'documento',component:DocumentoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
