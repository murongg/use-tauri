import type { Ref } from 'vue-demi'
import type { WindowManager } from '@tauri-apps/api/window'
import { tryOnUnmounted } from '@vueuse/core'
import { useWindow } from '../useWindow'

export interface UseWindowSizeReturn {
  width: Ref<number>
  height: Ref<number>
}

export function useWindowSize(manager: WindowManager): UseWindowSizeReturn {
  const { width, height, unlisten } = useWindow(manager, {
    enableListens: {
      resize: true,
    },
  })

  tryOnUnmounted(() => {
    unlisten('tauri://resize')
  })

  return {
    width,
    height,
  }
}
