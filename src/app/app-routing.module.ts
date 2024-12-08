import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            // Ruta principal redirigida a la autenticación
            { path: '', redirectTo: 'auth', pathMatch: 'full' },
            
            // Ruta para autenticación
            { path: 'auth', loadChildren: () => import('./demo/components/auth/login/login.module').then(m => m.LoginModule) },
            
            // Ruta protegida (layout principal) cargada después de autenticación
            {
                path: 'app', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'reporte', loadChildren: () => import('./demo/components/reporte-viaje/reporte-viajes.module').then(m => m.ReporteViajesModule) },
                    { path: 'viajesIndex', loadChildren: () => import('./demo/components/viaje/viaje/viaje.module').then(m => m.ViajeModule) },
                    { path: 'sucursales', loadChildren: () => import('./demo/components/sucursales/sucursal.module').then(m => m.SucursalModule) },
                ]
            },

            // Ruta 404 para redirección de rutas inválidas
            { path: '**', redirectTo: 'auth' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}