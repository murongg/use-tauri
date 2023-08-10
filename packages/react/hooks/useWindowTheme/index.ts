import type { Theme, WindowManager } from '@tauri-apps/api/window'
import { useWindow } from '../useWindow'

export type UseWindowThemeReturn = Readonly<Theme>

export function useWindowTheme(manager: WindowManager): UseWindowThemeReturn {
  const [,{ theme }] = useWindow(manager, {
    enableListens: {
      themeChanged: true,
    },
  })

  return theme
}
