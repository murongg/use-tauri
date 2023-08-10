import type { WindowManager } from '@tauri-apps/api/window'
import { tryOnUnmounted } from '@vueuse/core'
import type { UseWindowReturn } from '../useWindow'
import { useWindow } from '../useWindow'

export type UseWindowThemeReturn = UseWindowReturn['theme']

export function useWindowTheme(manager: WindowManager): UseWindowThemeReturn {
  const { theme, unlisten } = useWindow(manager, {
    enableListens: {
      themeChanged: true,
    },
  })

  tryOnUnmounted(() => {
    unlisten('tauri://theme-changed')
  })

  return theme
}
