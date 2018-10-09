# Olympus Tours App

Aplicación para clientes de Olympus Tours.

## Comandos del Proyecto

### Instalar dependencias

```
$ npm i
```

### Probar aplicación web

```
$ ionic serve
```

### Probar aplicación móvil

```
$ ionic cordova run android
```
```
$ ionic cordova run ios
```

### Probar aplicación móvil livereload

```
$ ionic cordova run android -l
```
```
$ ionic cordova run ios -l
```
# Generar Proyecto:
### Añadir plataformas y su version
```
$ ionic cordova platform add android@6.4.0
```
```
$ ionic cordova platform add ios
```

### Hacer Build del Proyecto
```
$ cordova clean android
```
```
$ ionic cordova build android
```
```
$ ionic cordova build ios
```
### Hacer Build de Producción del Proyecto

```
$ ionic cordova build ios --prod --release
```
```
$ ionic cordova build android --prod --release -- -- --minSdkVersion=19
```

# Desarrollado con:

* [Ionic 3.2](https://ionicframework.com/docs/cli/) - Mobile app framework
* [Cordova](https://cordova.apache.org/) - Apache Cordova mobile development framework
* [NPM 5.7.1](https://www.npmjs.com/get-npm) - Dependency Management

# Versiones soportadas:

* [iOS] -  iOS 11
* [Android] - sdk 19+


Estructura del Proyecto
============================

> **Archivos de para el funcionamiento de cada página**

    .
    ├── ...
    ├── src              
    │   ├── app          # Archivos que indican como compilar y correr el app
    │   ├── assets       # Imágenes, mapas, íconos y definición del lenguaje
    │   ├── pages        # Todos los archivos que componen a un componente con la vista y el controlador de la página
    │   ├── providers    # Proveedores para obtener todos los objetos que las dependencias necesiten
    │   ├── theme        # Estilo global de la aplicación
    │   └── validators   # Documentos de validación con expresiones regulares
    └── ...


> **Descripción de cada componente (página).**


    .
    ├── ...
    ├── pages                   
    │   ├── airport-map         # Página donde se muestra el visualizador de mapas.
    │   ├── contacto            # Página que entra al stack cada que se da click en el teléfono en la esqina superior derecha para contacto.
    │   ├── destinations        # Página donde se ven los países destino.
    │   ├── destinations-cities # Página donde se ven las ciudades del país destino.
    │   ├── destinations-info   # Página con los tours de la ciudad seleccionada.
    │   ├── global-languages    # Página de configuración de idioma y acceso a legales.
    │   ├── home                # Página principal donde se pueden ver los tours mejor valorados.
    │   ├── intro               # Introducción sobre las funciones del app. (Solo Aparece una vez).
    │   ├── itinerario-registro # Formulario que se llena para ingresar al itinerario.
    │   ├── itinerary           # Itinerario al que accede el usuario despues de agregar su registro.
    │   ├── promociones-login   # Se permite ingresar con facebook al usuario para acceder a las. promociones en este mismo componente.
    │   └── tabs                # Se controlan las pestañas inferiores aquí (íconos, texto y páginas principales).
    └── ...


> **Descripción de proveedores**

    .
    ├── ...
    ├── providers                   
    │   ├── contacto            # Usado en: ContactoPage. Interfaz: ContactoRest.
    │   ├── destinations        # Usado en: HomePage. Interfaces: HighlightedToursRest, MostVisitedToursRest.
    │   ├── device-key          # Usado en: ContactoPage, DestinationsPage, GlobalLanguagesPage, HomePage, ItinerarioRegistroPage, ItineraryPage, PromocionesLoginPage. Interfaces: DeviceKeyTokenLan.
    │   ├── fcm                 # Usado en el componente principal de carga del app para pedir autorización de notificaciones.
    │   ├── itinerario          # Usado en: ItinerarioRegistroPage, ItineraryPage. Interfaces: ItineraryRest, UserRegisterForm.
    │   ├── promociones         # Usado en: PromocionesLoginPage. Interfaz: PromocionesRest.
    │   ├── tours               # Usado en: DestinationsPage, DestinationsCitiesPage, DestinationsInfoPage, ItinerarioRegistroPage. Interfaces: CountryRest, DestinationsRest, ToursRest.
    │   └── usuario             # Usado en: PromocionesLoginPage. Interfaz: Credenciales.
    └── ...

> **Archivos de salida iOS y Android**

    .
    ├── Olympus Tours              
    │   ├── platforms          
    │   	├── ios              # Proyecto Xcode       
    │   	├── android        
    │			  ├──builds
    │				    ├──outputs
    │					      ├──apk        # Archivos ejecutables android
    └── ...

> **Archivos de configuración**

    .
    ├── Olympus Tours              
    │   ├── google-services.json       # Archivo de configuracion firebase android   
    │   ├── GoogleService-info.plist   # Archivo de configuracion firebase ios    
    │   ├── package.json               # Archivo con relación de todas las dependencias utilizadas
    │	  ├── config.xml                 # Archivo de configuracion del proyecto para todas las plataformas
    └── ...
