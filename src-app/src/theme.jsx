// ============================================================
// THEME (Daylight / Midnight)
// Daylight is the default mode. Midnight is the optional dark palette, kept
// behind [data-theme="dark"] so the page still renders correctly with JS off.
// The choice is stored per browser and applied before React mounts, so there
// is no flash of the wrong palette.
// ============================================================
import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'portfolio-theme'

export const THEMES = {
  light: { id: 'light', label: 'Daylight', next: 'dark', nextLabel: 'Midnight' },
  dark: { id: 'dark', label: 'Midnight', next: 'light', nextLabel: 'Daylight' },
}

export function readTheme() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  try {
    window.localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* storage blocked: the session still renders with the chosen theme */
  }
}

// Called from main.jsx before the app mounts.
export function initTheme() {
  applyTheme(readTheme())
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  )
}

// Nav pill that shows the active mode and flips to the other one on click.
export function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark'
      ? 'dark'
      : 'light'
  )

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) setTheme(e.newValue === 'dark' ? 'dark' : 'light')
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      applyTheme(next)
      return next
    })
  }, [])

  const meta = THEMES[theme]
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={`Theme: ${meta.label}. Switch to ${meta.nextLabel}.`}
      title={`Currently ${meta.label}. Click for ${meta.nextLabel}.`}
      className={`theme-toggle ${isDark ? 'dark' : ''} ${className}`}
    >
      <span className="theme-toggle-icon" aria-hidden="true">{isDark ? <MoonIcon /> : <SunIcon />}</span>
      <span className="theme-toggle-label">{meta.label}</span>
    </button>
  )
}
