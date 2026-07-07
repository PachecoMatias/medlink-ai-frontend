import { useState } from 'react'
import { ArrowRight, Sparkles, PlayCircle } from 'lucide-react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import KpiCard from '../components/KpiCard.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import SimulationModal from '../components/SimulationModal.jsx'
import { kpis, recommendations, expiryForecast } from '../data/mockData.js'

// ── API HOOK ────────────────────────────────────────────────────
// En producción, reemplazar los imports de mockData por:
// const { data: kpis } = useQuery(['kpis'], () => api.get('/api/v1/dashboard/kpis'))
// const { data: recommendations } = useQuery(['recs'], () => api.get('/api/v1/ai/recommendations'))
// ──────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [activeRec, setActiveRec] = useState(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Resumen General</h1>
          <p className="text-sm text-slate-500 mt-1">
            Vista consolidada de la red hospitalaria · actualizado hace 3 min
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.id} {...kpi} />
        ))}
      </div>

      {/* AI Recommendations table */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-brand-100 flex items-center justify-center">
              <Sparkles size={16} className="text-brand-700" />
            </div>
            <h2 className="font-bold text-slate-900">Recomendaciones de Redistribución IA</h2>
          </div>
          <span className="text-xs text-slate-400">{recommendations.length} recomendaciones activas</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-400 border-b border-slate-100">
                <th className="px-5 py-3 font-semibold">Medicamento</th>
                <th className="px-5 py-3 font-semibold">Ruta</th>
                <th className="px-5 py-3 font-semibold">Cantidad</th>
                <th className="px-5 py-3 font-semibold">Riesgo</th>
                <th className="px-5 py-3 font-semibold">Ahorro Est.</th>
                <th className="px-5 py-3 font-semibold">Confianza</th>
                <th className="px-5 py-3 font-semibold text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recommendations.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/70 transition">
                  <td className="px-5 py-3.5 font-semibold text-slate-800">{rec.drug}</td>
                  <td className="px-5 py-3.5 text-slate-500">
                    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                      {rec.from} <ArrowRight size={12} className="text-slate-300" /> {rec.to}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-slate-700">{rec.quantity}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge level={rec.riskLevel} />
                  </td>
                  <td className="px-5 py-3.5 font-mono font-semibold text-healthy">
                    ${rec.estSavings.toLocaleString('es-AR')}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-slate-500">{rec.confidence}%</td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => setActiveRec(rec)}
                      className="inline-flex items-center gap-1.5 text-brand-700 hover:text-brand-800 font-semibold text-xs"
                    >
                      <PlayCircle size={14} />
                      Simular
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expiry forecast chart */}
      <div className="card p-5">
        <h2 className="font-bold text-slate-900 mb-1">Pronóstico de Vencimientos</h2>
        <p className="text-sm text-slate-500 mb-4">
          Unidades proyectadas a vencer por mes en toda la red
        </p>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={expiryForecast}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 13 }}
              formatter={(value) => [`${value} unidades`, 'Vencimientos']}
            />
            <Line
              type="monotone"
              dataKey="unidades"
              stroke="#136B82"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#136B82' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {activeRec && (
        <SimulationModal
          recommendation={activeRec}
          onClose={() => setActiveRec(null)}
          onConfirm={() => setActiveRec(null)}
        />
      )}
    </div>
  )
}
