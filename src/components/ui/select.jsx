import * as React from "react"

export function Select({ children, onChange, value }) {
  return (
    <select
      className="w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
      value={value}
      onChange={onChange}
    >
      {children}
    </select>
  )
}

export const SelectItem = ({ children, value }) => (
  <option className="bg-slate-900 text-white" value={value}>
    {children}
  </option>
)
