import { AlertTriangle, TriangleAlert, CheckCircle2 } from 'lucide-react'

const config = {
  critical: { label: 'Crítico', className: 'badge-critical', Icon: AlertTriangle },
  warning: { label: 'Advertencia', className: 'badge-warning', Icon: TriangleAlert },
  healthy: { label: 'Saludable', className: 'badge-healthy', Icon: CheckCircle2 },
}

export default function StatusBadge({ level, label }) {
  const cfg = config[level] ?? config.healthy
  const Icon = cfg.Icon
  return (
    <span className={cfg.className}>
      <Icon size={12} />
      {label ?? cfg.label}
    </span>
  )
}
