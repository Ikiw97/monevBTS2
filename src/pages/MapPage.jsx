import React, { useEffect, useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { supabase } from '../lib/supabaseClient'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

function FitToMarker({ coords }) {
  const map = useMap()
  useEffect(() => {
    if (coords) {
      map.setView(coords, 15)
    }
  }, [coords])
  return null
}

export default function MapPage() {
  const [sites, setSites] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [fitCoords, setFitCoords] = useState(null)
  const mapRef = useRef()

  useEffect(() => {
    loadSites()
  }, [])

  async function loadSites() {
    setLoading(true)
    const { data, error } = await supabase.from('sites').select('*')
    if (error) {
      console.error(error)
      setLoading(false)
      return
    }
    setSites(data || [])
    setLoading(false)
  }

  async function handleSearch(e) {
    e.preventDefault()
    if (!search) return
    const { data, error } = await supabase.from('sites').select('*').eq('nomor_menara', search).single()
    if (error) {
      setFitCoords(null)
      alert('Site tidak ditemukan')
      return
    }
    if (data && data.latitude && data.longitude) {
      setFitCoords([data.latitude, data.longitude])
    } else {
      alert('Site ditemukan tetapi tidak memiliki koordinat')
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Peta Menara</h2>

      <div className="flex items-center space-x-3">
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <input placeholder="Search by nomor menara" value={search} onChange={(e) => setSearch(e.target.value)} className="rounded border-gray-200 px-3 py-2" />
          <button className="px-3 py-2 bg-indigo-600 text-white rounded">Cari</button>
          <button type="button" onClick={loadSites} className="px-3 py-2 bg-gray-200 rounded">Refresh</button>
        </form>
      </div>

      <div className="bg-white rounded shadow overflow-hidden" style={{ height: '70vh' }}>
        <MapContainer center={[-6.2, 106.8]} zoom={11} style={{ height: '100%', width: '100%' }} whenCreated={(map) => (mapRef.current = map)}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {fitCoords && <FitToMarker coords={fitCoords} />}
          {sites.map((s) => s.latitude && s.longitude ? (
            <Marker key={s.id} position={[s.latitude, s.longitude]}>
              <Popup>
                <div className="text-sm">
                  <div className="font-semibold">{s.nama_site}</div>
                  <div>Nomor: {s.nomor_menara}</div>
                  <div className="text-xs text-gray-600">{s.alamat}</div>
                </div>
              </Popup>
            </Marker>
          ) : null)}
        </MapContainer>
      </div>
    </div>
  )
}
