import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { BrainCircuit, Clock } from 'lucide-react'
import { demandVsStock, highRiskShortages } from '../data/mockData.js'

// ── API HOOK ────────────────────────────────────────────────────
// GET /api/v1/ai/demand-forecast?horizonWeeks=6
// GET /api/v1/ai/shortage-predictions
// El modelo de IA correría del lado del backend (Java Spring Boot + servicio ML),
// exponiendo solo los resultados agregados a este frontend.
// ──────────────────────────────────────────────────────────────

const impactStyles = {
  Crítico: 'badge-critical',
  Alto: 'badge-warning',
  Medio: 'badge-healthy',
}

export default function AIPredictions() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-brand-100 flex items-center justify-center">
          <BrainCircuit size={20} className="text-brand-700" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Predicciones IA</h1>
          <p className="text-sm text-slate-500">Modelos entrenados sobre consumo histórico y estacionalidad</p>
        </div>
      </div>

      {/* Demand vs stock chart */}
      <div className="card p-5">
        <h2 className="font-bold text-slate-900 mb-1">Demanda Esperada vs. Stock Actual</h2>
        <p className="text-sm text-slate-500 mb-4">
          Proyección a 6 semanas para medicamentos de alta rotación
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={demandVsStock}>
            <defs>
              <linearGradient id="demandGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#DC2626" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="stockGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#136B82" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#136B82" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 13 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area
              type="monotone"
              dataKey="demanda"
              name="Demanda proyectada"
              stroke="#DC2626"
              fill="url(#demandGrad)"
              strokeWidth={2.5}
            />
            <Area
              type="monotone"
              dataKey="stock"
              name="Stock disponible"
              stroke="#136B82"
              fill="url(#stockGrad)"
              strokeWidth={2.5}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* High-risk shortages */}
      <div className="card p-5">
        <h2 className="font-bold text-slate-900 mb-1">Faltantes de Alto Riesgo</h2>
        <p className="text-sm text-slate-500 mb-4">
          Medicamentos con mayor probabilidad de desabastecimiento
        </p>
        <div className="space-y-3">
          {highRiskShortages.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 p-4 hover:border-slate-200 transition"
            >
              <div>
                <p className="font-semibold text-slate-800">{item.drug}</p>
                <p className="text-sm text-slate-500">{item.hospital}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <Clock size={14} />
                  <span className="font-mono">{item.daysToShortage}d</span>
                </div>
                <div className="text-sm text-slate-500 font-mono w-16">{item.confidence}%</div>
                <span className={impactStyles[item.impact]}>{item.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
