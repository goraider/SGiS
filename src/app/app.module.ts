import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './parcial/not-found/not-found.component';

import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { JwtRequestService } from './jwt-request.service';
import { JwtHelper } from 'angular2-jwt';

import { AppRoutingModule }             from './app-routing.module';
import { WildcardRoutingModule } from './wildcard-routing.module';
import { HubModule } from './hub/hub.module';
import { MenuModule } from './menu/menu.module';
import { PerfilModule } from './perfil/perfil.module';
import { PerfilEditModule } from './perfil/perfil-edit.module';
import { BloquearPantallaModule } from './bloquear-pantalla/bloquear-pantalla.module';
import { PipesModule }             from './pipes/pipes.module';
import { IndexModule } from './index/index.module';

//Sistema
import { UsuariosModule } from './sistema/usuarios/usuarios.module';
import { GruposModule } from './sistema/grupos/grupos.module';
import { ModulosModule } from './sistema/modulos/modulos.module';
import { SisDashboardModule } from './sistema/dashboard/sis-dashboard.module';
import { SisReporteModule } from './sistema/reporte/sis-reporte.module';
import { SucursalModule } from './sistema/sucursal/sucursal.module';
import { ConfiguracionSucursalModule } from './sistema/configuracion-sucursal/sucursal.module';


//catalogos

import { TipoRedSocialModule } from './catalogos/tipo-red-social/tipo-red-social.module';
import { TipoMedioModule } from './catalogos/tipo-medio/tipo-medio.module';

//unidades medicas
import { CluesModule } from './catalogos/clues/clues.module';
import { NivelesConesModule } from './catalogos/niveles-cones/niveles-cones.module'
import { CargosModule } from './catalogos/cargos/cargos.module';
import { TurnosModule } from './catalogos/turnos/turnos.module';
import { TiposItemsModule } from './catalogos/tipos-items/tipos-items.module';
import { CarteraServiciosModule } from './catalogos/cartera-servicios/cartera-servicios.module';

//pacientes
import { EstadosPacientesModule } from './catalogos/estados-pacientes/estados-pacientes.module';
import { UbicacionesPacientesModule } from './catalogos/ubicaciones-pacientes/ubicaciones-pacientes.module';
import { TiposAltasModule } from './catalogos/tipos-altas/tipos-altas.module';
import { ParentescosModule } from './catalogos/parentescos/parentescos.module';
import { MetodosPlanificacionModule } from './catalogos/metodos-planificacion/metodos-planificacion.module';
import { EstadosEmbarazosModule } from './catalogos/estados-embarazos/estados-embarazos.module';
import { DerechohabientesModule } from './catalogos/derechohabientes/derechohabientes.module';

//Modelo de Reaccion
import { MunicipioModule } from './catalogos/municipio/municipio.module';
import { PaisModule } from './catalogos/pais/pais.module';
import { EstadoModule } from './catalogos/estado/estado.module';
import { ApoyosModule } from './catalogos/apoyos/apoyos.module';

import { LocalidadesModule } from './catalogos/localidades/localidades.module';
import { MunicipiosModule } from './catalogos/municipios/municipios.module';

//cie10
import { GruposCie10Module } from './catalogos/grupos-cie10/grupos-cie10.module';

//triage
import { TriageModule } from './catalogos/triage/triage.module';
import { TriageColoresModule } from './catalogos/triage-colores/triage-colores.module';

//rutas
import { RutasModule } from './catalogos/rutas/rutas.module';

//notificaciones
import { EscalamientosNotificacionesModule } from './sistema/escalamientos-notificaciones/escalamientos-notificaciones.module';
import { TiposNotificacionesModule } from './catalogos/tipos-notificaciones/tipos-notificaciones.module';

//estados de incidencia
import { EstadosIncidenciasModule } from './catalogos/estados-incidencias/estados-incidencias.module';

//operaciones
import { IncidenciasModule } from './transacciones/incidencias/incidencias.module';
import { SeguimientosModule } from './transacciones/incidencias/seguimiento/seguimientos.module';
import { EstadoFuerzaModule } from './transacciones/estado-fuerza/estado-fuerza.module';
import { DirectorioModule } from './transacciones/directorio/directorio.module';
import { DirectorioApoyosModule } from './transacciones/directorio-apoyos/directorio-apoyos.module';
import { CensoPersonasModule } from './transacciones/censo-personas/censo-personas.module';
import { BaseConocimientosModule } from './transacciones/base-conocimientos/base-conocimientos.module';
//import { CajaModule } from './transaccion/caja/caja.module';

//Inventario
import { ArticuloModule } from './invetario/articulo/articulo.module';

//reportes
import { ReporteVentaModule } from './reporte/resumen/reporte-venta.module';
import { ReporteArticuloModule } from './reporte/inventario/reporte-articulo.module';

import { ReporteIncidenciaModule } from './reporte/incidencias/reporte-incidencia.module';
import { ReporteEstadoFuerzaModule } from './reporte/estado-fuerza/reporte-estado-fuerza.module';

//Notificacion Pusher
import { NotificacionPusherModule } from './notificacion/notificacion-pusher.module';

// Asegurarase que en imports "WildcardRoutingModule" vaya al ÚLTIMO
// Esto nos sirve para redireccionar a una página 404 en lugar de que se genere un error

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    HubModule,
    MenuModule,
    IndexModule,
    PerfilModule,
    PerfilEditModule,
    BloquearPantallaModule,
    PipesModule,
    UsuariosModule,
    GruposModule,
    ModulosModule,
    SisDashboardModule,
    SisReporteModule,
    SucursalModule,
    ConfiguracionSucursalModule,
    
    TipoRedSocialModule,
    TipoMedioModule,

    CluesModule,
    NivelesConesModule,
    CargosModule,
    TurnosModule,
    TiposItemsModule,
    CarteraServiciosModule,

    EstadosPacientesModule,
    UbicacionesPacientesModule,
    TiposAltasModule,
    ParentescosModule,
    MetodosPlanificacionModule,
    EstadosEmbarazosModule,
    DerechohabientesModule,
    
    PaisModule,
    EstadoModule,
    MunicipioModule,
    ApoyosModule,

    MunicipiosModule,
    LocalidadesModule,

    GruposCie10Module,
    
    TriageModule,
    TriageColoresModule,
    
    RutasModule,
    EstadosIncidenciasModule,
    SeguimientosModule,
    IncidenciasModule,
    EstadoFuerzaModule,
    DirectorioModule,
    DirectorioApoyosModule,
    CensoPersonasModule,
    BaseConocimientosModule,
    
    ReporteVentaModule,
    ReporteArticuloModule,

    ReporteIncidenciaModule,

    NotificacionPusherModule,
    
    TiposNotificacionesModule,
    EscalamientosNotificacionesModule,
    
    WildcardRoutingModule, // Este siempre debe ir al final para que no haga conflicto con otras rutas    
  ],
  providers: [ Title,
               AuthGuard,
               AuthService,
               JwtHelper,
               JwtRequestService,
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }

