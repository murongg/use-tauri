import type { Theme, WindowManager } from '@tauri-apps/api/window'
import { useEffect } from 'react'
import { useWindow } from '../useWindow'

export type UseWindowThemeReturn = Readonly<Theme>

export function useWindowTheme(manager: WindowManager): UseWindowThemeReturn {
  const [,{ theme, unlisten }] = useWindow(manager, {
    enableListens: {
      themeChanged: true,
    },
  })

  useEffect(() => {
    return () => {
      unlisten('tauri://theme-changed')
    }
  }, [])

  return theme
}
