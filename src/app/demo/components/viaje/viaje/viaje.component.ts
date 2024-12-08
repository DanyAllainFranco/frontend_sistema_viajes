import { Component, OnInit } from '@angular/core';
import { ViajesService } from '../../../service/viajes.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.component.html',
  styleUrls: ['./viaje.component.scss']
})
export class ViajeComponent implements OnInit {
  viajes: any[] = [];
  viajeSeleccionado: any = {};
  sucursales: any[] = [];
  transportistas: any[] = [];
  colaboradores: any[] = [];
  displayDialog: boolean = false;
  modalTitle: string = '';

  constructor(private viajesService: ViajesService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.cargarViajes();
    this.cargarSucursales();
    this.cargarTransportistas();
  }

  cargarViajes(): void {
    this.viajesService.getViajes().subscribe(data => {
      this.viajes = data;
    });
  }

  cargarSucursales(): void {
    this.viajesService.getSucursales().subscribe(
      (data) => {
        this.sucursales = data.map((s: any) => ({
          id: s.sucu_id,
          nombre: s.sucu_nombre,
        }));
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las sucursales.',
        });
      });
  }

  cargarTransportistas(): void {
    this.viajesService.getTransportistas().subscribe(
      (data) => {
        this.transportistas = data.map((t: any) => ({
          id: t.trans_id,
          nombre: `${t.trans_nombre} ${t.trans_apellido}`,
        }));
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los transportistas.',
        });
      });
  }

  cargarColaboradores(sucursalId: number): void {
    this.viajesService.getColaboradoresPorSucursal(sucursalId).subscribe(
      (data) => {
        this.colaboradores = data.map((c: any) => ({
          id: c.cola_id,
          nombre: `${c.cola_nombre} ${c.cola_apellido}`,
        }));
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los colaboradores.',
        });
      });
  }

  onSucursalChange(sucursal: any): void {
   this.cargarColaboradores(sucursal.id);
  }

  mostrarDialog(viaje?: any): void {
    if (viaje) {
      this.viajeSeleccionado = { ...viaje };  
      this.modalTitle = 'Editar Viaje';  
      this.onSucursalChange(viaje.sucursal_id);  
    } else {
      this.viajeSeleccionado = { colaboradores: [], viaj_fecha: null, transportista_id: null, sucursal_id: null };
      this.modalTitle = 'Nuevo Viaje';  
    }
    this.displayDialog = true;
  }

  guardarViaje(): void {
    const colaboradoresIds = this.viajeSeleccionado.colaboradores.map((col: any) => col.id);
  
    if (this.viajeSeleccionado.viaj_id) {
      this.viajeSeleccionado.sucursal_id = this.viajeSeleccionado.sucursal_id.id; 
      this.viajeSeleccionado.transportista_id = this.viajeSeleccionado.transportista_id.id;  
      
      this.viajeSeleccionado.colaboradores = colaboradoresIds;
  
      this.viajesService.actualizarViaje(this.viajeSeleccionado.viaj_id, this.viajeSeleccionado).subscribe(response => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Viaje actualizado con éxito' });
        this.cargarViajes();
        this.displayDialog = false;
      });
    } else {
      this.viajeSeleccionado.sucursal_id = this.viajeSeleccionado.sucursal_id.id;  
      this.viajeSeleccionado.transportista_id = this.viajeSeleccionado.transportista_id.id;  
  
      this.viajeSeleccionado.colaboradores = colaboradoresIds;
  
  
      this.viajesService.crearViaje(this.viajeSeleccionado).subscribe(response => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Viaje creado con éxito' });
        this.cargarViajes();
        this.displayDialog = false;
      });
    }
  }
  eliminarViaje(id: number): void {
    this.viajesService.eliminarViaje(id).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Viaje eliminado con éxito' });
      this.cargarViajes();
    });
  }

  cancelar(): void {
    this.displayDialog = false;
  }

  esFormularioValido(): boolean {
    return (
      !!this.viajeSeleccionado.viaj_fecha &&
      !!this.viajeSeleccionado.sucursal_id &&
      this.viajeSeleccionado.colaboradores.length > 0 &&
      !!this.viajeSeleccionado.transportista_id
    );
  }
}
