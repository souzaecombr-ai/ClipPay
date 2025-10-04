import * as React from "react"

export function Switch({ checked, onCheckedChange, id }) {
  return (
    <button
      onClick={() => onCheckedChange(!checked)}
      id={id}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${
        checked ? "bg-emerald-500" : "bg-white/20"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
          checked ? "translate-x-4" : "translate-x-1"
        }`}
      />
    </button>
  )
}
