import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

// Supabase client akan diassign ke variabel ini, lalu diexport di akhir.
// Hindari menggunakan "export" di dalam blok if/else — itu yang menyebabkan SyntaxError.
let supabase

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    '[supabase] VITE_SUPABASE_URL atau VITE_SUPABASE_ANON_KEY tidak ditemukan. Supabase client tidak diinisialisasi.'
  )

  // stub minimal untuk mencegah crash di runtime saat supabase belum dikonfigurasi
  const rejecter = () => ({
    select: async () => ({ data: null, error: new Error('Supabase not configured (missing env)') }),
    insert: async () => ({ data: null, error: new Error('Supabase not configured (missing env)') }),
    update: async () => ({ data: null, error: new Error('Supabase not configured (missing env)') }),
    delete: async () => ({ data: null, error: new Error('Supabase not configured (missing env)') }),
    single: async () => ({ data: null, error: new Error('Supabase not configured (missing env)') }),
  })

  supabase = {
    from: () => rejecter(),
    storage: () => ({ from: () => ({ upload: async () => { throw new Error('Supabase not configured (missing env)') } }) }),
    auth: {
      signIn: async () => ({ error: new Error('Supabase not configured (missing env)') }),
      signOut: async () => ({ error: new Error('Supabase not configured (missing env)') }),
    },
  }
} else {
  // path normal: inisialisasi client Supabase dengan URL (harus https://...) dan ANON KEY
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}

// export di top-level (boleh di sini)
export { supabase }