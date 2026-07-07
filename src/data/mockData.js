// ─────────────────────────────────────────────────────────────
// MOCK DATA LAYER
// En producción, cada uno de estos arrays/objetos será reemplazado
// por un hook (ej. useInventory, useRecommendations) que consuma
// los endpoints REST expuestos por el backend Java Spring Boot.
// Ejemplo real: GET /api/v1/inventory, GET /api/v1/ai/recommendations
// ─────────────────────────────────────────────────────────────

export const kpis = [
  {
    id: 'at-risk',
    label: 'Medicamentos en Riesgo',
    value: '184',
    delta: '+12 esta semana',
    trend: 'up',
    tone: 'critical',
  },
  {
    id: 'shortages',
    label: 'Faltantes Predichos (30d)',
    value: '37',
    delta: '-5 vs. mes anterior',
    trend: 'down',
    tone: 'warning',
  },
  {
    id: 'transfers',
    label: 'Transferencias Exitosas',
    value: '452',
    delta: '+8.4% este trimestre',
    trend: 'up',
    tone: 'healthy',
  },
  {
    id: 'savings',
    label: 'Ahorro Estimado',
    value: '$186.400',
    delta: '+$24.100 este mes',
    trend: 'up',
    tone: 'brand',
  },
]

export const hospitals = [
  'Hospital Central San Miguel',
  'Clínica Norte',
  'Hospital Regional Este',
  'Centro Médico Sur',
  'Hospital Pediátrico Belgrano',
]

// Coordenadas reales (aprox.) usadas por el mapa de red — src/components/NetworkMap.jsx.
// En producción: GET /api/v1/hospitals (cada hospital ya trae lat/lng geocodificados).
export const hospitalLocations = {
  'Hospital Central San Miguel': { lat: -26.8241, lng: -65.2226, isHub: true },
  'Clínica Norte': { lat: -26.8021, lng: -65.2101, isHub: false },
  'Hospital Regional Este': { lat: -26.8155, lng: -65.185, isHub: false },
  'Centro Médico Sur': { lat: -26.8501, lng: -65.231, isHub: false },
  'Hospital Pediátrico Belgrano': { lat: -26.833, lng: -65.24, isHub: false },
}

export const categories = [
  'Antibióticos',
  'Analgésicos',
  'Oncológicos',
  'Cardiovasculares',
  'Insulinas',
  'Vacunas',
]

export const recommendations = [
  {
    id: 'REC-1042',
    drug: 'Amoxicilina 500mg',
    from: 'Centro Médico Sur',
    to: 'Hospital Central San Miguel',
    quantity: 480,
    expiresIn: 18,
    riskLevel: 'critical',
    estSavings: 3200,
    confidence: 94,
  },
  {
    id: 'REC-1043',
    drug: 'Insulina Glargina',
    from: 'Hospital Regional Este',
    to: 'Hospital Pediátrico Belgrano',
    quantity: 120,
    expiresIn: 25,
    riskLevel: 'warning',
    estSavings: 5400,
    confidence: 88,
  },
  {
    id: 'REC-1044',
    drug: 'Paracetamol 1g IV',
    from: 'Clínica Norte',
    to: 'Centro Médico Sur',
    quantity: 900,
    expiresIn: 12,
    riskLevel: 'critical',
    estSavings: 1800,
    confidence: 97,
  },
  {
    id: 'REC-1045',
    drug: 'Metformina 850mg',
    from: 'Hospital Central San Miguel',
    to: 'Hospital Regional Este',
    quantity: 300,
    expiresIn: 41,
    riskLevel: 'healthy',
    estSavings: 950,
    confidence: 76,
  },
]

export const expiryForecast = [
  { month: 'Ene', unidades: 1200 },
  { month: 'Feb', unidades: 1450 },
  { month: 'Mar', unidades: 980 },
  { month: 'Abr', unidades: 1670 },
  { month: 'May', unidades: 2100 },
  { month: 'Jun', unidades: 1890 },
  { month: 'Jul', unidades: 2400 },
]

export const inventory = [
  {
    id: 'INV-001',
    drug: 'Amoxicilina 500mg',
    batch: 'B-22841',
    hospital: 'Hospital Central San Miguel',
    category: 'Antibióticos',
    expiry: '2026-07-25',
    stock: 480,
    maxStock: 1200,
    health: 14,
  },
  {
    id: 'INV-002',
    drug: 'Insulina Glargina',
    batch: 'B-19022',
    hospital: 'Hospital Regional Este',
    category: 'Insulinas',
    expiry: '2026-08-02',
    stock: 120,
    maxStock: 300,
    health: 32,
  },
  {
    id: 'INV-003',
    drug: 'Paracetamol 1g IV',
    batch: 'B-30411',
    hospital: 'Clínica Norte',
    category: 'Analgésicos',
    expiry: '2026-07-19',
    stock: 900,
    maxStock: 2000,
    health: 8,
  },
  {
    id: 'INV-004',
    drug: 'Metformina 850mg',
    batch: 'B-11078',
    hospital: 'Hospital Central San Miguel',
    category: 'Cardiovasculares',
    expiry: '2026-09-15',
    stock: 300,
    maxStock: 500,
    health: 68,
  },
  {
    id: 'INV-005',
    drug: 'Vacuna Antigripal',
    batch: 'B-40092',
    hospital: 'Centro Médico Sur',
    category: 'Vacunas',
    expiry: '2027-01-10',
    stock: 1500,
    maxStock: 1600,
    health: 91,
  },
  {
    id: 'INV-006',
    drug: 'Trastuzumab 150mg',
    batch: 'B-50871',
    hospital: 'Hospital Pediátrico Belgrano',
    category: 'Oncológicos',
    expiry: '2026-07-30',
    stock: 24,
    maxStock: 60,
    health: 22,
  },
  {
    id: 'INV-007',
    drug: 'Atorvastatina 40mg',
    batch: 'B-27754',
    hospital: 'Hospital Regional Este',
    category: 'Cardiovasculares',
    expiry: '2026-12-05',
    stock: 680,
    maxStock: 800,
    health: 85,
  },
]

export const demandVsStock = [
  { week: 'Sem 1', demanda: 320, stock: 480 },
  { week: 'Sem 2', demanda: 410, stock: 440 },
  { week: 'Sem 3', demanda: 465, stock: 390 },
  { week: 'Sem 4', demanda: 520, stock: 340 },
  { week: 'Sem 5', demanda: 590, stock: 280 },
  { week: 'Sem 6', demanda: 610, stock: 210 },
]

export const highRiskShortages = [
  {
    drug: 'Insulina Glargina',
    hospital: 'Hospital Pediátrico Belgrano',
    daysToShortage: 6,
    confidence: 92,
    impact: 'Alto',
  },
  {
    drug: 'Amoxicilina 500mg',
    hospital: 'Clínica Norte',
    daysToShortage: 9,
    confidence: 87,
    impact: 'Alto',
  },
  {
    drug: 'Trastuzumab 150mg',
    hospital: 'Hospital Regional Este',
    daysToShortage: 14,
    confidence: 79,
    impact: 'Crítico',
  },
  {
    drug: 'Vacuna Antigripal',
    hospital: 'Centro Médico Sur',
    daysToShortage: 21,
    confidence: 65,
    impact: 'Medio',
  },
]

export const transfers = {
  pending: [
    { id: 'TRF-901', drug: 'Amoxicilina 500mg', from: 'Centro Médico Sur', to: 'Hospital Central San Miguel', quantity: 480 },
    { id: 'TRF-902', drug: 'Insulina Glargina', from: 'Hospital Regional Este', to: 'Hospital Pediátrico Belgrano', quantity: 120 },
  ],
  transit: [
    { id: 'TRF-887', drug: 'Paracetamol 1g IV', from: 'Clínica Norte', to: 'Centro Médico Sur', quantity: 900, eta: '2h 15min' },
    { id: 'TRF-891', drug: 'Metformina 850mg', from: 'Hospital Central San Miguel', to: 'Hospital Regional Este', quantity: 300, eta: '45min' },
  ],
  completed: [
    { id: 'TRF-850', drug: 'Vacuna Antigripal', from: 'Centro Médico Sur', to: 'Clínica Norte', quantity: 600, completedAt: 'Hace 2 días' },
    { id: 'TRF-861', drug: 'Atorvastatina 40mg', from: 'Hospital Regional Este', to: 'Hospital Central San Miguel', quantity: 200, completedAt: 'Hace 4 días' },
    { id: 'TRF-870', drug: 'Trastuzumab 150mg', from: 'Hospital Pediátrico Belgrano', to: 'Clínica Norte', quantity: 12, completedAt: 'Hace 5 días' },
  ],
}

export const savingsHistory = [
  { month: 'Feb', ahorro: 98000, desperdicioEvitado: 420 },
  { month: 'Mar', ahorro: 112000, desperdicioEvitado: 510 },
  { month: 'Abr', ahorro: 134500, desperdicioEvitado: 590 },
  { month: 'May', ahorro: 121000, desperdicioEvitado: 470 },
  { month: 'Jun', ahorro: 162300, desperdicioEvitado: 680 },
  { month: 'Jul', ahorro: 186400, desperdicioEvitado: 740 },
]

export const networkEfficiency = [
  { hospital: 'H. Central', eficiencia: 92 },
  { hospital: 'Clínica Norte', eficiencia: 78 },
  { hospital: 'H. Regional Este', eficiencia: 85 },
  { hospital: 'Centro Sur', eficiencia: 71 },
  { hospital: 'H. Pediátrico', eficiencia: 88 },
]
