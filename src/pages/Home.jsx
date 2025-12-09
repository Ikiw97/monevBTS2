import React from 'react'
import { Link } from 'react-router-dom'
import FeatureCard from '../components/FeatureCard'
import HeroStats from '../components/HeroStats'

const features = [
  {
    title: 'Input Data Lapangan',
    desc: 'Form checklist cepat dengan opsi upload foto dan validasi supaya data rapi.',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20h9" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4h6v6" />
      </svg>
    ),
  },
  {
    title: 'Peta Interaktif',
    desc: 'Peta menara dengan clustering, pencarian, dan popup ringkasan site.',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2l9 4-9 4-9-4 9-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10l9 4-9 4-9-4 9-4z" />
      </svg>
    ),
  },
  {
    title: 'Dashboard & Laporan',
    desc: 'Grafik tren, distribusi kondisi, dan eksport laporan PDF/CSV.',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17a4 4 0 100-8 4 4 0 000 8z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    title: 'Keamanan & Auth',
    desc: 'Autentikasi petugas (Supabase Auth) dan peran akses untuk proteksi data.',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" />
      </svg>
    ),
  },
]

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="hero card relative overflow-hidden" style={{ backgroundImage: "linear-gradient(180deg, rgba(124,58,237,0.12), rgba(124,58,237,0.04)), url('https://source.unsplash.com/1600x900/?telecommunication,tower,antenna')", minHeight: 420 }}>
        <div className="container flex flex-col lg:flex-row items-center justify-between h-full p-8 lg:p-12 relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight drop-shadow">Sistem Monitoring & Evaluasi Menara BTS</h1>
            <p className="mt-3 text-sm md:text-base text-white/90">Solusi terpusat untuk input checklist lapangan, pemetaan menara, dan laporan analitik — dirancang untuk instansi pemerintah dan operator lapangan.</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/input" className="inline-flex items-center px-5 py-3 bg-white text-brand-700 rounded-md font-semibold shadow hover:scale-[.995] transition">
                Mulai Input
              </Link>
              <Link to="/dashboard" className="inline-flex items-center px-5 py-3 bg-transparent border border-white/40 text-white rounded-md hover:bg-white/10 transition">
                Lihat Dashboard
              </Link>
            </div>
          </div>

          <div className="mt-8 lg:mt-0 w-full lg:w-1/3">
            <div className="bg-white/5 p-4 rounded-lg shadow-lg">
              <HeroStats />
            </div>
          </div>
        </div>

        {/* decorative SVG shapes */}
        <svg className="absolute -right-32 top-8 opacity-20 w-80 h-80" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs><linearGradient id="g1" x1="0" x2="1"><stop offset="0" stopColor="#7c3aed" stopOpacity="0.6"/><stop offset="1" stopColor="#06b6d4" stopOpacity="0.4"/></linearGradient></defs>
          <path fill="url(#g1)" d="M43.5,-55.8C58.3,-48.9,73.1,-40.3,76.6,-27.9C80.1,-15.6,72.2,0.5,61,11.4C49.8,22.4,35.3,27.9,21.9,36.6C8.6,45.4,-3.7,57.3,-16.6,61C-29.4,64.6,-42.6,60.1,-52.1,50C-61.6,39.9,-67.4,24.2,-68.7,7.9C-70,-8.4,-66,-25.3,-56.5,-36.8C-47,-48.4,-32.1,-54.6,-16.3,-60.4C-0.5,-66.2,15.2,-71.3,29.7,-67.4C44.2,-63.6,58.7,-50.9,43.5,-55.8Z" transform="translate(100 100)"/>
        </svg>
      </section>

      {/* Features */}
      <section className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <FeatureCard key={i} title={f.title} desc={f.desc} icon={f.icon} />
        ))}
      </section>

      {/* Content area: overview + recent sites */}
      <section className="container grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h3 className="text-xl font-semibold mb-2">Ringkasan & Insight</h3>
            <p className="text-sm text-muted">Halaman ini memberikan ringkasan cepat kondisi menara, item yang berpotensi bermasalah, dan daftar site terbaru untuk ditindaklanjuti.</p>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-gradient-to-br from-brand-50 to-white/60 shadow-sm">
                <div className="text-sm text-muted">Pengingat</div>
                <div className="mt-2 font-semibold">Jadwalkan inspeksi bulanan</div>
                <div className="text-xs text-muted mt-1">Pastikan semua site telah dicek pada bulan ini.</div>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-br from-white to-white/40 shadow-sm">
                <div className="text-sm text-muted">Tips</div>
                <div className="mt-2 font-semibold">Foto dokumentasi</div>
                <div className="text-xs text-muted mt-1">Unggah foto bagian kritis agar catatan lebih jelas.</div>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-br from-white to-white/40 shadow-sm">
                <div className="text-sm text-muted">Keamanan</div>
                <div className="mt-2 font-semibold">Backup data</div>
                <div className="text-xs text-muted mt-1">Simpan export laporan reguler untuk arsip.</div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-3">Daftar Site Terbaru</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-sm text-gray-600 dark:text-gray-300">
                    <th className="py-2">Nomor</th>
                    <th className="py-2">Nama Site</th>
                    <th className="py-2">Lokasi</th>
                    <th className="py-2">Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {/* recent sites are shown from Dashboard; use static placeholder if no data */}
                  <tr className="border-t">
                    <td className="py-2">123</td>
                    <td className="py-2">pt.laguna</td>
                    <td className="py-2">kp. legok hangseur</td>
                    <td className="py-2">2025-12-04</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card">
            <h4 className="font-semibold mb-2">Quick Actions</h4>
            <div className="flex flex-col gap-3">
              <Link to="/input" className="px-4 py-2 bg-brand-600 text-white rounded-md text-sm">Tambah Site Baru</Link>
              <Link to="/maps" className="px-4 py-2 bg-white border border-gray-200 rounded-md text-sm">Buka Peta</Link>
              <Link to="/dashboard" className="px-4 py-2 bg-white/30 rounded-md text-sm">Lihat Laporan</Link>
            </div>
          </div>

          <div className="card">
            <h4 className="font-semibold mb-2">Recent Activity</h4>
            <ul className="text-sm text-muted space-y-2">
              <li>Petugas A meng-update site 123 (2 jam lalu)</li>
              <li>Petugas B menambahkan checklist untuk site 456 (1 hari lalu)</li>
            </ul>
          </div>
        </aside>
      </section>
    </div>
  )
}