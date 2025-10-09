const formMed = document.getElementById('form-medicamento');
const tbodyMed = document.querySelector('#tabla tbody');
let editingMedId = null;

async function cargarSelect(path, selectId, labelField='nombre') {
  const data = await api.request(path);
  const sel = document.getElementById(selectId);
  sel.innerHTML = data.map(d => `<option value="${d.id}">${d[labelField]}</option>`).join('');
}

async function cargarMedicamentos() {
  const data = await api.request('/medicines');
  tbodyMed.innerHTML = '';
  for (const m of data) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${m.id}</td>
      <td>${m.nombre}</td>
      <td>${m.drug_type_id||''}</td>
      <td>${m.brand_id||''}</td>
      <td>${m.location_id||''}</td>
      <td>${m.estado}</td>
      <td><button data-edit="${m.id}">Editar</button><button data-del="${m.id}">Del</button></td>`;
    tbodyMed.appendChild(tr);
  }
}

formMed.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    nombre: document.getElementById('nombre').value.trim(),
    drug_type_id: +document.getElementById('drug_type_id').value || null,
    brand_id: +document.getElementById('brand_id').value || null,
    location_id: +document.getElementById('location_id').value || null,
    estado: document.getElementById('estado').value
  };
  if (!payload.nombre) return alert('Nombre requerido');
  try {
    if (editingMedId) {
      await api.request(`/medicines/${editingMedId}`, { method: 'PUT', body: JSON.stringify(payload) });
    } else {
      await api.request('/medicines', { method: 'POST', body: JSON.stringify(payload) });
    }
    formMed.reset();
    editingMedId = null;
    await cargarMedicamentos();
  } catch (err) { alert(err.message); }
});

tbodyMed.addEventListener('click', async (e) => {
  const id = e.target.dataset.edit || e.target.dataset.del;
  if (!id) return;
  if (e.target.dataset.edit) {
    const m = await api.request(`/medicines/${id}`);
    document.getElementById('nombre').value = m.nombre;
    editingMedId = id;
  } else if (e.target.dataset.del) {
    if (confirm('¿Eliminar?')) { await api.request(`/medicines/${id}`, { method: 'DELETE' }); await cargarMedicamentos(); }
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    cargarSelect('/drug-types','drug_type_id'),
    cargarSelect('/brands','brand_id'),
    cargarSelect('/locations','location_id')
  ]);
  await cargarMedicamentos();
});
