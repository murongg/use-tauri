import type { WindowManager } from '@tauri-apps/api/window'
import { useWindow } from '../useWindow'

export interface UseWindowPositionReturn {
  x: number
  y: number
}

export function useWindowPosition(manager: WindowManager): UseWindowPositionReturn {
  const [, { x, y }] = useWindow(manager, {
    enableListens: {
      move: true,
    },
  })

  return {
    x,
    y,
  }
}
