import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReporteViajeComponent } from './reporte-viaje.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ReporteViajeComponent }
    ])],
    exports: [RouterModule]
})
export class ReporteViajeRoutingModule { }
