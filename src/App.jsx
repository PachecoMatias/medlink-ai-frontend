import { Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import LiveInventory from './pages/LiveInventory.jsx'
import AIPredictions from './pages/AIPredictions.jsx'
import Redistribution from './pages/Redistribution.jsx'
import Analytics from './pages/Analytics.jsx'
import Settings from './pages/Settings.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="inventory" element={<LiveInventory />} />
        <Route path="predictions" element={<AIPredictions />} />
        <Route path="redistribution" element={<Redistribution />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}
