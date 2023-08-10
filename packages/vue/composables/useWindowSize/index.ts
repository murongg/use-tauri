import type { Ref } from 'vue-demi'
import type { WindowManager } from '@tauri-apps/api/window'
import { useWindow } from '../useWindow'

export interface UseWindowSizeReturn {
  width: Ref<number>
  height: Ref<number>
}

export function useWindowSize(manager: WindowManager): UseWindowSizeReturn {
  const { width, height } = useWindow(manager, {
    enableListens: {
      resize: true,
    },
  })

  return {
    width,
    height,
  }
}
