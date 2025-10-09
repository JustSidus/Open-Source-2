# Sistema de Dispensario Médico

Backend en Node.js + Express con SQLite y frontend estático (HTML/CSS/JS) existente.

## Estructura

```
server/               # Backend Express (MVC simplificado)
  app.js              # Punto de entrada
  db/                 # Conexión y esquema SQLite
  models/             # Modelos BaseModel CRUD
  controllers/        # Controladores (genéricos + visitas/reportes)
  routes/             # Rutas REST (/api/...)
Dispensario medico/   # Frontend estático (HTML, CSS, JS)
data/dispensario.db   # Base de datos SQLite (auto-creada)
```

## Entidades

- drug_types (Tipos de Fármacos)
- brands (Marcas)
- locations (Ubicaciones / Almacén)
- medicines (Medicamentos)
- doctors (Médicos)
- patients (Pacientes)
- visits (Registro de Visitas)

## Requerimientos Cubiertos

1. Arquitectura MVC ligera con separación de modelos, controladores y rutas.
2. CRUD completo para todas las entidades.
3. Reporte de visitas filtrable por médico, paciente, fecha o rango.
4. API REST JSON bajo `/api/*`.
5. Frontend servida como estático (puedes abrir directamente o vía servidor).
6. Navegación centralizada mediante `index.html` (dashboard) y `navbar.html` reutilizable.
7. Página de Almacén consolida catálogos base: Ubicaciones, Tipos de Fármacos y Marcas.

## Instalación

1. Instalar dependencias:
```bash
cd server
npm install
```
2. Ejecutar en desarrollo (con recarga):
```bash
npm run dev
```
3. Producción simple:
```bash
npm start
```
4. Abrir en el navegador: http://localhost:3000/Html/Medicamentos.html (o cualquier vista)

La base de datos se crea automáticamente al iniciar si no existe.

## Navegación y Dashboard

Página inicial: `index.html` (panel simple con accesos rápidos). Todas las vistas incluyen dinámicamente la barra de navegación cargando el fragmento `navbar.html` a través del script `navbar.js`.

Archivos clave:
- `Dispensario medico/Html/index.html` – Dashboard de inicio.
- `Dispensario medico/Html/navbar.html` – Fragmento HTML reutilizable (no abrir directo, se inyecta).
- `Dispensario medico/js/navbar.js` – Carga el fragmento y aplica estado activo.
- `Dispensario medico/js/navigation.js` – Intercepta (parcialmente) la navegación interna; actualmente mantiene recarga completa para asegurar inicialización de cada script específico.

## Página de Almacén (Catálogos Base)

`Almacen.html` ahora gestiona tres catálogos fundamentales consumidos por otras entidades:
- Ubicaciones (`/api/locations`)
- Tipos de Fármacos (`/api/drug-types`)
- Marcas (`/api/brands`)

El script `appAlmacen.js` realiza CRUD independiente para cada sección y refresca las tablas tras crear / editar / eliminar. Cada entidad mantiene su propio estado de edición.

Estos catálogos se usan en `Medicamentos` para asignar: tipo, marca y ubicación. Por lo tanto, antes de registrar medicamentos debes crear primero al menos un registro en cada catálogo base.

## Flujo de Uso Recomendado
1. Ingresar a `Almacen.html` y crear Tipos, Marcas y Ubicaciones necesarias.
2. Registrar Médicos y Pacientes.
3. Registrar Medicamentos (ya habrá opciones en los select de tipos/marcas/ubicaciones si se implementa la carga cruzada; actualmente se seleccionan por ID numérico, mejora futura sugerida: poblar selects usando los catálogos).
4. Registrar Visitas vinculando médico, paciente y opcionalmente medicamento.
5. Generar reportes filtrando en `Visitas.html` por médico, paciente, fecha o rango.

## Estructura Frontend Relevante

```
Dispensario medico/
  Html/
    index.html          # Dashboard
    Almacen.html        # Catálogos base (ubicaciones, tipos, marcas)
    Medicamentos.html
    Medicos.html
    Pacientes.html
    Visitas.html
    navbar.html         # Fragmento (no abrir directo)
  js/
    commonApi.js        # Wrapper fetch con manejo de errores
    appAlmacen.js       # CRUD multi-catálogo
    appMedicamentos.js
    appMedicos.js
    appPacientes.js
    appVisitas.js       # CRUD + reportes
    navbar.js           # Inserta navbar
    navigation.js       # Intento de SPA ligera (fallback a recarga)
  css/
    layout.css          # Estilos globales/navbar
    estilos*.css        # Estilos específicos heredados
```

## Nota sobre SPA Ligera
`navigation.js` intercepta clicks internos; debido a la lógica por página y simplicidad se mantiene recarga completa para asegurar que cada script configure eventos/formularios sin efectos colaterales. Una futura mejora sería modularizar inicializaciones y permitir intercambio parcial de `<main>`.

## Cómo Agregar una Nueva Entidad (Guía Rápida)
Ejemplo: agregar "proveedores" (suppliers).

1. Base de datos: añadir tabla en `server/db/schema.js`.
2. Modelo: en `server/models/baseModel.js` ya existe BaseModel; basta crear instancia en `models/index.js`:
   ```js
   const Supplier = new BaseModel('suppliers', ['nombre','telefono','estado']);
   module.exports = { ..., Supplier };
   ```
3. Ruta: crear `server/routes/suppliers.routes.js`:
   ```js
   const router = require('express').Router();
   const { Supplier } = require('../models');
   const createController = require('../controllers/generic.controller');
   const c = createController(Supplier);
   router.get('/', c.list);
   router.get('/:id', c.get);
   router.post('/', c.create);
   router.put('/:id', c.update);
   router.delete('/:id', c.remove);
   module.exports = router;
   ```
4. Registrar la ruta en `app.js`:
   ```js
   app.use('/api/suppliers', require('./routes/suppliers.routes'));
   ```
5. Frontend: crear `Html/Proveedores.html` + `js/appProveedores.js` replicando patrón CRUD existente.
6. Añadir link en `navbar.html`.

## Mejoras Futuras Sugeridas (Frontend)
- Poblar selects en `Medicamentos.html` usando catálogos (tipos, marcas, ubicaciones) mostrando nombres en vez de IDs.
- Mostrar nombres descriptivos en listados (joins o carga previa de diccionarios). 
- Validaciones más ricas y feedback visual.
- Confirmaciones modales personalizadas.
- Tema oscuro / accesibilidad (contraste y ARIA labels).

## Comandos Útiles (resumen)
Desarrollo backend:
```bash
cd server
npm run dev
```
Servidor producción simple:
```bash
cd server
npm start
```

## Consideraciones Windows
El nombre de carpeta con espacio (`Dispensario medico`) no afecta al servidor porque se sirve estáticamente desde `app.js`. Evita renombrar después de que la base ya fue creada salvo que ajustes rutas.

## Roadmap Breve
- [ ] Cargar catálogos en selects de Medicamentos.
- [ ] Reemplazar IDs crudos en tablas por etiquetas amigables.
- [ ] Tests (unitarios + endpoints).
- [ ] Middleware de validación centralizado.
- [ ] Autenticación y autorización.


## Endpoints Principales

Ejemplos (métodos estándar GET/POST/PUT/DELETE):
```
GET /api/drug-types
POST /api/drug-types { "nombre":"Antibiótico" }
GET /api/medicines
POST /api/medicines { "nombre":"Amoxicilina", "drug_type_id":1, "brand_id":1, "location_id":1 }
GET /api/reports/visits?doctorId=1&from=2025-01-01&to=2025-12-31
```

## Validaciones Básicas

Actualmente se valida presencia de campos clave en controladores. Amplía según necesidades.

## Próximos Pasos Sugeridos

- Añadir autenticación (si aplica).
- Mejorar manejo de errores y middleware central.
- Incorporar tests automatizados (Jest / supertest).
- Centralizar validaciones con una librería (ej. zod o joi).

---

Proyecto generado automáticamente como base funcional. Ajusta según necesidades específicas del documento original.
