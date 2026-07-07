import { useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { hospitalLocations, transfers } from '../data/mockData.js'

// ── API HOOK ────────────────────────────────────────────────────
// GET /api/v1/hospitals              → { name, lat, lng, isHub }[]
// GET /api/v1/transfers?status=active → usado para dibujar las rutas activas
// Para rutas por calle real (en vez de curvas geodésicas) se puede integrar
// OSRM/Mapbox Directions API y reemplazar `curvedPath` por la geometría devuelta.
// ──────────────────────────────────────────────────────────────

const STATUS_STYLE = {
  pending: { color: '#D97706', dash: '4 10', weight: 3, label: 'Pendiente de aprobación' },
  transit: { color: '#136B82', dash: '1 9', weight: 3.5, label: 'En tránsito' },
  completed: { color: '#94A3B8', dash: '2 6', weight: 2, label: 'Completado (últimos 7 días)' },
}

// Genera una curva suave tipo "flight path" entre dos puntos (en vez de una línea recta),
// que es el lenguaje visual estándar para mapas de rutas logísticas.
function curvedPath(a, b, curvature = 0.18) {
  const points = []
  const [lat1, lng1] = [a.lat, a.lng]
  const [lat2, lng2] = [b.lat, b.lng]
  const midLat = (lat1 + lat2) / 2
  const midLng = (lng1 + lng2) / 2
  const dx = lng2 - lng1
  const dy = lat2 - lat1
  // Punto de control perpendicular al segmento, desplazado según la curvatura
  const ctrlLat = midLat + dx * curvature
  const ctrlLng = midLng - dy * curvature

  const steps = 24
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const lat = (1 - t) ** 2 * lat1 + 2 * (1 - t) * t * ctrlLat + t ** 2 * lat2
    const lng = (1 - t) ** 2 * lng1 + 2 * (1 - t) * t * ctrlLng + t ** 2 * lng2
    points.push([lat, lng])
  }
  return points
}

function hospitalIcon({ isHub, atRisk }) {
  const size = isHub ? 40 : 32
  const bg = atRisk ? '#DC2626' : isHub ? '#0A3D4E' : '#136B82'
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width:${size}px;height:${size}px;
        background:${bg};
        border:3px solid white;
        border-radius:50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 4px 10px rgba(4,32,42,0.35);
        display:flex;align-items:center;justify-content:center;
      ">
        <div style="transform: rotate(45deg); color:white; font-size:${isHub ? 16 : 13}px; font-weight:800; line-height:1;">
          +
        </div>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  })
}

export default function NetworkMap() {
  const center = useMemo(() => {
    const coords = Object.values(hospitalLocations)
    const lat = coords.reduce((s, c) => s + c.lat, 0) / coords.length
    const lng = coords.reduce((s, c) => s + c.lng, 0) / coords.length
    return [lat, lng]
  }, [])

  // Combina las transferencias activas (pendientes + en tránsito) con las coordenadas
  // de origen/destino para poder dibujar cada ruta sobre el mapa.
  const routes = useMemo(() => {
    const all = [
      ...transfers.pending.map((t) => ({ ...t, status: 'pending' })),
      ...transfers.transit.map((t) => ({ ...t, status: 'transit' })),
    ]
    return all
      .map((t) => {
        const from = hospitalLocations[t.from]
        const to = hospitalLocations[t.to]
        if (!from || !to) return null
        return { ...t, path: curvedPath(from, to) }
      })
      .filter(Boolean)
  }, [])

  // Hospitales con al menos una transferencia pendiente/en tránsito de origen o destino
  const atRiskHospitals = useMemo(() => {
    const set = new Set()
    routes.forEach((r) => {
      if (r.status === 'pending') set.add(r.from)
    })
    return set
  }, [routes])

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div>
          <h2 className="font-bold text-slate-900">Mapa de la Red Hospitalaria</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {Object.keys(hospitalLocations).length} hospitales conectados · {routes.length} rutas activas
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          {Object.entries(STATUS_STYLE)
            .filter(([key]) => key !== 'completed')
            .map(([key, s]) => (
              <span key={key} className="flex items-center gap-1.5 text-slate-500">
                <span className="h-0.5 w-4 rounded-full" style={{ backgroundColor: s.color }} />
                {s.label}
              </span>
            ))}
        </div>
      </div>

      <div className="h-[420px] w-full relative z-0">
        <MapContainer
          center={center}
          zoom={12}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          {/* Basemap claro tipo "Positron" — limpio y legible, coherente con el resto del producto */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          {/* Rutas de transferencia (curvas tipo flight-path) */}
          {routes.map((route) => {
            const style = STATUS_STYLE[route.status]
            return (
              <Polyline
                key={route.id}
                positions={route.path}
                pathOptions={{
                  color: style.color,
                  weight: style.weight,
                  dashArray: style.dash,
                  lineCap: 'round',
                  opacity: 0.85,
                }}
              >
                <Popup>
                  <div className="text-xs space-y-1">
                    <p className="font-semibold">{route.drug}</p>
                    <p>
                      {route.from} → {route.to}
                    </p>
                    <p className="text-slate-500">{route.quantity} unidades · {style.label}</p>
                  </div>
                </Popup>
              </Polyline>
            )
          })}

          {/* Marcadores de hospitales */}
          {Object.entries(hospitalLocations).map(([name, loc]) => (
            <Marker
              key={name}
              position={[loc.lat, loc.lng]}
              icon={hospitalIcon({ isHub: loc.isHub, atRisk: atRiskHospitals.has(name) })}
            >
              <Popup>
                <div className="text-xs space-y-1">
                  <p className="font-semibold">{name}</p>
                  {loc.isHub && <p className="text-brand-600 font-medium">Hospital sede de la red</p>}
                  <p className="text-slate-500">
                    {routes.filter((r) => r.from === name || r.to === name).length} transferencia(s) activa(s)
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}
