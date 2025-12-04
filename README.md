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
http://localhost:3000/Html/Visitas.html
```
Si quieres otra página: por ejemplo `http://localhost:3000/Html/Almacen.html`.

## Uso Rápido

1. En Almacén crear Tipos, Marcas y Ubicaciones.
2. Crear Médicos y Pacientes (el paciente puede quedar asociado a médico).
3. Registrar Medicamentos (elige tipo, marca, ubicación).
4. Registrar Visitas (asigna doctor, paciente, medicamento opcional, síntomas, recomendaciones).
5. Aplicar filtros en sección de Reportes de Visitas.

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

## Créditos

Hecho como ejercicio académico.

---

Fin.
