import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {  ViajeComponent} from './viaje.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ViajeComponent }
    ])],
    exports: [RouterModule]
})
export class ViajeRoutingModule { }
