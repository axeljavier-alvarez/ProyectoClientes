
# Sistema de Gestión de Clientes

Proyecto de desarrollo web que permite administrar clientes mediante una API REST desarrollada en ASP.NET Core .NET 10 y una interfaz web creada con Node.js, Express, EJS y Bootstrap 5.

El sistema implementa las operaciones CRUD (Crear, Leer, Actualizar y Eliminar), conectándose a una base de datos SQL Server Express.

## 1. Tecnologías utilizadas

### Backend
- ASP.NET Core .NET 10
- C#
- Entity Framework Core
- API REST
- Swagger

### Frontend
- Node.js
- Express.js
- EJS
- Bootstrap 5
- Axios
- HTML5 y JavaScript

### Base de datos
- Microsoft SQL Server Express
- SQL Server Management Studio (SSMS)

### Herramientas
- Visual Studio
- Git
- GitHub

## 2. Funcionalidades del sistema

El sistema permite:

- Listar todos los clientes registrados.
- Registrar nuevos clientes.
- Consultar la información de cada cliente.
- Editar los datos de clientes existentes.
- Eliminar clientes mediante confirmación.
- Mostrar mensajes de éxito después de cada operación.
- Validar los datos ingresados en los formularios.
- Validar las solicitudes recibidas por la API REST.

## 3. Arquitectura del proyecto

El sistema utiliza una arquitectura cliente-servidor.

Frontend (Node.js + Express + EJS)
        |
        | Peticiones HTTP mediante Axios
        |
Backend (API REST ASP.NET Core .NET 10)
        |
        | Entity Framework Core
        |
Base de datos SQL Server Express

El frontend consume los endpoints de la API REST y muestra la información mediante vistas EJS.

## 4. Estructura del proyecto

    ProyectoClientes/
    |
    |-- ClientesAPI/
    |   |-- Controllers/
    |   |   |-- ClientesController.cs
    |   |-- Data/
    |   |   |-- ApplicationDbContext.cs
    |   |-- Models/
    |   |   |-- Cliente.cs
    |   |-- Properties/
    |   |-- Program.cs
    |   |-- appsettings.json
    |   |-- ClientesAPI.csproj
    |
    |-- FrontendClientes/
    |   |-- routes/
    |   |   |-- clientes.js
    |   |-- views/
    |   |   |-- index.ejs
    |   |-- app.js
    |   |-- package.json
    |   |-- package-lock.json
    |
    |-- .gitignore
    |-- README.md

## 5. Base de datos

El sistema utiliza SQL Server Express.

Nombre de la base de datos:

    clientes

Tabla principal:

    dbo.clientes

Campos utilizados:

| Campo | Descripción |
|-------|-------------|
| Id_cliente | Identificador único del cliente |
| CUI | Código Único de Identificación |
| NIT | Número de Identificación Tributaria |
| Nombres | Nombres del cliente |
| Apellidos | Apellidos del cliente |
| Direccion | Dirección del cliente |
| Telefono | Número telefónico |
| Fecha_Nacimiento | Fecha de nacimiento |

La API utiliza Entity Framework Core para realizar las operaciones sobre la base de datos.

## 6. Endpoints de la API REST

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/Clientes | Obtener todos los clientes |
| GET | /api/Clientes/{id} | Obtener un cliente por ID |
| POST | /api/Clientes | Registrar un cliente |
| PUT | /api/Clientes/{id} | Actualizar un cliente |
| DELETE | /api/Clientes/{id} | Eliminar un cliente |

Los endpoints pueden probarse mediante Swagger.

URL de Swagger:

    https://localhost:7087/swagger

## 7. Requisitos previos

Para ejecutar el proyecto se necesita:

- .NET SDK 10
- Node.js y npm
- SQL Server Express
- Visual Studio
- SQL Server Management Studio (recomendado)

## 8. Configuración de la base de datos

Crear o restaurar la base de datos `clientes` en SQL Server Express y verificar que exista la tabla `dbo.clientes` con su estructura correspondiente.

Configurar la conexión en el archivo:

    ClientesAPI/appsettings.json

Ejemplo de configuración:

    {
      "ConnectionStrings": {
        "DefaultConnection": "Server=.\\SQLEXPRESS;Database=clientes;Trusted_Connection=True;TrustServerCertificate=True;"
      },
      "Logging": {
        "LogLevel": {
          "Default": "Information",
          "Microsoft.AspNetCore": "Warning"
        }
      },
      "AllowedHosts": "*"
    }

Esta configuración utiliza autenticación de Windows.

La instancia de SQL Server debe ajustarse según el equipo donde se ejecute el proyecto.

Nota: El repositorio no incluye automáticamente una copia de la base de datos. Para instalar el sistema en otro equipo se necesita crear o restaurar su estructura.

## 9. Ejecutar el backend

1. Abrir el proyecto `ClientesAPI` en Visual Studio.
2. Verificar la cadena de conexión.
3. Restaurar las dependencias NuGet.
4. Ejecutar la API REST.
5. Comprobar su funcionamiento mediante Swagger.

Dirección HTTP utilizada localmente:

    http://localhost:5238

Endpoint de prueba:

    http://localhost:5238/api/Clientes

Para las pruebas locales se deshabilitó temporalmente la redirección automática de HTTP a HTTPS.

En un entorno de producción debe configurarse HTTPS correctamente.

## 10. Ejecutar el frontend

Abrir una terminal dentro de la carpeta:

    FrontendClientes

Instalar las dependencias:

    npm install

Ejecutar la aplicación:

    node app.js

Abrir en el navegador:

    http://localhost:3000

Importante: La API REST debe estar ejecutándose para que el frontend pueda consultar y modificar los datos.

## 11. Configuración de Axios

El frontend se comunica con la API REST utilizando Axios.

La configuración se encuentra en:

    FrontendClientes/routes/clientes.js

Configuración utilizada:

    const api = axios.create({
        baseURL: 'http://localhost:5238/api/Clientes',
        timeout: 10000
    });

Si cambia el puerto de la API, debe actualizarse esta dirección.

## 12. Validaciones implementadas

Los formularios y el modelo del backend incluyen validaciones de datos.

| Campo | Validación |
|-------|------------|
| CUI | Exactamente 13 números |
| NIT | Obligatorio, máximo 15 caracteres |
| Nombres | Obligatorio, máximo 100 caracteres |
| Apellidos | Obligatorio, máximo 100 caracteres |
| Dirección | Opcional, máximo 200 caracteres |
| Teléfono | Opcional, exactamente 8 números si se proporciona |
| Fecha de nacimiento | No puede ser una fecha futura |

Estas reglas verifican el formato de los datos, pero no comprueban la autenticidad del CUI o NIT.

## 13. Interfaz del sistema

La interfaz está desarrollada con Bootstrap 5.

Incluye:

- Tabla para visualizar los clientes.
- Modal para registrar clientes.
- Modal para editar clientes.
- Modal de confirmación para eliminar clientes.
- Alertas de éxito después de registrar, editar o eliminar.
- Validaciones HTML5 en los formularios.

## 14. Pruebas realizadas

Se realizaron pruebas locales de las siguientes operaciones:

1. Consulta de clientes mediante GET.
2. Registro de clientes mediante POST.
3. Actualización de clientes mediante PUT.
4. Eliminación de clientes mediante DELETE.
5. Validación de formularios.
6. Validación de solicitudes desde Swagger.
7. Verificación de los datos en SQL Server Express.

## 15. Alcance del proyecto

El proyecto se desarrolló y probó en un entorno local.

Se implementó la comunicación entre el frontend Node.js, la API REST .NET 10 y SQL Server Express.

Esta versión no incluye contenedores Docker ni despliegue en Microsoft Azure.

## 16. Conclusión

El desarrollo de este proyecto permitió implementar una aplicación web basada en una API REST, integrando tecnologías de frontend y backend.

Se aplicaron operaciones CRUD, validaciones de datos, consumo de servicios HTTP mediante Axios y persistencia de información utilizando Entity Framework Core y SQL Server Express.

El resultado es un sistema funcional para la administración básica de clientes en un entorno local.
