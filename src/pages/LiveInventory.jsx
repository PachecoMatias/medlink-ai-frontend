import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import HealthBar from '../components/HealthBar.jsx'
import { inventory, hospitals, categories } from '../data/mockData.js'

// ── API HOOK ────────────────────────────────────────────────────
// GET /api/v1/inventory?hospital=&category=&search=
// Idealmente paginado desde el backend Spring Boot en lugar de filtrar client-side.
// ──────────────────────────────────────────────────────────────

export default function LiveInventory() {
  const [search, setSearch] = useState('')
  const [hospitalFilter, setHospitalFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const filtered = useMemo(() => {
    return inventory.filter((item) => {
      const matchesSearch =
        item.drug.toLowerCase().includes(search.toLowerCase()) ||
        item.batch.toLowerCase().includes(search.toLowerCase())
      const matchesHospital = hospitalFilter === 'all' || item.hospital === hospitalFilter
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter
      return matchesSearch && matchesHospital && matchesCategory
    })
  }, [search, hospitalFilter, categoryFilter])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Inventario en Vivo</h1>
        <p className="text-sm text-slate-500 mt-1">
          Stock en tiempo real sincronizado desde los HIS de cada hospital
        </p>
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por medicamento o lote…"
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white transition"
          />
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-slate-400 hidden sm:block" />
          <select
            value={hospitalFilter}
            onChange={(e) => setHospitalFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 text-sm px-3 py-2.5 focus:bg-white transition"
          >
            <option value="all">Todos los hospitales</option>
            {hospitals.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 text-sm px-3 py-2.5 focus:bg-white transition"
          >
            <option value="all">Todas las categorías</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-400 border-b border-slate-100">
                <th className="px-5 py-3 font-semibold">Medicamento</th>
                <th className="px-5 py-3 font-semibold">Lote</th>
                <th className="px-5 py-3 font-semibold">Hospital</th>
                <th className="px-5 py-3 font-semibold">Vencimiento</th>
                <th className="px-5 py-3 font-semibold">Stock</th>
                <th className="px-5 py-3 font-semibold">Estado de Salud</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition">
                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-slate-800">{item.drug}</p>
                    <p className="text-xs text-slate-400">{item.category}</p>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-slate-500">{item.batch}</td>
                  <td className="px-5 py-3.5 text-slate-600">{item.hospital}</td>
                  <td className="px-5 py-3.5 font-mono text-slate-600">
                    {new Date(item.expiry).toLocaleDateString('es-AR')}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-slate-700">
                    {item.stock} <span className="text-slate-300">/ {item.maxStock}</span>
                  </td>
                  <td className="px-5 py-3.5 min-w-[160px]">
                    <HealthBar value={item.health} />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-slate-400">
                    No se encontraron medicamentos con esos criterios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
