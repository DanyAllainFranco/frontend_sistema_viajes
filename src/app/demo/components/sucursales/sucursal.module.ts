import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SucursalRoutingModule } from './sucursal-routing.module';
import { SucursalComponent } from './sucursal.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [SucursalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SucursalRoutingModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    ToastModule,
    MultiSelectModule,
  ],
  providers: [MessageService],
})
export class SucursalModule {}
