import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../demo/service/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService, private authService: AuthService) { }

    ngOnInit() {
        const userRole = this.authService.getRoleFromToken(); // Obtener el rol del usuario
        this.model = [
            {
                label: 'Inicio',
                items: [
                    { label: 'Gráficos', icon: 'pi pi-fw pi-home', routerLink: ['/app'] }
                ]
            },
            {
                label: 'Administración',
                items: [
                    ...(userRole === 'Gerente de tienda' ? [ // Solo agregar "Viajes" si es Gerente de tienda
                        { label: 'Viajes', icon: 'pi pi-fw pi-id-card', routerLink: ['/app//viajesIndex'] }
                    ] : []),
                    { label: 'Sucursales', icon: 'pi pi-fw pi-id-card', routerLink: ['/app//sucursales'] }
                ]
            },
            {
                label: 'Reportes',
                items: [
                    { label: 'Reporte de viaje', icon: 'pi pi-fw pi-id-card', routerLink: ['/app//reporte'] },
                ]
            }
        ];
    }
}
