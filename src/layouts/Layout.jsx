import { NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  Boxes,
  BrainCircuit,
  ArrowLeftRight,
  LineChart,
  Settings as SettingsIcon,
  Search,
  Bell,
  Activity,
  ChevronDown,
} from 'lucide-react'

const navItems = [
  { to: '/', label: 'Resumen', icon: LayoutDashboard, end: true },
  { to: '/inventory', label: 'Inventario en Vivo', icon: Boxes },
  { to: '/predictions', label: 'Predicciones IA', icon: BrainCircuit },
  { to: '/redistribution', label: 'Redistribución', icon: ArrowLeftRight },
  { to: '/analytics', label: 'Analítica', icon: LineChart },
  { to: '/settings', label: 'Configuración', icon: SettingsIcon },
]

export default function Layout() {
  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      {/* ── Sidebar ───────────────────────────────────────────── */}
      <aside className="w-64 shrink-0 bg-brand-950 text-white flex flex-col">
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-white/10">
          <div className="h-8 w-8 rounded-lg bg-brand-500 flex items-center justify-center">
            <Activity size={18} className="text-white" />
          </div>
          <div className="leading-tight">
            <p className="font-bold text-sm tracking-tight">MedLink AI</p>
            <p className="text-[11px] text-brand-300">Red Hospitalaria</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-700 text-white shadow-sm'
                    : 'text-brand-100/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon size={18} strokeWidth={2} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-xs text-brand-100/70 mb-1">Estado de integración HIS</p>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-healthy animate-pulse" />
              <span className="text-xs font-semibold">Conectado</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main column ───────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="h-16 shrink-0 border-b border-slate-200 bg-white/80 backdrop-blur-xs flex items-center justify-between px-6">
          <div className="relative w-full max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar medicamento, lote u hospital…"
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white transition"
            />
          </div>

          <div className="flex items-center gap-4 pl-4">
            <button
              className="relative h-9 w-9 flex items-center justify-center rounded-xl hover:bg-slate-100 transition"
              aria-label="Notificaciones"
            >
              <Bell size={18} className="text-slate-500" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-critical" />
            </button>
            <button className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
              <div className="h-9 w-9 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-semibold text-sm">
                MF
              </div>
              <div className="text-left leading-tight hidden sm:block">
                <p className="text-sm font-semibold text-slate-800">María Fernández</p>
                <p className="text-xs text-slate-400">Jefa de Farmacia</p>
              </div>
              <ChevronDown size={14} className="text-slate-400" />
            </button>
          </div>
        </header>

        {/* Routed page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
