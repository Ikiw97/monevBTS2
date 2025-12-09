import React from 'react'

export default function KPI({ title, value, delta, icon }) {
  // icon can be an element (svg) or string
  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
      <div>
        <div className="text-xs text-gray-500">{title}</div>
        <div className="text-2xl font-bold mt-1">{value}</div>
        {delta !== undefined && (
          <div className={`text-sm mt-1 ${delta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {delta >= 0 ? '▲ ' : '▼ '} {Math.abs(delta)}%
          </div>
        )}
      </div>
      <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center">
        {icon}
      </div>
    </div>
  )
}