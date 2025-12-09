import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function HeroStats() {
  const [stats, setStats] = useState({ sites: 0, items: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      try {
        if (!supabase || typeof supabase.from !== 'function') {
          setLoading(false)
          return
        }
        const s = await supabase.from('sites').select('id', { count: 'exact' })
        const i = await supabase.from('items').select('id', { count: 'exact' })
        if (!mounted) return
        setStats({ sites: (s?.count) || (s?.data?.length || 0), items: (i?.count) || (i?.data?.length || 0) })
      } catch (err) {
        console.warn('HeroStats fetch failed', err)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-white/80">Total Site</div>
          <div className="text-2xl font-bold text-white">{loading ? '—' : stats.sites}</div>
        </div>

        <div className="text-right">
          <div className="text-sm text-white/80">Total Item</div>
          <div className="text-2xl font-bold text-white">{loading ? '—' : stats.items}</div>
        </div>
      </div>

      <div className="text-xs text-white/80">
        <div>Realtime overview • Data disimpan di Supabase</div>
      </div>
    </div>
  )
}