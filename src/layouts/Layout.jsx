import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
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
  Menu,
  X,
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
  // Controla el drawer del sidebar en pantallas chicas (mobile/tablet).
  // En desktop (md+) el sidebar queda siempre visible y este estado se ignora.
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const location = useLocation()

  // Cierra el drawer automáticamente al navegar a otra sección.
  useEffect(() => {
    setIsMobileNavOpen(false)
  }, [location.pathname])

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      {/* ── Overlay (solo mobile, cuando el drawer está abierto) ─ */}
      {isMobileNavOpen && (
        <button
          aria-label="Cerrar menú"
          onClick={() => setIsMobileNavOpen(false)}
          className="fixed inset-0 z-30 bg-brand-950/50 backdrop-blur-sm md:hidden"
        />
      )}

      {/* ── Sidebar ───────────────────────────────────────────── */}
      {/* Mobile: drawer fijo que entra/sale con translate-x. Desktop (md+): estático y siempre visible. */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 shrink-0 bg-brand-950 text-white flex flex-col transition-transform duration-300 ease-out
          md:static md:translate-x-0
          ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between gap-2.5 px-5 h-16 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-brand-500 flex items-center justify-center shrink-0">
              <Activity size={18} className="text-white" />
            </div>
            <div className="leading-tight">
              <p className="font-bold text-sm tracking-tight">MedLink AI</p>
              <p className="text-[11px] text-brand-300">Red Hospitalaria</p>
            </div>
          </div>
          <button
            onClick={() => setIsMobileNavOpen(false)}
            aria-label="Cerrar menú"
            className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition md:hidden"
          >
            <X size={18} />
          </button>
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
        <header className="shrink-0 border-b border-slate-200 bg-white/80 backdrop-blur-xs">
          <div className="h-16 flex items-center justify-between gap-2 px-3 sm:px-6">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {/* Botón hamburguesa: solo visible debajo de md */}
              <button
                onClick={() => setIsMobileNavOpen(true)}
                aria-label="Abrir menú"
                className="h-9 w-9 shrink-0 flex items-center justify-center rounded-xl hover:bg-slate-100 transition md:hidden"
              >
                <Menu size={20} className="text-slate-600" />
              </button>

              {/* Buscador: barra completa a partir de sm; en mobile se reemplaza por el ícono de la derecha */}
              <div className="relative w-full max-w-md hidden sm:block">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar medicamento, lote u hospital…"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white transition"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 pl-1 sm:pl-4 shrink-0">
              {/* Ícono de búsqueda: solo mobile, alterna la barra debajo del header */}
              <button
                onClick={() => setIsSearchOpen((v) => !v)}
                aria-label="Buscar"
                className="h-9 w-9 flex items-center justify-center rounded-xl hover:bg-slate-100 transition sm:hidden"
              >
                <Search size={18} className="text-slate-500" />
              </button>
              <button
                className="relative h-9 w-9 flex items-center justify-center rounded-xl hover:bg-slate-100 transition"
                aria-label="Notificaciones"
              >
                <Bell size={18} className="text-slate-500" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-critical" />
              </button>
              <button className="flex items-center gap-2.5 sm:pl-3 sm:border-l border-slate-200">
                <div className="h-9 w-9 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-semibold text-sm shrink-0">
                  MF
                </div>
                <div className="text-left leading-tight hidden lg:block">
                  <p className="text-sm font-semibold text-slate-800">María Fernández</p>
                  <p className="text-xs text-slate-400">Jefa de Farmacia</p>
                </div>
                <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
              </button>
            </div>
          </div>

          {/* Fila de búsqueda expandible: solo mobile */}
          {isSearchOpen && (
            <div className="px-3 pb-3 sm:hidden">
              <div className="relative w-full">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Buscar medicamento, lote u hospital…"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white transition"
                />
              </div>
            </div>
          )}
        </header>

        {/* Routed page content */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
