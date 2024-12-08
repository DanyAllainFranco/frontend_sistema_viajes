import { Component, OnInit } from '@angular/core';
import { SucursalesService } from '../../service/sucursales.service';
import { ViajesService } from '../../service/viajes.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-reporte-viaje',
  templateUrl: './reporte-viaje.component.html',
  styleUrl: './reporte-viaje.component.scss'
})
export class ReporteViajeComponent implements OnInit {
  fechaInicio!: Date; 
  fechaFin!: Date; 
  transportistaSeleccionado!: any; 
  sucursalSeleccionada!: any; 

  transportistas: any[] = []; 
  sucursales: any[] = []; 
  datosReporte: any[] = []; 

  constructor(
    private sucursalesService: SucursalesService,
    private viajesService: ViajesService
  ) {}

  ngOnInit(): void {
    this.cargarTransportistas();
  }

  cargarTransportistas(): void {
    this.sucursalesService.getTransportistas().subscribe(
      (data) => {
        this.transportistas = data.map((t: any) => ({
          id: t.trans_id,
          nombre: `${t.trans_nombre} ${t.trans_apellido}`,
        }));
      },
      (error) => {
        console.error('Error al cargar transportistas:', error);
      }
    );
  }

  formatoFecha(fecha: Date): string {
    const año = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const dia = fecha.getDate().toString().padStart(2, '0');
    return `${año}-${mes}-${dia}`;
  }

  generarPDF(): void {
    if (!this.fechaInicio || !this.fechaFin || !this.transportistaSeleccionado) {
      console.error('Faltan parámetros para generar el reporte');
      return;
    }

    const id = this.transportistaSeleccionado.id;

    const fechaInicioFormatted = this.formatoFecha(this.fechaInicio);
    const fechaFinFormatted = this.formatoFecha(this.fechaFin);
    this.viajesService.getReporteViajes(id, fechaInicioFormatted, fechaFinFormatted)
    .subscribe(
      (data) => {
  
        if (data && Array.isArray(data.viajes)) {
          this.datosReporte = data.viajes.map((item: any) => ({
            viaje_id: item.viaje_id,
            total_distancia: parseFloat(item.total_distancia),
            total_a_pagar: parseFloat(item.total_a_pagar),
            colaborador: {
              nombre: item.colaborador_nombre,
              sucursal_salida: item.sucursal_nombre,
              direccion_casa: item.direccion_casa,
              veces_viajaron: item.veces_viajaron,
            },
          }));
        } else {
          console.error('La respuesta de la API no contiene un arreglo válido en "viajes":', data);
        }
  
        const totalKm = this.datosReporte.reduce((sum, item) => sum + item.total_distancia, 0);
        const totalPago = this.datosReporte.reduce((sum, item) => sum + item.total_a_pagar, 0);
  
        const doc = new jsPDF();
  
        doc.setFontSize(18);
        doc.text('Reporte de Viajes', 14, 20);
  
        doc.setFontSize(12);
        doc.text(`Rango de Fechas: ${fechaInicioFormatted} - ${fechaFinFormatted}`, 14, 30);
        doc.text(`Transportista: ${this.transportistaSeleccionado.nombre}`, 14, 40);
  
        const tableData = this.datosReporte.map((item: any) => [
          item.colaborador.nombre,
          item.colaborador.sucursal_salida || 'No disponible',
          item.colaborador.direccion_casa || 'No disponible',
          item.total_distancia.toFixed(2),
          item.total_a_pagar.toFixed(2),
        ]);
        
        autoTable(doc, {
          head: [['Colaborador', 'Sucursal Salida', 'Dirección Casa', 'Total Distancia', 'Total a Pagar']],
          body: tableData,
          startY: 50,
        });
        
        const finalY = (doc as any).lastAutoTable.finalY;
        
        autoTable(doc, {
          head: [['Total de KM', 'Total']],
          
         
        body: [[totalKm.toFixed(2), totalPago.toFixed(2)]],
          startY: finalY + 10,
          theme: 'grid',
        });

        const pdfDataUrl = doc.output('dataurlstring');
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '500px';
        iframe.src = pdfDataUrl;

        const modal = document.getElementById('pdfModal');
        if (modal) {
          modal.innerHTML = '';
          modal.appendChild(iframe);
          modal.style.display = 'block';
        }
      }, (error) => {
        console.error('Error al obtener reporte:', error);
      });
  }
  esFormularioValido(): boolean {
    return !!this.fechaInicio && !!this.fechaFin && !!this.transportistaSeleccionado;
  }
}
