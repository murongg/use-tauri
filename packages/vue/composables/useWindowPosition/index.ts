import type { Ref } from 'vue-demi'
import type { WindowManager } from '@tauri-apps/api/window'
import { tryOnUnmounted } from '@vueuse/core'
import { useWindow } from '../useWindow'

export interface UseWindowPositionReturn {
  x: Ref<number>
  y: Ref<number>
}

export function useWindowPosition(manager: WindowManager): UseWindowPositionReturn {
  const { x, y, unlisten } = useWindow(manager, {
    enableListens: {
      move: true,
    },
  })

  tryOnUnmounted(() => {
    unlisten('tauri://move')
  })

  return {
    x,
    y,
  }
}
