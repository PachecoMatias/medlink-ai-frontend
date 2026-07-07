# MedLink AI — Prototipo Frontend

Plataforma inteligente de gestión y redistribución de medicamentos hospitalarios.

## Stack
- React 18 + Vite
- Tailwind CSS
- react-router-dom
- lucide-react
- recharts

## Cómo correrlo

```bash
npm install
npm run dev
```

Abrí http://localhost:5173

## Estructura

```
src/
  main.jsx              # entry point
  App.jsx                # rutas
  index.css              # estilos globales + tokens Tailwind
  layouts/
    Layout.jsx            # sidebar + header persistentes
  pages/
    Dashboard.jsx
    LiveInventory.jsx
    AIPredictions.jsx
    Redistribution.jsx
    Analytics.jsx
    Settings.jsx
  components/
    KpiCard.jsx
    StatusBadge.jsx
    HealthBar.jsx          # elemento de firma visual (barra de "signos vitales")
    SimulationModal.jsx    # modal de simulación de transferencias
  data/
    mockData.js            # datos simulados — reemplazar por llamadas a la API
```

## Conexión al backend (Java Spring Boot)

Todos los puntos de integración están marcados con comentarios `// ── API HOOK ──`
dentro de cada archivo. En resumen, los endpoints esperados son:

- `GET /api/v1/dashboard/kpis`
- `GET /api/v1/ai/recommendations`
- `GET /api/v1/inventory`
- `GET /api/v1/ai/demand-forecast`
- `GET /api/v1/ai/shortage-predictions`
- `GET /api/v1/transfers`
- `PATCH /api/v1/transfers/{id}/approve`
- `POST /api/v1/transfers` (confirmar transferencia desde el modal de simulación)
- `GET /api/v1/analytics/savings-history`
- `GET /api/v1/analytics/network-efficiency`
- `GET|PUT /api/v1/settings/hospital-profile`
- `POST /api/v1/settings/integrations/his/test-connection`
- `PUT /api/v1/settings/ai-thresholds`

Se recomienda usar `fetch` o `axios` dentro de un hook por dominio
(`useDashboard`, `useInventory`, `useTransfers`, etc.) junto con
`@tanstack/react-query` para cache e invalidación.
