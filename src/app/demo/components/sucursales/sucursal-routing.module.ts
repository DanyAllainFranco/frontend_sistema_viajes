import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SucursalComponent } from './sucursal.component';

@NgModule({
  imports: [RouterModule.forChild([
      { path: '', component: SucursalComponent }
  ])],
  exports: [RouterModule]
})
export class SucursalRoutingModule {}
