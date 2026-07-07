import { ArrowRight, Clock3, Truck, CheckCircle2, Package } from 'lucide-react'
import { transfers } from '../data/mockData.js'
import NetworkMap from '../components/NetworkMap.jsx'

// ── API HOOK ────────────────────────────────────────────────────
// GET /api/v1/transfers?status=pending|transit|completed
// PATCH /api/v1/transfers/{id}/approve  — para mover una tarjeta de Pendiente a En Tránsito
// ──────────────────────────────────────────────────────────────

const columns = [
  {
    key: 'pending',
    title: 'Pendiente de Aprobación',
    icon: Clock3,
    tone: 'text-warning bg-warning-bg border-warning-border',
  },
  {
    key: 'transit',
    title: 'En Tránsito',
    icon: Truck,
    tone: 'text-brand-700 bg-brand-50 border-brand-100',
  },
  {
    key: 'completed',
    title: 'Completado',
    icon: CheckCircle2,
    tone: 'text-healthy bg-healthy-bg border-healthy-border',
  },
]

function TransferCard({ transfer, columnKey }) {
  return (
    <div className="card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-slate-400">{transfer.id}</span>
        <Package size={14} className="text-slate-300" />
      </div>
      <p className="font-semibold text-slate-800 text-sm">{transfer.drug}</p>
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <span className="truncate">{transfer.from}</span>
        <ArrowRight size={11} className="shrink-0 text-slate-300" />
        <span className="truncate">{transfer.to}</span>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <span className="font-mono text-sm font-semibold text-slate-700">{transfer.quantity} u.</span>
        {columnKey === 'pending' && (
          <button className="text-xs font-semibold text-brand-700 hover:text-brand-800">
            Aprobar →
          </button>
        )}
        {columnKey === 'transit' && (
          <span className="text-xs font-medium text-brand-600">ETA {transfer.eta}</span>
        )}
        {columnKey === 'completed' && (
          <span className="text-xs text-slate-400">{transfer.completedAt}</span>
        )}
      </div>
    </div>
  )
}

export default function Redistribution() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Redistribución</h1>
        <p className="text-sm text-slate-500 mt-1">
          Seguimiento de transferencias activas entre hospitales de la red
        </p>
      </div>

      <NetworkMap />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        {columns.map(({ key, title, icon: Icon, tone }) => (
          <div key={key} className="space-y-3">
            <div className={`flex items-center justify-between rounded-xl border px-4 py-2.5 ${tone}`}>
              <div className="flex items-center gap-2 font-semibold text-sm">
                <Icon size={15} />
                {title}
              </div>
              <span className="text-xs font-mono font-bold">{transfers[key].length}</span>
            </div>
            <div className="space-y-3">
              {transfers[key].map((t) => (
                <TransferCard key={t.id} transfer={t} columnKey={key} />
              ))}
              {transfers[key].length === 0 && (
                <p className="text-xs text-slate-400 text-center py-6">Sin transferencias</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
