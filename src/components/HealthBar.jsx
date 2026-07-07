// Elemento de firma visual de MedLink AI: una barra de "signos vitales"
// que representa la salud del stock (rotación vs. riesgo de vencimiento).
// < 25%  -> crítico (rojo)   | 25-60% -> advertencia (naranja) | > 60% -> saludable (verde)

export default function HealthBar({ value }) {
  const color =
    value < 25 ? 'bg-critical' : value < 60 ? 'bg-warning' : 'bg-healthy'
  const track =
    value < 25 ? 'bg-critical-bg' : value < 60 ? 'bg-warning-bg' : 'bg-healthy-bg'

  return (
    <div className="flex items-center gap-2 w-full min-w-[110px]">
      <div className={`relative h-2 flex-1 rounded-full overflow-hidden ${track}`}>
        <div
          className={`absolute inset-y-0 left-0 rounded-full ${color} transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
        {/* Marca tipo "pulso" en el borde del valor actual */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 h-2.5 w-0.5 ${color} rounded-full`}
          style={{ left: `calc(${value}% - 1px)` }}
        />
      </div>
      <span className="text-xs font-mono font-semibold text-slate-500 w-8 text-right">
        {value}%
      </span>
    </div>
  )
}
