# Sistema Dispensario Médico

Proyecto académico sencillo para gestionar un dispensario: catálogos, medicamentos, médicos, pacientes y visitas con reporte. Backend Express + SQLite (se crea solo). Frontend HTML + JS plano usando `fetch`.

## Funcionalidades

- CRUD completo: Tipos, Marcas, Ubicaciones, Medicamentos, Médicos, Pacientes, Visitas.
- Campos agregados según requisitos: ubicación (estante, tramo, celda), medicamento (descripción, dosis), visita (recomendaciones), marca (descripcion), paciente (Matricula = identificador).
- Reporte de visitas filtrado por: médico, paciente, fecha exacta o rango (desde/hasta).
- Página Almacén unifica gestión de catálogos.
- Navegación común (navbar) + dashboard.
- Validaciones básicas en servidor (nombre requerido, longitud dosis/recomendaciones).

## Estructura (Resumida)

```
server/          -> Código del backend (Express)
Dispensario medico/Html/  -> Páginas HTML
Dispensario medico/js/    -> Scripts JS
Dispensario medico/css/   -> Estilos
data/dispensario.db       -> Base SQLite (se crea sola)
```

## Tablas y Campos Clave

- drug_types: nombre, descripcion, estado
- brands: nombre, descripcion, estado
- locations: nombre, descripcion, estante, tramo, celda, estado
- medicines: nombre, descripcion, dosis, drug_type_id, brand_id, location_id, estado
- doctors: nombre, identificador, cedula, tanda_laboral, especialidad, estado
- patients: nombre, cedula, identificador (Matricula), tipo, estado, doctor_id
- visits: visitante, doctor_id, patient_id, medicine_id, fecha, hora, sintomas, recomendaciones, estado

## Cómo Ejecutar

1. Ir a la carpeta del backend:
```bash
cd server
npm install
```
2. Levantar en modo desarrollo:
```bash
npm run dev
```
3. Abrir en el navegador:
```
http://localhost:3000/
```
Si quieres otra página: por ejemplo `http://localhost:3000/Html/Almacen.html`.

## Uso Rápido

1. En Almacén crear Tipos, Marcas y Ubicaciones.
2. Crear Médicos y Pacientes (el paciente puede quedar asociado a médico).
3. Registrar Medicamentos (elige tipo, marca, ubicación).
4. Registrar Visitas (asigna doctor, paciente, medicamento opcional, síntomas, recomendaciones).
5. Aplicar filtros en sección de Reportes de Visitas.

## Endpoints API (Resumen)

GET /api/drug-types, /api/brands, /api/locations, /api/medicines, /api/doctors, /api/patients, /api/visits
POST /api/<tabla>
GET /api/<tabla>/:id
PUT /api/<tabla>/:id
DELETE /api/<tabla>/:id
Reporte: GET /api/reports/visits?doctorId=&patientId=&date=&from=&to=

Respuesta típica create: { id: 1, nombre: 'X', ... }

Campos relacionales: *_id aceptan null.

## Validaciones Básicas

- nombre requerido cuando se envía.
- dosis longitud limitada (<=120 chars).
- recomendaciones longitud limitada (<=255 chars).
- visitante requerido en visitas.

## Requisitos Cubiertos (Mapa Corto)

1. CRUD entidades principales: OK.
2. Campos ampliados (tramo, celda, dosis, recomendaciones, Matricula): OK (migración con ALTER).
3. Reportes con filtros múltiples: OK (endpoint /reports/visits).
4. Relación médico-paciente y uso en visitas: OK (JOIN en reporte, selects en UI).
5. Manejo de estados (Activo, Inactivo, etc.): OK (selects y columnas estado).
6. Interfaz unificada catálogos: OK (Almacén dinámico por selección).
7. Uso de fetch y JS modular básico: OK.
8. Validaciones simples servidor: OK.
9. Base de datos local SQLite auto-creada: OK.
10. Navegación central y página índice: OK.

## Decisiones de Diseño Simples

- Se usó un modelo base genérico para reducir repetición.
- Migraciones aditivas con ALTER silencian columnas ya existentes (apto para reinicios).
- No se implementó autenticación (fuera de alcance en requerimientos).
- Campos opcionales se permiten null para flexibilidad en pruebas.

## Mejoras Futuras (Ideas)

- Paginación en listados grandes.
- Búsqueda por texto (LIKE) en medicamentos.
- Autenticación y roles (admin / operador).
- Control de stock de medicamentos (cantidad, movimientos).
- Exportar reporte visitas (CSV / PDF).

## Cómo Probar Rápido

1. Crear al menos un Tipo, Marca y Ubicación.
2. Crear un Médico y un Paciente vinculado a él.
3. Crear un Medicamento con esos catálogos.
4. Registrar una Visita usando esos datos.
5. Filtrar por médico en Reporte y ver filas.

## Notas Técnicas Breves

- DB en archivo: `server/data/dispensario.db` (se genera al iniciar).
- Si cambian campos, borrar archivo db para limpio (o confiar en ALTER incremental).
- Servidor imprime URL al iniciar.

## Rúbrica (Justificación Resumida)

- Arquitectura: Separación básica (routes, controllers, models) -> legible.
- Persistencia: Tablas normalizadas con claves foráneas y campos extra solicitados.
- Funcionalidad: CRUD + Reportes funcionales y filtrables.
- Validaciones: Reglas simples implementadas (campos clave y longitudes).
- Interfaz: Formularios claros, tablas uniformes, navbar reutilizable.
- Código: Comentarios sencillos estilo junior, sin sobre ingeniería.

## Limitaciones Conscientes

- Sin manejo avanzado de errores (stack, logging externo).
- Sin tests automatizados (podrían agregarse con Jest / Supertest).
- Sin control transaccional (operaciones simples). 

## Créditos

Hecho como ejercicio académico. Uso libre educativo.

---

Fin.
