import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

const toneStyles = {
  critical: 'text-critical bg-critical-bg',
  warning: 'text-warning bg-warning-bg',
  healthy: 'text-healthy bg-healthy-bg',
  brand: 'text-brand-700 bg-brand-100',
}

export default function KpiCard({ label, value, delta, trend, tone }) {
  const TrendIcon = trend === 'up' ? ArrowUpRight : ArrowDownRight
  return (
    <div className="card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        <span className={`h-2.5 w-2.5 rounded-full ${toneStyles[tone].split(' ')[1]}`} />
      </div>
      <div className="text-3xl font-bold font-mono tracking-tight text-slate-900">{value}</div>
      <div className={`inline-flex w-fit items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold ${toneStyles[tone]}`}>
        <TrendIcon size={13} />
        {delta}
      </div>
    </div>
  )
}
