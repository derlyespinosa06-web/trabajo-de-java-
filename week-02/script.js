// ============================================
// ESTADO GLOBAL
// ============================================

// Array principal donde se guardan los productos en memoria
let items = [];

// Variable para saber si estamos editando un producto
let editingItemId = null;


// ============================================
// CONFIGURACIÓN DEL DOMINIO
// ============================================

// Categorías de artesanías colombianas
const CATEGORIES = {
  wayuu: { name: 'Wayuu', emoji: '👜' },
  ceramica: { name: 'Cerámica', emoji: '🏺' },
  tejido: { name: 'Tejido', emoji: '🧶' },
  madera: { name: 'Madera', emoji: '🪵' },
};

// Niveles de disponibilidad del producto
const PRIORITIES = {
  high: { name: 'Pocas Unidades' },
  medium: { name: 'Stock Medio' },
  low: { name: 'Disponible' },
};


// ============================================
// PERSISTENCIA (LocalStorage)
// ============================================

// Cargar productos guardados en el navegador
const loadItems = () =>
  JSON.parse(localStorage.getItem('artesaniasMarketplace') ?? '[]');

// Guardar productos en el navegador
const saveItems = itemsToSave =>
  localStorage.setItem('artesaniasMarketplace', JSON.stringify(itemsToSave));


// ============================================
// FORMATEO DE MONEDA
// ============================================

// Convierte número a formato pesos colombianos
const formatCurrency = value =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  }).format(value);


// ============================================
// CRUD (Crear, Eliminar, Actualizar)
// ============================================

// Crear un nuevo producto artesanal
const createItem = itemData => {
  const newItem = {
    id: Date.now(), // ID único basado en tiempo
    name: itemData.name,
    description: itemData.description,
    category: itemData.category,
    priority: itemData.priority,
    amount: Number(itemData.amount ?? 0),
    active: true, // Disponible por defecto
  };

  const newItems = [...items, newItem];

  saveItems(newItems); // Guardar en localStorage
  return newItems;
};


// Eliminar producto por ID
const deleteItem = id => {
  const filtered = items.filter(item => item.id !== id);
  saveItems(filtered);
  return filtered;
};


// Cambiar disponibilidad (Disponible / Agotado)
const toggleItemActive = id => {
  const updated = items.map(item =>
    item.id === id ? { ...item, active: !item.active } : item
  );

  saveItems(updated);
  return updated;
};


// ============================================
// RENDERIZADO EN PANTALLA
// ============================================

// Mostrar productos en el HTML
const renderItems = itemsToRender => {
  const list = document.getElementById('item-list');
  const empty = document.getElementById('empty-state');

  // Si no hay productos mostrar mensaje
  if (itemsToRender.length === 0) {
    list.innerHTML = '';
    empty.style.display = 'block';
  } else {
    empty.style.display = 'none';

    // Crear HTML dinámico por cada producto
    list.innerHTML = itemsToRender
      .map(
        item => `
      <div class="item">
        <!-- Checkbox para marcar como agotado -->
        <input type="checkbox" ${item.active ? 'checked' : ''} 
          onchange="toggle(${item.id})">

        <strong>${CATEGORIES[item.category].emoji} ${item.name}</strong>
        <p>${item.description ?? ''}</p>

        <p><strong>Disponibilidad:</strong> ${PRIORITIES[item.priority].name}</p>
        <p><strong>Precio:</strong> ${formatCurrency(item.amount)}</p>

        <button onclick="remove(${item.id})">Eliminar</button>
      </div>
    `
      )
      .join('');
  }

  // Actualizar estadísticas
  document.getElementById('stat-total').textContent = items.length;
  document.getElementById('stat-active').textContent =
    items.filter(i => i.active).length;
  document.getElementById('stat-inactive').textContent =
    items.filter(i => !i.active).length;
};


// ============================================
// FUNCIONES GLOBALES PARA BOTONES
// ============================================

// Función eliminar (llamada desde botón HTML)
function remove(id) {
  items = deleteItem(id);
  renderItems(items);
}

// Función cambiar disponibilidad
function toggle(id) {
  items = toggleItemActive(id);
  renderItems(items);
}


// ============================================
// EVENTO DEL FORMULARIO
// ============================================

// Cuando se envía el formulario
document
  .getElementById('item-form')
  .addEventListener('submit', function (e) {
    e.preventDefault(); // Evita que recargue la página

    // Obtener valores del formulario
    const name = document.getElementById('item-name').value;
    const description = document.getElementById('item-description').value;
    const category = document.getElementById('item-category').value;
    const priority = document.getElementById('item-priority').value;
    const amount = document.getElementById('item-amount').value;

    // Crear nuevo producto
    items = createItem({
      name,
      description,
      category,
      priority,
      amount,
    });

    // Limpiar formulario
    this.reset();

    // Volver a renderizar
    renderItems(items);
  });


// ============================================
// INICIALIZACIÓN
// ============================================

// Cuando carga la página
document.addEventListener('DOMContentLoaded', () => {
  items = loadItems(); // Cargar datos guardados
  renderItems(items);  // Mostrar en pantalla
});

