import type { WindowManager } from '@tauri-apps/api/window'
import type { UseWindowReturn } from '../useWindow'
import { useWindow } from '../useWindow'

export type UseWindowThemeReturn = UseWindowReturn['theme']

export function useWindowTheme(manager: WindowManager): UseWindowThemeReturn {
  const { theme } = useWindow(manager, {
    enableListens: {
      themeChanged: true,
    },
  })

  return theme
}
