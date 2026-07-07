import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts'
import { savingsHistory, networkEfficiency } from '../data/mockData.js'

// ── API HOOK ────────────────────────────────────────────────────
// GET /api/v1/analytics/savings-history?range=6m
// GET /api/v1/analytics/network-efficiency
// ──────────────────────────────────────────────────────────────

function efficiencyColor(value) {
  if (value < 75) return '#DC2626'
  if (value < 85) return '#D97706'
  return '#15803D'
}

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Analítica</h1>
        <p className="text-sm text-slate-500 mt-1">
          Reportes históricos de desempeño de la red de redistribución
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h2 className="font-bold text-slate-900 mb-1">Ahorro Acumulado</h2>
          <p className="text-sm text-slate-500 mb-4">Dinero ahorrado por evitar desperdicio, últimos 6 meses</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={savingsHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 12, fill: '#94A3B8' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v / 1000}k`}
              />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 13 }}
                formatter={(v) => [`$${v.toLocaleString('es-AR')}`, 'Ahorro']}
              />
              <Line type="monotone" dataKey="ahorro" stroke="#15803D" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <h2 className="font-bold text-slate-900 mb-1">Desperdicio Evitado</h2>
          <p className="text-sm text-slate-500 mb-4">Unidades de medicamento salvadas de vencer</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={savingsHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 13 }}
                formatter={(v) => [`${v} unidades`, 'Desperdicio evitado']}
              />
              <Bar dataKey="desperdicioEvitado" fill="#136B82" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card p-5">
        <h2 className="font-bold text-slate-900 mb-1">Eficiencia de Red por Hospital</h2>
        <p className="text-sm text-slate-500 mb-4">
          Porcentaje de recomendaciones IA ejecutadas exitosamente
        </p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={networkEfficiency} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
            <YAxis
              type="category"
              dataKey="hospital"
              tick={{ fontSize: 12, fill: '#475569' }}
              axisLine={false}
              tickLine={false}
              width={110}
            />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 13 }}
              formatter={(v) => [`${v}%`, 'Eficiencia']}
            />
            <Bar dataKey="eficiencia" radius={[0, 6, 6, 0]}>
              {networkEfficiency.map((entry, i) => (
                <Cell key={i} fill={efficiencyColor(entry.eficiencia)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
