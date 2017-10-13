// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  "production": true,
  "API_URL": "http://192.168.1.24:8000/api/v1",
  "API_PATH": "http://192.168.1.24:8000",
  "OAUTH_CLIENTE": "http://192.168.1.24/api/sync",
  "OAUTH_SERVER": "http://api.oa2.che",
  "OAUTH_DISPONIBLE": false,
  "pusher_key": "d4b5aa9ca50d851e5250",
  "pusher_cluster": "us2",
  "pusher_channel": "private-notificacion-ugus",
  "pusher_event": "App\Events\NotificacionEvent",
  "MENU": [
    {
      "titulo": "Dashboard",
      "key": "",
      "path": "/dashboard",
      "icono": "fa fa-dashboard",
      "lista": []
    },    
    {
      "titulo": "Catalogos",
      "key": "",
      "path": "/catalogos",
      "icono": "fa fa-folder",
      "lista": [
        {
          "titulo": "Unidades Medicas",
          "key": "",
          "path": "",
          "icono": "fa fa-hospital-o",
          "lista": [
            {
              "titulo": "Clues",
              "key": "CluesController.index",
              "path": "/catalogos/clues/lista",
              "icono": "fa fa-h-square"
            },
            {
              "titulo": "Nivel de CONE",
              "key": "NivelConeController.index",
              "path": "/catalogos/niveles-cones/lista",
              "icono": "fa fa-globe"
            },
            {
              "titulo": "Turnos",
              "key": "TurnoController.index",
              "path": "/catalogos/turnos/lista",
              "icono": "fa fa-globe"
            },
            {
              "titulo": "Tipos de Ítems",
              "key": "TipoItemController.index",
              "path": "/catalogos/tipos-items/lista",
              "icono": "fa fa-globe"
            },
            {
              "titulo": "Cartera de Servicios",
              "key": "CarteraServicioController.index",
              "path": "/catalogos/cartera-servicios/lista",
              "icono": "fa fa-globe"
            },
          ]
        },
        {
          "titulo": "Pacientes",
          "key": "",
          "path": "",
          "icono": "fa fa-globe",
          "lista": [
            {
              "titulo": "Estado de Pacientes",
              "key": "EstadoPacienteController.index",
              "path": "/catalogos/estados-pacientes/lista",
              "icono": "fa fa-globe"
            },
            {
              "titulo": "Valoración de Pacientes",
              "key": "ValoracionPacienteController.index",
              "path": "/catalogos/valoraciones-pacientes/lista",
              "icono": "fa fa-globe"
            },
            {
              "titulo": "Parentescos",
              "key": "ParentescoController.index",
              "path": "/catalogos/parentescos/lista",
              "icono": "fa fa-globe"
            },
            {
              "titulo": "Metodós de Planificación",
              "key": "MetodoPlanificacionController.index",
              "path": "/catalogos/metodos-planificacion/lista",
              "icono": "fa fa-globe"
            },
            {
              "titulo": "Estados de Embarazos",
              "key": "EstadoEmbarazoController.index",
              "path": "/catalogos/estados-embarazos/lista",
              "icono": "fa fa-globe" 
            },
            {
              "titulo": "Derechohabientes",
              "key": "MetodoPlanificacionController.index",
              "path": "/catalogos/derechohabientes/lista",
              "icono": "fa fa-globe"
            },
          ]
        },
        {
          "titulo": "Rutas",
          "key": "RutaController.index",
          "path": "/catalogos/rutas/lista",
          "icono": "fa fa-location-arrow",
          "lista": []
        },
        {
        "titulo": "Estados de Incidencias",
        "key": "EstadoIncidenciaController.index",
        "path": "/catalogos/estados-incidencias/lista",
        "icono": "fa fa-globe",
        "lista": []
        },
        {
          "titulo": "Modelo de Reacción",
          "key": "",
          "path": "",
          "icono": "fa fa-globe",
          "lista": [
            {
              "titulo": "Apoyos",
              "key": "ApoyoController.index",
              "path": "/catalogos/apoyos/lista",
              "icono": "fa fa-globe"
            },
            {
              "titulo": "Municipio",
              "key": "MunicipioController.index",
              "path": "/catalogos/municipio/lista",
              "icono": "fa fa-globe"
            },
            {
              "titulo": "Localidades",
              "key": "LocalidadController.index",
              "path": "/catalogos/localidades/lista",
              "icono": "fa fa-globe"
            },
          ]
        },
        {
          "titulo": "CIE 10",
          "key": "PaisController.index",
          "path": "",
          "icono": "fa fa-globe",
          "lista": [
            {
              "titulo": "Grupos CIE 10",
              "key": "GrupoCie10Controller.index",
              "path": "/catalogos/grupos-cie10/lista",
              "icono": "fa fa-globe"
            },
          ]
        },
        {
          "titulo": "Triage",
          "key": "",
          "path": "",
          "icono": "fa fa-globe",
          "lista": [
            {
              "titulo": "Colores Triage",
              "key": "TriageColorController.index",
              "path": "/catalogos/triage-colores/lista",
              "icono": "fa fa-globe"
            },
            {
              "titulo": "Código Triage",
              "key": "TriageController.index",
              "path": "/catalogos/triage-colores/lista",
              "icono": "fa fa-globe"
            },
          ]
        }
      ]
   },

    {
      "titulo": "Incidencias",
      "key": "IncidenciaController.show",
      "path": "/transacciones/incidencias/lista",
      "icono": "fa fa-android",
      "lista": []
    },
    {
      "titulo": "Estado de Fuerza",
      "key": "EstadoFuerzaController.show",
      "path": "/transacciones/estado-fuerza/lista",
      "icono": "fa fa-medkit",
      "lista": []
    },


    {
      "titulo": "Sistema",
      "key": "UsuarioController.index",
      "path": "/sistema",
      "icono": "fa fa-laptop",
      "lista": [
        {
          "titulo": "Grupo",
          "key": "SisGrupoController.index",
          "path": "/sistema/grupo/lista",
          "icono": "fa fa-group"
        },
        {
          "titulo": "Modulo",
          "key": "SisModuloController.index",
          "path": "/sistema/modulo/lista",
          "icono": "fa fa-th"
        },
        {
          "titulo": "Usuarios",
          "key": "SisUsuarioController.index",
          "path": "/sistema/usuario/lista",
          "icono": "fa fa-user"
        },
        {
          "titulo": "Version APP",
          "key": "VersionAppController.index",
          "path": "/sistema/version-app/lista",
          "icono": "fa fa-android"
        },
        {
          "titulo": "Dashboards",
          "key": "SisDashboardController.index",
          "path": "/sistema/dashboard/lista",
          "icono": "fa fa-dashboard"
        },
        {
          "titulo": "Reportes",
          "key": "SisReporteController.index",
          "path": "/sistema/reporte/lista",
          "icono": "fa fa-list-alt"
        }
      ]
    },

    {
      "titulo": "Descargar APP",
      "key": "VersionAppController.descargar",
      "path": "/descargar-app",
      "icono": "fa fa-android",
      "lista": []
    },

    {
      "titulo": "Reportes",
      "key": "ReporteController.index",
      "path": "/reporte",
      "icono": "fa fa-list-alt",
      "lista": [
        
      ]
    },
  ]
};