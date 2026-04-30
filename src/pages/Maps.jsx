import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { mockHospitals, mockAmbulances, mockBloodBanks, mockDonors } from '../data/mockData';
import L from 'leaflet';

// Fix for default marker icons in Leaflet + React
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const hospitalIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const ambulanceIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const bloodBankIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const donorIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function Maps() {
  // Center of Maharashtra
  const center = [19.0, 75.0];

  // Helper to generate deterministic-ish coordinates based on district string
  const getCoordinates = (district, id) => {
     let hash = 0;
     const str = (district || '') + id;
     for (let i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
     }
     
     // Base coordinates for Maharashtra
     const baseLat = 18.0 + (Math.abs(hash) % 40) / 10; // 18.0 to 22.0
     const baseLng = 73.0 + (Math.abs(hash * 3) % 70) / 10; // 73.0 to 80.0
     
     return { lat: baseLat, lng: baseLng };
  };

  const resources = [
    ...mockHospitals.map((h) => ({ ...h, type: 'hospital', ...getCoordinates(h.district, h.id) })),
    ...mockAmbulances.map((a) => ({ ...a, type: 'ambulance', ...getCoordinates(a.district, a.id) })),
    ...mockBloodBanks.map((b) => ({ ...b, type: 'bloodbank', ...getCoordinates(b.district, b.id) })),
    ...mockDonors.map((d) => ({ ...d, type: 'donor', ...getCoordinates(d.district, d.id) }))
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'hospital': return hospitalIcon;
      case 'ambulance': return ambulanceIcon;
      case 'bloodbank': return bloodBankIcon;
      case 'donor': return donorIcon;
      default: return DefaultIcon;
    }
  };

  return (
    <div className="pt-24 h-screen flex flex-col">
      <div className="px-4 sm:px-6 lg:px-8 mb-4">
        <h1 className="text-3xl font-bold">Real-time Resource Mapping</h1>
        <p className="text-gray-500">Visualizing all emergency resources across Maharashtra.</p>
        <div className="flex flex-wrap gap-4 mt-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                <span className="w-3 h-3 rounded-full bg-red-500" /> Hospitals
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                <span className="w-3 h-3 rounded-full bg-blue-500" /> Ambulances
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                <span className="w-3 h-3 rounded-full bg-green-500" /> Blood Banks
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                <span className="w-3 h-3 rounded-full bg-orange-500" /> Donors
            </div>
        </div>
      </div>
      <div className="flex-1 relative z-0">
        <MapContainer center={center} zoom={7} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {resources.map((res, i) => (
            <Marker 
                key={i} 
                position={[res.lat, res.lng]} 
                icon={getIcon(res.type)}
            >
              <Popup>
                <div className="p-2 max-w-xs">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1">{res.type}</div>
                  <h4 className="font-bold text-lg">{res.name || res.driver}</h4>
                  <p className="text-sm opacity-70 mb-2">{res.district}</p>
                  
                  {res.type === 'hospital' && res.beds && (
                    <div className="text-xs bg-gray-100 p-2 rounded">
                        <span className="font-bold">ICU Beds:</span> {res.beds.icu} | <span className="font-bold">General:</span> {res.beds.general}
                    </div>
                  )}
                  {res.type === 'bloodbank' && res.inventory && (
                    <div className="text-xs bg-gray-100 p-2 rounded">
                        <span className="font-bold">A+:</span> {res.inventory['A+']} | <span className="font-bold">O+:</span> {res.inventory['O+']} | <span className="font-bold">B+:</span> {res.inventory['B+']}
                    </div>
                  )}
                  {res.type === 'donor' && res.bloodGroup && (
                    <div className="text-xs bg-gray-100 p-2 rounded">
                        <span className="font-bold">Blood Group:</span> {res.bloodGroup} <br />
                        <span className="font-bold">Phone:</span> {res.phone}
                    </div>
                  )}
                  {res.type === 'ambulance' && res.phone && (
                    <div className="text-xs bg-gray-100 p-2 rounded">
                        <span className="font-bold">Driver Phone:</span> {res.phone} <br />
                        <span className="font-bold">Provider:</span> {res.provider || 'Independent'}
                    </div>
                  )}
                  
                  <button className="w-full mt-3 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-hover transition-colors">
                    Contact Now
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
