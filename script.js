// ================== DATOS ==================
const data = {
  name: "Artesanías Market CO",
  description:
    "Marketplace que conecta artesanos colombianos con compradores nacionales e internacionales.",
  contact: {
    email: "artesaniascolombia@gmail.com", //
    phone: "+57 3118733006", //
    location: "Colombia", //
  },
  items: [
    { name: "Mochilas Wayuu", level: 95 }, //
    { name: "Cerámica artesanal", level: 85 }, //
    { name: "Filigrana", level: 90 }, //
    { name: "Sombrero vueltiao", level: 88 }, //
    { name: "Decoración en madera", level: 80 }, //
  ],
  links: [
    { name: "Tienda", icon: "🛍️" }, //
    { name: "Instagram", icon: "📸" }, //
    { name: "Facebook", icon: "📘" }, //
  ],
  stats: [
    { label: "Productos", value: 320 }, //
    { label: "Artesanos", value: 120 }, //
    { label: "Rating", value: "4.9⭐" }, //
    { label: "Clientes", value: 1500 }, //
  ],
  // La galería debe ser una propiedad dentro de 'data'
  gallery: [
    { url: "https://artesaniasdecolombia.com.co/Documentos/Catalogo/36143_06-02-320-b.jpg" }, //
    { url: "https://artesaniasdecolombiatienda.com.co/wp-content/uploads/2025/09/06-09-145-A-Mortero-madera-natural-vista-1-800x800.jpg"}, //
    { url: "https://artesaniasdecolombiatienda.com.co/wp-content/uploads/2025/07/11-03-703-F-Mochila-Wayuu-morada-vista-1-430x430.jpg"} //
  ]
};

// ================== DOM ==================
const $ = (id) => document.getElementById(id); //
const toast = $("toast"); //

// ================== RENDER ==================
function renderInfo() {
  $("userName").textContent = data.name; //
  $("userBio").textContent = data.description; //
  $("userEmail").textContent = data.contact.email; //
  $("userPhone").textContent = data.contact.phone; //
  $("userLocation").textContent = `📍 ${data.contact.location}`; //
}

function renderGallery() {
  // Asegúrate de tener el id="galleryContainer" en tu HTML
  $("galleryContainer").innerHTML = data.gallery
    .map(img => `<img src="${img.url}" alt="${img.alt}" />`) //
    .join("");
}

let showAll = false; //

function renderItems() {
  const list = showAll ? data.items : data.items.slice(0, 4); //

  $("itemsList").innerHTML = list
    .map(
      (i) => `
      <div class="item">
        <span>${i.name}</span>
        <div class="bar">
          <div style="width:${i.level}%"></div>
        </div>
      </div>
    `
    )
    .join(""); //
}

function renderLinks() {
  $("linksContainer").innerHTML = data.links
    .map((l) => `<a href="#">${l.icon} ${l.name}</a>`) //
    .join("");
}

function renderStats() {
  $("statsContainer").innerHTML = data.stats
    .map(
      (s) => `
      <div class="stat">
        <strong>${s.value}</strong>
        <span>${s.label}</span>
      </div>
    `
    )
    .join(""); //
}

// ================== FUNCIONES ==================
function toggleItems() {
  showAll = !showAll; //
  renderItems(); //
  $("toggleItemsBtn").textContent = showAll ? "Mostrar menos" : "Mostrar más"; //
}

function showToast(msg) {
  toast.textContent = msg; //
  toast.classList.add("show"); //
  setTimeout(() => toast.classList.remove("show"), 2500); //
}

function copy(text) {
  navigator.clipboard.writeText(text); //
  showToast("Copiado al portapapeles"); //
}

function toggleTheme() {
  document.body.classList.toggle("dark"); //
}

// ================== INIT ==================
function init() {
  renderInfo(); //
  renderItems(); //
  renderLinks(); //
  renderStats(); //
  renderGallery(); // Llamamos a la nueva función de galería

  $("toggleItemsBtn").onclick = toggleItems; //
  $("copyEmailBtn").onclick = () => copy(data.contact.email); //
  $("copyPhoneBtn").onclick = () => copy(data.contact.phone); //
  $("themeToggle").onclick = toggleTheme; //
}

document.addEventListener("DOMContentLoaded", init); //
