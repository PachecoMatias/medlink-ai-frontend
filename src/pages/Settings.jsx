import { useState } from 'react'
import { Building2, Plug, SlidersHorizontal, Save } from 'lucide-react'

// ── API HOOK ────────────────────────────────────────────────────
// GET  /api/v1/settings/hospital-profile
// PUT  /api/v1/settings/hospital-profile
// POST /api/v1/settings/integrations/his/test-connection
// PUT  /api/v1/settings/ai-thresholds
// ──────────────────────────────────────────────────────────────

function SectionCard({ icon: Icon, title, subtitle, children }) {
  return (
    <div className="card p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-brand-100 flex items-center justify-center">
          <Icon size={17} className="text-brand-700" />
        </div>
        <div>
          <h2 className="font-bold text-slate-900">{title}</h2>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-600 mb-1.5 block">{label}</span>
      {children}
    </label>
  )
}

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:bg-white transition'

export default function Settings() {
  const [sensitivity, setSensitivity] = useState(65)

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Configuración</h1>
        <p className="text-sm text-slate-500 mt-1">Gestioná el perfil del hospital, integraciones y parámetros de IA</p>
      </div>

      <SectionCard icon={Building2} title="Perfil del Hospital" subtitle="Información institucional básica">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nombre del hospital">
            <input defaultValue="Hospital Central San Miguel" className={inputClass} />
          </Field>
          <Field label="Código de red MedLink">
            <input defaultValue="MED-AR-0142" className={inputClass} disabled />
          </Field>
          <Field label="Dirección">
            <input defaultValue="Av. Roca 1250, San Miguel de Tucumán" className={inputClass} />
          </Field>
          <Field label="Contacto de farmacia">
            <input defaultValue="farmacia@hcsm.org.ar" className={inputClass} />
          </Field>
        </div>
      </SectionCard>

      <SectionCard icon={Plug} title="Integraciones API" subtitle="Conexión con el sistema de información hospitalaria (HIS)">
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
            <div>
              <p className="font-semibold text-sm text-slate-800">Conexión HIS Principal</p>
              <p className="text-xs text-slate-500">Sincronización de inventario en tiempo real</p>
            </div>
            <span className="badge-healthy">Conectado</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Endpoint del HIS">
              <input defaultValue="https://his.hcsm.internal/api/v2" className={inputClass} />
            </Field>
            <Field label="Token de API">
              <input type="password" defaultValue="••••••••••••••••" className={inputClass} />
            </Field>
          </div>
          <button className="btn-secondary text-xs">Probar conexión</button>
        </div>
      </SectionCard>

      <SectionCard
        icon={SlidersHorizontal}
        title="Umbrales de Sensibilidad IA"
        subtitle="Definí qué tan agresivo es el modelo al generar alertas y recomendaciones"
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">Sensibilidad de detección de riesgo</span>
            <span className="font-mono text-sm font-bold text-brand-700">{sensitivity}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={sensitivity}
            onChange={(e) => setSensitivity(Number(e.target.value))}
            className="w-full accent-brand-600"
          />
          <p className="text-xs text-slate-400">
            Valores altos generan más alertas tempranas (más falsos positivos); valores bajos priorizan precisión.
          </p>
        </div>
      </SectionCard>

      <div className="flex justify-end">
        <button className="btn-primary">
          <Save size={16} /> Guardar cambios
        </button>
      </div>
    </div>
  )
}
