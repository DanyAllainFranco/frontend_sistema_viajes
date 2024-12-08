import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteViajeComponent } from './reporte-viaje.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import {ReporteViajeRoutingModule} from './reporte-viaje-routing.module'
@NgModule({
  declarations: [ReporteViajeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
    MultiSelectModule,
    ReporteViajeRoutingModule
  ],
  exports: [ReporteViajeComponent],
})
export class ReporteViajesModule {}
