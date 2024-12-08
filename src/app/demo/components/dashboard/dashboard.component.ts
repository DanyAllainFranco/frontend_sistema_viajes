import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    cantidadViajes: number = 0;
    totalKm: number = 0;
    totalDinero: string = '$0.00';
    km: number = 0;
    total: number = 0;
    viajes: number = 0;
    promedioDistanciaData: any;
    viajesPorSucursalData: any;
    transportistasActivosData: any;
    colaboradoresActivosData: any;
    chartOptions: any;

    constructor(private dashboardService: DashboardService) {}

    ngOnInit() {
        this.obtenerMetricas();
    }

    obtenerMetricas() {
        this.dashboardService.obtenerMetricas().subscribe(
            (data: any) => {
                this.cantidadViajes = data.cantidadViajes || 0;
                this.totalKm = parseFloat(data.totalKm) || 0;
                this.totalDinero = `$${parseFloat(data.totalDinero).toFixed(2)}`;
               
                this.km= data.totalKm;

                this.configurarGraficas(data);
            },
            (error) => {
                console.error('Error al cargar las métricas:', error);
            }
        );
    }

    configurarGraficas(data: any) {
        
        this.promedioDistanciaData = {
            labels: ['Promedio Distancia'],
            datasets: [
                {
                    data: [parseFloat(data.promedioDistancia).toFixed(2)],
                    backgroundColor: [this.generarColorAleatorio()],
                },
            ],
        };

        this.viajesPorSucursalData = {
            labels: data.viajesPorSucursal.map((sucursal: any) => sucursal.sucursal_nombre),
            datasets: [
                {
                    label: 'Viajes',
                    data: data.viajesPorSucursal.map((sucursal: any) => sucursal.cantidad_viajes),
                    backgroundColor: data.viajesPorSucursal.map(() => this.generarColorAleatorio()),
                },
            ],
        };

        this.transportistasActivosData = {
            labels: data.transportistasActivos.map((t: any) => t.transportista_nombre),
            datasets: [
                {
                    label: 'Viajes realizados',
                    data: data.transportistasActivos.map((t: any) => t.viajes_realizados),
                    backgroundColor: data.transportistasActivos.map(() => this.generarColorAleatorio()),
                },
            ],
        };

        this.colaboradoresActivosData = {
            labels: data.colaboradoresActivos.map((c: any) => c.colaborador_nombre),
            datasets: [
                {
                    label: 'Viajes realizados',
                    data: data.colaboradoresActivos.map((c: any) => c.viajes_realizados),
                    backgroundColor: data.colaboradoresActivos.map(() => this.generarColorAleatorio()),
                },
            ],
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057',
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057',
                    },
                    grid: {
                        color: '#ebedef',
                    },
                },
                y: {
                    ticks: {
                        color: '#495057',
                    },
                    grid: {
                        color: '#ebedef',
                    },
                },
            },
        };
    }

    generarColorAleatorio(): string {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}
