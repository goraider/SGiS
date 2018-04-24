// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {

  "production": true,
  "API_URL": "http://api.sgis.saludchiapas.gob.mx/api/v1",
  "API_PATH": "http://api.sgis.saludchiapas.gob.mx",
  "OAUTH_CLIENTE": "http://api.sgis.saludchiapas.gob.mx/api/sync",
  "OAUTH_SERVER": "http://api.oa2.che",
  "OAUTH_DISPONIBLE": false,

  "pusher_key": "d4b5aa9ca50d851e5250",
  "pusher_cluster": "us2",
  "pusher_channel": "notificacion-ugus",
  "pusher_event": "my-event",
  "MENU": [
    {
      "titulo": "Dashboard",
      "key": "DashboardController.index",
      "path": "/dashboard",
      "icono": "fa fa-dashboard",
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
      ]
    },    
    {
      "titulo": "Catalogos",
      "key": "",
      "path": "/catalogos/clues/lista",
      "icono": "fa fa-folder-open",
      "lista": [
        {
          "titulo": "Unidades Medicas",
          "key": "CluesController.index",
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
              "path": "/catalogos/nivel-cone/lista",
              "icono": "fa fa-sort-amount-asc"
            },
            {
              "titulo": "Turnos",
              "key": "TurnoController.index",
              "path": "/catalogos/turno/lista",
              "icono": "fa fa-clock-o"
            },
            {
              "titulo": "Cargos",
              "key": "CargoController.index",
              "path": "/catalogos/cargo/lista",
              "icono": "fa fa-user-plus"
            },
            {
              "titulo": "Tipos de Ítems",
              "key": "TipoItemController.index",
              "path": "/catalogos/tipo-item/lista",
              "icono": "fa fa-indent"
            },
            {
              "titulo": "Cartera de Servicios",
              "key": "CarteraServicioController.index",
              "path": "/catalogos/cartera-servicio/lista",
              "icono": "fa fa-newspaper-o"
            },
          ]
        },
        {
          "titulo": "Pacientes",
          "key": "DerechohabienteController.index",
          "path": "",
          "icono": "fa fa-bed",
          "lista": [
            {
              "titulo": "Derechohabientes",
              "key": "DerechohabienteController.index",
              "path": "/catalogos/derechohabiente/lista",
              "icono": "fa fa-address-card-o"
            },
            {
              "titulo": "Estado de Pacientes",
              "key": "EstadoPacienteController.index",
              "path": "/catalogos/estado-paciente/lista",
              "icono": "fa fa-hourglass-half"
            },
            {
              "titulo": "Ubicación de Pacientes",
              "key": "UbicacionPacienteController.index",
              "path": "/catalogos/ubicacion-paciente/lista",
              "icono": "fa fa-heartbeat"
            },
            {
              "titulo": "Parentescos",
              "key": "ParentescoController.index",
              "path": "/catalogos/parentesco/lista",
              "icono": "fa fa-users"
            },
            {
              "titulo": "Metodós de Planificación",
              "key": "MetodoPlanificacionController.index",
              "path": "/catalogos/metodo-planificacion/lista",
              "icono": "fa fa-venus"
            },
            {
              "titulo": "Estado de Embarazos",
              "key": "EstadoEmbarazoController.index",
              "path": "/catalogos/estado-embarazo/lista",
              "icono": "fa fa-female" 
            },
            {
              "titulo": "Tipo de Altas",
              "key": "TipoAltaController.index",
              "path": "/catalogos/tipo-alta/lista",
              "icono": "fa fa-ticket" 
            },
          ]
        },
        {
          "titulo": "Triage",
          "key": "TriageColorController.index",
          "path": "",
          "icono": "fa fa-history",
          "lista": [
            {
              "titulo": "Colores Triage",
              "key": "TriageColorController.index",
              "path": "/catalogos/triage-color/lista",
              "icono": "fa fa-tasks"
            },
            {
              "titulo": "Código Triage",
              "key": "TriageController.index",
              "path": "/catalogos/triage/lista",
              "icono": "fa fa-lightbulb-o"
            },
          ]
        },
        {
          "titulo": "Modelo de Reacción",
          "key": "ApoyoController.index",
          "path": "",
          "icono": "fa fa-cubes",
          "lista": [
            {
              "titulo": "Apoyos",
              "key": "ApoyoController.index",
              "path": "/catalogos/apoyo/lista",
              "icono": "fa fa-handshake-o"
            },
            {
              "titulo": "Municipio",
              "key": "MunicipioController.index",
              "path": "/catalogos/municipio/lista",
              "icono": "fa fa-map"
            },
            {
              "titulo": "Localidades",
              "key": "LocalidadController.index",
              "path": "/catalogos/localidades/lista",
              "icono": "fa fa-map-o"
            },
          ]
        },
        {
          "titulo": "Estados de Incidencias",
          "key": "EstadoIncidenciaController.index",
          "path": "/catalogos/estado-incidencia/lista",
          "icono": "fa fa-line-chart",
        },
        {
          "titulo": "Tipo de Notificaciones",
          "key": "TipoNotificacionController.index",
          "path": "/catalogos/tipo-notificacion/lista",
          "icono": "fa fa-comments-o",
        },
        {
          "titulo": "CIE 10",
          "key": "GrupoCie10Controller.show",
          "path": "/catalogos/grupo-cie10/lista",
          "icono": "fa fa-bug",
        },
        {
          "titulo": "Rutas",
          "key": "RutaController.show",
          "path": "/catalogos/ruta/lista",
          "icono": "fa fa-location-arrow",
        },
      ]
   },

   {
    "titulo": "Transacciones",
    "key": "IncidenciaController.index",
    "path": "/transacciones/incidencia/lista",
    "icono": "fa fa-user-md",
    "lista": [
      {
        "titulo": "Incidencias",
        "key": "IncidenciaController.index",
        "path": "/transacciones/incidencia/lista",
        "icono": "fa fa-volume-control-phone",
      },
      {
        "titulo": "Estado de Fuerza",
        "key": "EstadoFuerzaController.index",
        "path": "/transacciones/estado-fuerza/lista",
        "icono": "fa fa-medkit",
      },
      {
        "titulo": "Directorio",
        "key": "DirectorioController.index",
        "path": "/transacciones/directorio/lista",
        "icono": "fa fa-address-book",
      },
      {
        "titulo": "Censo de Mujeres",
        "key": "CensoPersonaController.index",
        "path": "/transacciones/censo-persona/lista",
        "icono": "fa fa-odnoklassniki",
      },
      {
        "titulo": "Directorio de Apoyos",
        "key": "DirectorioApoyoController.index",
        "path": "/transacciones/directorio-apoyo/lista",
        "icono": "fa fa-book",
      },
      {
        "titulo": "Base de Conocimiento",
        "key": "BaseConocimientoController.index",
        "path": "/transacciones/base-conocimiento/lista",
        "icono": "fa fa-wheelchair-alt",
      },
      {
        "titulo": "Visita Puerperal",
        "key": "VisitaPuerperalController.index",
        "path": "/transacciones/visita-puerperal/lista",
        "icono": "fa fa-calendar-check-o",
      },
      {
        "titulo": "Pantalla Informativa",
        "key": "PantallaInformativaController.index",
        "path": "/transacciones/pantalla-informativa/lista",
        "icono": "fa fa-tv",
      },
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
      "key": "ReporteController.incidencias",
      "path": "/reporte/incidencia-ingresos/lista",
      "icono": "fa fa-list-alt",
      "lista": [
        {
          "titulo": "Reporte de Ingresos",
          "key": "ReporteController.incidencias",
          "path": "/reporte/incidencia-ingresos/lista",
          "icono": "fa fa-volume-control-phone"
        },
        {
          "titulo": "Reporte de Altas",
          "key": "ReporteController.incidenciasAlta",
          "path": "/reporte/incidencia-altas/lista",
          "icono": "fa fa-heart"
        },
        {
          "titulo": "Reporte de Referencias",
          "key": "ReporteController.incidenciasReferencia",
          "path": "/reporte/incidencia-referencias/lista",
          "icono": "fa fa-ambulance"
        },
        {
          "titulo": "Reporte Estado de Fuerza",
          "key": "ReporteController.estadoFuerza",
          "path": "/reporte/estado-fuerza/lista",
          "icono": "fa fa-medkit"
        }
      ]
    },

  ]
};