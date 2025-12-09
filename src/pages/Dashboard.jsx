import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import KPI from '../components/KPI'

export default function Dashboard() {
  const [sites, setSites] = useState([])
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ totalSites: 0, baik: 0, sedang: 0, buruk: 0 })
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchData() {
    setLoading(true)
    setErrorMsg(null)

    if (!supabase || typeof supabase.from !== 'function') {
      const msg = 'Supabase client belum diinisialisasi dengan benar. Periksa src/lib/supabaseClient.js dan .env.'
      console.error(msg, supabase)
      setErrorMsg(msg)
      setLoading(false)
      return
    }

    try {
      // Ambil sites dan items (tanpa chaining .order)
      const resSites = await supabase.from('sites').select('*')
      if (resSites.error) throw resSites.error
      let sData = resSites.data || []

      // Urutkan lokal berdasarkan created_at desc
      sData = sData.slice().sort((a, b) => {
        const ta = a?.created_at ? new Date(a.created_at).getTime() : 0
        const tb = b?.created_at ? new Date(b.created_at).getTime() : 0
        return tb - ta
      })

      const resItems = await supabase.from('items').select('*')
      if (resItems.error) throw resItems.error
      const iData = resItems.data || []

      setSites(sData)
      setItems(iData)

      // hitung stats dari items
      const counts = { baik: 0, sedang: 0, buruk: 0 }
      iData.forEach((it) => {
        if (!it) return
        if (it.kondisi === 'baik') counts.baik += 1
        else if (it.kondisi === 'sedang') counts.sedang += 1
        else if (it.kondisi === 'buruk') counts.buruk += 1
      })

      setStats({ totalSites: sData.length, ...counts })
    } catch (err) {
      console.error('Dashboard fetch error:', err)
      setErrorMsg('Gagal mengambil data. Periksa konfigurasi Supabase atau koneksi. Lihat console untuk detail.')
    } finally {
      setLoading(false)
    }
  }

  // helper untuk progress %
  function percent(part, total) {
    if (!total) return 0
    return Math.round((part / total) * 100)
  }

  const totalItems = stats.baik + stats.sedang + stats.buruk

  // terakhir diupdate: ambil created_at dari site pertama (sudah diurutkan desc)
  const lastUpdate = sites[0]?.created_at ? new Date(sites[0].created_at).toLocaleString() : '—'

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPI title="Total Site" value={stats.totalSites ?? 0} icon={<svg className="w-6 h-6 text-brand-700" fill="currentColor" viewBox="0 0 20 20"><path d="M3 3h14v2H3V3zM3 7h14v2H3V7zM3 11h14v6H3v-6z"/></svg>} />
        <KPI title="Item Baik" value={stats.baik ?? 0} icon={<svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l-3-3 1.4-1.4L9 9.2l4.6-4.6L15 6l-6 6z"/></svg>} />
        <KPI title="Item Buruk" value={stats.buruk ?? 0} icon={<svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 110 16 8 8 0 010-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/></svg>} />
      </div>

      {errorMsg && (
        <div className="p-4 rounded-md bg-red-50 text-red-700 border border-red-100">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#071126] p-6 rounded-lg shadow col-span-2">
          <h3 className="font-semibold mb-4">Ringkasan Kondisi Item</h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-200">Baik</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">{stats.baik ?? 0} ({percent(stats.baik, totalItems)}%)</div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-[#0d1a2b] h-3 rounded">
                <div className="h-3 rounded bg-green-500" style={{ width: `${percent(stats.baik, totalItems)}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-200">Sedang</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">{stats.sedang ?? 0} ({percent(stats.sedang, totalItems)}%)</div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-[#0d1a2b] h-3 rounded">
                <div className="h-3 rounded bg-yellow-500" style={{ width: `${percent(stats.sedang, totalItems)}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-200">Buruk</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">{stats.buruk ?? 0} ({percent(stats.buruk, totalItems)}%)</div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-[#0d1a2b] h-3 rounded">
                <div className="h-3 rounded bg-red-500" style={{ width: `${percent(stats.buruk, totalItems)}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#071126] p-6 rounded-lg shadow">
          <h3 className="font-semibold mb-3">Statistik Cepat</h3>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <div className="mb-2">Total Sites: <strong>{stats.totalSites}</strong></div>
            <div className="mb-2">Total Items: <strong>{totalItems}</strong></div>
            <div className="mb-2">Last update: <strong>{lastUpdate}</strong></div>
          </div>
        </div>
      </div>

      <section className="bg-white dark:bg-[#071126] p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-3">Daftar Site Terbaru</h3>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm text-gray-600 dark:text-gray-300">
                  <th className="py-2">Nomor</th>
                  <th className="py-2">Nama Site</th>
                  <th className="py-2">Lokasi</th>
                  <th className="py-2">Tanggal Checklist</th>
                </tr>
              </thead>
              <tbody>
                {(sites || []).slice(0, 50).map((s) => (
                  <tr key={s.id} className="border-t hover:bg-gray-50 dark:hover:bg-[#07182a]">
                    <td className="py-2">{s.nomor_menara}</td>
                    <td className="py-2">{s.nama_site}</td>
                    <td className="py-2">{s.alamat}</td>
                    <td className="py-2">{s.tanggal_checklist}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}