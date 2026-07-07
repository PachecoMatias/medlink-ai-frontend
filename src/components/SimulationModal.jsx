import { useMemo, useState } from 'react'
import { X, ArrowRight, Truck, Sparkles, Loader2 } from 'lucide-react'
import HealthBar from './HealthBar.jsx'
import StatusBadge from './StatusBadge.jsx'

// Convierte un nivel de riesgo a una salud numérica aproximada, solo para el prototipo visual.
function riskToHealth(risk) {
  if (risk === 'critical') return 14
  if (risk === 'warning') return 38
  return 74
}

export default function SimulationModal({ recommendation, onClose, onConfirm }) {
  const maxQty = recommendation.quantity
  const [qty, setQty] = useState(Math.round(maxQty * 0.6))
  const [confirming, setConfirming] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const currentHealthFrom = riskToHealth(recommendation.riskLevel)
  // A medida que se transfiere más cantidad, el origen mejora su salud (menos excedente
  // en riesgo de vencer) y el destino mejora la suya (menos riesgo de faltante).
  const simulatedHealthFrom = Math.min(95, currentHealthFrom + Math.round((qty / maxQty) * 45))
  const simulatedHealthTo = Math.min(97, 40 + Math.round((qty / maxQty) * 55))
  const currentHealthTo = 22 // el destino parte con riesgo de faltante

  const estSavings = useMemo(
    () => Math.round((recommendation.estSavings * qty) / maxQty),
    [qty, maxQty, recommendation.estSavings],
  )

  const handleConfirm = () => {
    setConfirming(true)
    // ── API HOOK ─────────────────────────────────────────────
    // Acá se debería llamar al backend Spring Boot para ejecutar la transferencia real:
    // await fetch(`/api/v1/transfers`, {
    //   method: 'POST',
    //   body: JSON.stringify({ recommendationId: recommendation.id, quantity: qty }),
    // })
    setTimeout(() => {
      setConfirming(false)
      setConfirmed(true)
      setTimeout(onConfirm, 900)
    }, 1100)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Glassmorphism backdrop */}
      <button
        aria-label="Cerrar simulación"
        onClick={onClose}
        className="absolute inset-0 bg-brand-950/40 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white/95 backdrop-blur-xl shadow-popover border border-white/60">
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur-xl rounded-t-3xl">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full mb-2">
              <Sparkles size={12} />
              Simulación generada por IA · {recommendation.confidence}% de confianza
            </div>
            <h2 className="text-lg font-bold text-slate-900">{recommendation.drug}</h2>
            <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
              {recommendation.from} <ArrowRight size={13} /> {recommendation.to}
            </p>
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 flex items-center justify-center rounded-xl hover:bg-slate-100 transition shrink-0"
            aria-label="Cerrar"
          >
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Side-by-side comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Current scenario */}
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-3">
                Escenario Actual
              </p>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-slate-600">{recommendation.from} (origen)</span>
                    <StatusBadge level={recommendation.riskLevel} />
                  </div>
                  <HealthBar value={currentHealthFrom} />
                  <p className="text-xs text-slate-400 mt-1">Vence en {recommendation.expiresIn} días</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-slate-600">{recommendation.to} (destino)</span>
                    <StatusBadge level="warning" label="Riesgo de faltante" />
                  </div>
                  <HealthBar value={currentHealthTo} />
                  <p className="text-xs text-slate-400 mt-1">Cobertura estimada: 4 días</p>
                </div>
              </div>
            </div>

            {/* Simulated scenario */}
            <div className="rounded-2xl border-2 border-brand-500/40 bg-brand-50/40 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-brand-600 mb-3">
                Escenario Simulado (post-transferencia)
              </p>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-slate-600">{recommendation.from} (origen)</span>
                    <StatusBadge level={simulatedHealthFrom > 60 ? 'healthy' : 'warning'} />
                  </div>
                  <HealthBar value={simulatedHealthFrom} />
                  <p className="text-xs text-slate-400 mt-1">Excedente reducido en {qty} unidades</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-slate-600">{recommendation.to} (destino)</span>
                    <StatusBadge level={simulatedHealthTo > 60 ? 'healthy' : 'warning'} />
                  </div>
                  <HealthBar value={simulatedHealthTo} />
                  <p className="text-xs text-slate-400 mt-1">
                    Cobertura estimada: {Math.round(4 + (qty / maxQty) * 18)} días
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quantity slider */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="qty-slider" className="text-sm font-semibold text-slate-700">
                Cantidad a transferir
              </label>
              <span className="font-mono text-sm font-bold text-brand-700">
                {qty} / {maxQty} unidades
              </span>
            </div>
            <input
              id="qty-slider"
              type="range"
              min={Math.round(maxQty * 0.1)}
              max={maxQty}
              step={10}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-full accent-brand-600"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>Mínimo</span>
              <span>Lote completo</span>
            </div>
          </div>

          {/* Impact summary */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-healthy-bg border border-healthy-border p-3 text-center">
              <p className="text-xs text-healthy font-semibold mb-1">Ahorro estimado</p>
              <p className="font-mono font-bold text-healthy text-lg">${estSavings.toLocaleString('es-AR')}</p>
            </div>
            <div className="rounded-xl bg-brand-50 border border-brand-100 p-3 text-center">
              <p className="text-xs text-brand-600 font-semibold mb-1">Unidades salvadas</p>
              <p className="font-mono font-bold text-brand-700 text-lg">{qty}</p>
            </div>
            <div className="rounded-xl bg-slate-100 border border-slate-200 p-3 text-center">
              <p className="text-xs text-slate-500 font-semibold mb-1">Tiempo de tránsito</p>
              <p className="font-mono font-bold text-slate-700 text-lg">~2h 15m</p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/60 rounded-b-3xl">
          <button onClick={onClose} className="btn-secondary">
            Cancelar
          </button>
          <button onClick={handleConfirm} disabled={confirming || confirmed} className="btn-primary">
            {confirming ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Procesando…
              </>
            ) : confirmed ? (
              <>Transferencia Confirmada ✓</>
            ) : (
              <>
                <Truck size={16} /> Confirmar Transferencia
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
