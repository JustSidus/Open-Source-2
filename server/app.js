import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import drugTypeRoutes from './routes/drugTypes.routes.js';
import brandRoutes from './routes/brands.routes.js';
import locationRoutes from './routes/locations.routes.js';
import medicineRoutes from './routes/medicines.routes.js';
import patientRoutes from './routes/patients.routes.js';
import doctorRoutes from './routes/doctors.routes.js';
import visitRoutes from './routes/visits.routes.js';
import reportRoutes from './routes/reports.routes.js';
import { initSchema } from './db/schema.js';

const app = express();
app.use(cors());
app.use(express.json());

// Static front-end (existing files)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '..', 'Dispensario medico')));

// Initialize DB tables if not present
initSchema();

// API Routes (prefixed)
app.use('/api/drug-types', drugTypeRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/visits', visitRoutes);
app.use('/api/reports', reportRoutes);

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// Root redirect to dashboard (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Dispensario medico', 'Html', 'index.html'));
});

// Not found handler
app.use((req, res) => {
  res.status(404).json({ error: 'Recurso no encontrado' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  const urlBase = `http://localhost:${PORT}`;
  const dashboard = `${urlBase}/Html/index.html`;
  console.log('==========================================');
  console.log(`Servidor listo en: ${urlBase}`);
  console.log(`Dashboard:       ${dashboard}`);
  console.log(`API Health:      ${urlBase}/api/health`);
  console.log('Ctrl + Click en cualquiera de las URLs para abrir.');
  console.log('==========================================');
});
