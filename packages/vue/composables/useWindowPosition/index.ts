import type { Ref } from 'vue-demi'
import type { WindowManager } from '@tauri-apps/api/window'
import { useWindow } from '../useWindow'

export interface UseWindowPositionReturn {
  x: Ref<number>
  y: Ref<number>
}

export function useWindowPosition(manager: WindowManager): UseWindowPositionReturn {
  const { x, y } = useWindow(manager, {
    enableListens: {
      move: true,
    },
  })

  return {
    x,
    y,
  }
}
