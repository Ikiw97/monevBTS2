import React from 'react'

export default function FeatureCard({ title, desc, icon }) {
  return (
    <div className="card flex flex-col items-start gap-3 p-6 hover:shadow-lg">
      <div className="icon-badge mb-1" aria-hidden>
        {icon}
      </div>
      <h4 className="font-semibold text-lg">{title}</h4>
      <p className="text-sm text-muted">{desc}</p>
      <div className="mt-3">
        <button className="text-sm text-brand-600 font-medium hover:underline">Pelajari lebih lanjut →</button>
      </div>
    </div>
  )
}