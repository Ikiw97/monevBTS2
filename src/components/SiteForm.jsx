import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const LOCATION_OPTIONS = [
  { value: 'p', label: 'P (Pemukiman)' },
  { value: 'k', label: 'K (Kebun)' },
  { value: 's', label: 'S (Sawah)' },
  { value: 'pk', label: 'PK (Pemukiman Kebun)' },
  { value: 'ju', label: 'JU (Jalan Utama)' },
  { value: 'jl', label: 'JL (Jalan Lingkungan)' },
  { value: 'jt', label: 'JT (Jalan TOL)' },
]

const CHECKLIST_ITEMS = [
  { key: 'busbar', label: 'Busbar (upper, lower, middle)' },
  { key: 'cadwel', label: 'Cadwel di tiap kaki tower' },
  { key: 'lampu', label: 'Lampu-lampu (OBL, taman, penerangan BTS)' },
  { key: 'box_kwh', label: 'Box KWH' },
  { key: 'box_acpdl', label: 'Box ACPDL' },
  { key: 'box_abl', label: 'Box ABL' },
  { key: 'tangga', label: 'Tangga naik tower' },
  { key: 'horizontal_tray', label: 'Horizontal tray' },
  { key: 'tower', label: 'Tower' },
  { key: 'grounding', label: 'Grounding' },
  { key: 'jumlah_shelter', label: 'Jumlah shelter' },
  { key: 'menara_digunakan', label: 'Menara yang digunakan' },
  { key: 'self_spotting', label: 'Self spotting / microcell / kamuflase' },
  { key: 'pagar_bata', label: 'Pagar / dinding bata' },
]

export default function SiteForm() {
  const [form, setForm] = useState({
    nomor_menara: '',
    nama_site: '',
    alamat: '',
    latitude: '',
    longitude: '',
    tanggal_checklist: '',
    lokasi_tipe: 'p',
  })

  const [items, setItems] = useState(
    CHECKLIST_ITEMS.map((it, idx) => ({
      nomor: idx + 1,
      key: it.key,
      item_material: it.label,
      spesifikasi: '',
      kondisi: 'baik',
      keterangan: '',
    }))
  )

  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }))
  }

  function handleItemChange(index, field, value) {
    setItems((prev) => {
      const clone = [...prev]
      clone[index] = { ...clone[index], [field]: value }
      return clone
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    const sitePayload = {
      nomor_menara: form.nomor_menara,
      nama_site: form.nama_site,
      alamat: form.alamat,
      latitude: parseFloat(form.latitude) || null,
      longitude: parseFloat(form.longitude) || null,
      tanggal_checklist: form.tanggal_checklist,
      lokasi_tipe: form.lokasi_tipe,
    }

    const { data: siteData, error: siteErr } = await supabase.from('sites').insert(sitePayload).select().single()
    if (siteErr) {
      console.error(siteErr)
      setMessage('Gagal menyimpan site: ' + siteErr.message)
      setSaving(false)
      return
    }

    const itemsPayload = items.map((it) => ({
      site_id: siteData.id,
      nomor: it.nomor,
      item_material: it.item_material,
      spesifikasi: it.spesifikasi,
      kondisi: it.kondisi,
      keterangan: it.keterangan,
    }))

    const { error: itemsErr } = await supabase.from('items').insert(itemsPayload)
    if (itemsErr) {
      console.error(itemsErr)
      setMessage('Gagal menyimpan checklist: ' + itemsErr.message)
      setSaving(false)
      return
    }

    setMessage('Data berhasil disimpan.')
    setForm({
      nomor_menara: '',
      nama_site: '',
      alamat: '',
      latitude: '',
      longitude: '',
      tanggal_checklist: '',
      lokasi_tipe: 'p',
    })
    setItems(
      CHECKLIST_ITEMS.map((it, idx) => ({
        nomor: idx + 1,
        key: it.key,
        item_material: it.label,
        spesifikasi: '',
        kondisi: 'baik',
        keterangan: '',
      }))
    )
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Nomor Menara</label>
          <input
            name="nomor_menara"
            value={form.nomor_menara}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded border-gray-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Nama Site</label>
          <input
            name="nama_site"
            value={form.nama_site}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded border-gray-200"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Alamat Site</label>
          <input
            name="alamat"
            value={form.alamat}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded border-gray-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Latitude</label>
          <input name="latitude" value={form.latitude} onChange={handleChange} className="mt-1 block w-full rounded border-gray-200" />
        </div>

        <div>
          <label className="block text-sm font-medium">Longitude</label>
          <input name="longitude" value={form.longitude} onChange={handleChange} className="mt-1 block w-full rounded border-gray-200" />
        </div>

        <div>
          <label className="block text-sm font-medium">Tanggal Checklist</label>
          <input name="tanggal_checklist" value={form.tanggal_checklist} onChange={handleChange} type="date" className="mt-1 block w-full rounded border-gray-200" />
        </div>

        <div>
          <label className="block text-sm font-medium">Tipe Lokasi</label>
          <select name="lokasi_tipe" value={form.lokasi_tipe} onChange={handleChange} className="mt-1 block w-full rounded border-gray-200">
            {LOCATION_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <section>
        <h3 className="font-semibold mb-2">Checklist Material</h3>
        <div className="space-y-4">
          {items.map((it, idx) => (
            <div key={it.key} className="bg-gray-50 p-4 rounded border">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-medium">{it.nomor}. {it.item_material}</div>
                  <div className="text-xs text-gray-500 mt-1">Spesifikasi / keterangan</div>
                </div>
                <div className="text-sm text-gray-600">Kondisi:</div>
              </div>

              <div className="mt-3 grid md:grid-cols-3 gap-3">
                <input placeholder="Spesifikasi" value={it.spesifikasi} onChange={(e) => handleItemChange(idx, 'spesifikasi', e.target.value)} className="rounded border-gray-200" />
                <div className="flex items-center space-x-3">
                  <label className="inline-flex items-center">
                    <input type="radio" name={`kondisi-${idx}`} checked={it.kondisi === 'baik'} onChange={() => handleItemChange(idx, 'kondisi', 'baik')} />
                    <span className="ml-2 text-sm">Baik</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name={`kondisi-${idx}`} checked={it.kondisi === 'sedang'} onChange={() => handleItemChange(idx, 'kondisi', 'sedang')} />
                    <span className="ml-2 text-sm">Sedang</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" name={`kondisi-${idx}`} checked={it.kondisi === 'buruk'} onChange={() => handleItemChange(idx, 'kondisi', 'buruk')} />
                    <span className="ml-2 text-sm">Buruk</span>
                  </label>
                </div>
                <input placeholder="Keterangan" value={it.keterangan} onChange={(e) => handleItemChange(idx, 'keterangan', e.target.value)} className="rounded border-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex items-center space-x-3">
        <button type="submit" disabled={saving} className="px-4 py-2 bg-indigo-600 text-white rounded">
          {saving ? 'Menyimpan...' : 'Simpan Data'}
        </button>
        <div className="text-sm text-green-600">{message}</div>
      </div>
    </form>
  )
}
