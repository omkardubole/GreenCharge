/* FILE: map.js
   FINAL STABLE VERSION
   - Real GPS → RED marker
   - GPS fail → Mumbai default
   - Charging stations → GREEN markers
   - Directions via Google Maps
   - Mobile & Desktop friendly
*/

let map;

// 🌍 DEFAULT LOCATION (MUMBAI)
const DEFAULT_LOCATION = {
  lat: 19.0760,
  lng: 72.8777
};

// 🔋 CHARGING STATIONS (14 TOTAL)
const stations = [
  { name: "Andheri EV Hub", lat: 19.1197, lng: 72.8468 },
  { name: "Bandra Charging Point", lat: 19.0607, lng: 72.8362 },
  { name: "Powai Green Charge", lat: 19.1176, lng: 72.9060 },
  { name: "Dadar EV Station", lat: 19.0176, lng: 72.8562 },
  { name: "Lower Parel Fast Charge", lat: 18.9977, lng: 72.8376 },
  { name: "Goregaon EV Hub", lat: 19.1550, lng: 72.8497 },
  { name: "Kurla Charging Station", lat: 19.0726, lng: 72.8845 },

  // ➕ EXTRA STATIONS
  { name: "Vikhroli EV Point", lat: 19.1100, lng: 72.9350 },
  { name: "Chembur EV Zone", lat: 19.0625, lng: 72.9000 },
  { name: "Malad West Charge Hub", lat: 19.1870, lng: 72.8480 },
  { name: "Borivali Fast EV", lat: 19.2307, lng: 72.8567 },
  { name: "Santacruz EV Stop", lat: 19.0800, lng: 72.8400 },
  { name: "Worli Green Plug", lat: 19.0169, lng: 72.8177 },
  { name: "Thane EV SuperCharge", lat: 19.2183, lng: 72.9781 }
];

// 🚀 INIT LOCATION
function initLocation() {
  if (!navigator.geolocation) {
    loadMap(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng, false);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    pos => {
      loadMap(pos.coords.latitude, pos.coords.longitude, true);
    },
    () => {
      alert("Location access failed. Showing Mumbai by default.");
      loadMap(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng, false);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
}

// 🗺️ LOAD MAP
function loadMap(lat, lng, isRealUser) {

  // 🧹 CLEAR OLD MAP SAFELY
  if (map) {
    map.remove();
    map = null;
  }

  map = L.map("map").setView([lat, lng], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);

  // 🔴 USER ICON
  const userIcon = L.icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  });

  L.marker([lat, lng], { icon: userIcon })
    .addTo(map)
    .bindPopup(
      isRealUser
        ? "<b>📍 Your Current Location</b>"
        : "<b>📍 Default Location: Mumbai</b>"
    )
    .openPopup();

  // 🟢 STATION ICON
  const stationIcon = L.icon({
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  });

  // 🔋 ADD STATIONS
  stations.forEach(station => {
    L.marker([station.lat, station.lng], { icon: stationIcon })
      .addTo(map)
      .bindPopup(`
        <b>${station.name}</b><br><br>
        <a href="https://www.google.com/maps/dir/${lat},${lng}/${station.lat},${station.lng}"
           target="_blank"
           style="color:#1fa36b;font-weight:600;">
           🚗 Get Directions
        </a>
      `);
  });
}

// ⚡ AUTO LOAD
window.onload = initLocation;