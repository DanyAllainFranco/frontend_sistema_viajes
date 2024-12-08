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
  minDate: Date = new Date(1990, 0, 1); 
  maxDate: Date = new Date(2990, 11, 31); 

  constructor(private viajesService: ViajesService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.cargarViajes();
    this.cargarSucursales();
    this.cargarTransportistas();
  }

  cargarViajes(): void {
    this.viajesService.getViajes().subscribe(
      (data) => {
        this.viajes = data;
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los viajes.',
        });
      }
    );
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
      }
    );
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
      }
    );
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
      }
    );
  }

  onSucursalChange(sucursal: any): void {
    this.cargarColaboradores(sucursal.id);
  }

  mostrarDialog(): void {
    this.viajeSeleccionado = { colaboradores: [], viaj_fecha: null, transportista_id: null, sucursal_id: null };
    this.modalTitle = 'Nuevo Viaje';
    this.displayDialog = true;
  }

  guardarViaje(): void {
    const colaboradoresIds = this.viajeSeleccionado.colaboradores.map((col: any) => col.id);

    const totalDistancia = this.viajeSeleccionado.colaboradores.reduce(
      (sum: number, col: any) => sum + (col.distancia_km || 0), 
      0
    );
    
    if (totalDistancia > 100) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'La suma de las distancias no debe superar los 100 km.',
      });
      return;
    }

    const colaboradoresViajesHoy = this.viajes.filter((v: any) =>
      v.viaj_fecha === this.viajeSeleccionado.viaj_fecha &&
      this.viajeSeleccionado.colaboradores.some((col: any) => v.colaboradores.includes(col.id))
    );

    if (colaboradoresViajesHoy.length > 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Un colaborador solo puede viajar una vez por día.',
      });
      return;
    }
    this.viajeSeleccionado.sucursal_id = this.viajeSeleccionado.sucursal_id.id;
    this.viajeSeleccionado.transportista_id = this.viajeSeleccionado.transportista_id.id;
    this.viajeSeleccionado.colaboradores = colaboradoresIds;

    this.viajesService.crearViaje(this.viajeSeleccionado).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Viaje creado con éxito' });
        window.location.reload(); 
      },() =>{
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Viaje creado con éxito' });
        window.location.reload(); 
      }
    );
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
