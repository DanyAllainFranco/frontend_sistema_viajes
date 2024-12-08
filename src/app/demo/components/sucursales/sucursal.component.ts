import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SucursalesService } from '../../service/sucursales.service';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.scss'],
  providers: [MessageService],
})
export class SucursalComponent implements OnInit {
  colaboradores: any[] = [];
  sucursales: any[] = [];
  expandedRows: { [key: number]: boolean } = {};   colaboradorSeleccionado: any = null;
  sucursalSeleccionada: any = null;
  distancia: number = 0;
  sucursalesAsignadas: any[] = [];
  isCollapsed = false;
  editingSucursalId: any = null;
  mostrarDialog: boolean = false;
  display: boolean = false;
  asignacionAEliminar: any = null;
  modalTitle: string = '';
  expanded: boolean = false;

  constructor(
    private sucursalService: SucursalesService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadColaboradores();
    this.loadSucursales();
    this.cargarSucursalesAsignadas();
  }



  cargarSucursalesAsignadas(): void {
    this.sucursalService.cargarSucursalesAsignadas().subscribe(
      (data) => {
        this.sucursalesAsignadas = data;
      },
      (error) => {
        console.error('Error al cargar sucursales asignadas:', error);
      }
    );
  }

  loadColaboradores(): void {
    this.sucursalService.getColaboradores().subscribe(
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

  loadSucursales(): void {
    this.sucursalService.getSucursales().subscribe(
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

  abrirModalNuevo(): void {
    this.modalTitle = 'Crear Asignación';
    this.resetForm(); 
    this.mostrarDialog = true; 
  }

  editAsignacion(sucursal: any): void {
    this.modalTitle = 'Editar Asignación';
    this.editingSucursalId = sucursal.id;
    this.colaboradorSeleccionado = {
      id: sucursal.colaborador_id,
      nombre: `${sucursal.colaboradornombre}`,
    };
    this.sucursalSeleccionada = {
      id: sucursal.sucursal_id,
      nombre: sucursal.sucursalnombre,
    };
    this.distancia = sucursal.distancia_km;
    this.mostrarDialog = true;
  }
  
  confirmarEliminacion(sucursal: any): void {
    this.asignacionAEliminar = sucursal;
    this.display = true;
  }
  
  eliminarAsignacion(): void {
    if (this.asignacionAEliminar) {
      const colaboradorId = this.asignacionAEliminar.colaborador_id;
      const sucursalId = this.asignacionAEliminar.sucursal_id;
  
      this.sucursalService.eliminarAsignacion(colaboradorId, sucursalId).subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Asignación eliminada correctamente.',
          });
          this.display = false;
          this.loadSucursales();
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Hubo un error al eliminar la asignación.',
          });
        }
      );
    }
  }
 
  guardarAsignacion(): void {
    if (this.distancia <= 0 || this.distancia > 50) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'La distancia debe ser mayor a 0 y menor o igual a 50 km.',
      });
      return;
    }
  
    if (!this.colaboradorSeleccionado || !this.sucursalSeleccionada) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debes seleccionar un colaborador y una sucursal.',
      });
      return;
    }
  
    
    const colaboradorId = this.colaboradorSeleccionado.id;
    const sucursalId = this.sucursalSeleccionada.id;
    if (this.modalTitle == "Editar Asignación") {
      this.sucursalService.actualizarSucursal(colaboradorId, sucursalId, this.distancia).subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Sucursal asignada correctamente.',
          });
          this.loadSucursales();
          this.resetForm();
          this.mostrarDialog = false;
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Hubo un error al asignar la sucursal.',
          });
        }
      );
    } else {
      this.sucursalService.asignarSucursal(colaboradorId, sucursalId, this.distancia).subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Sucursal asignada correctamente.',
          });
          this.loadSucursales();
          this.resetForm();
          this.mostrarDialog = false;
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Hubo un error al actualizar la sucursal.',
          });
        }
      );
    }
  }

  cerrarModal() {
    this.mostrarDialog = false;
  }

  resetForm(): void {
    this.colaboradorSeleccionado = null;
    this.sucursalSeleccionada = null;
    this.distancia = 0;
    this.editingSucursalId = null; 
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
  }
}
