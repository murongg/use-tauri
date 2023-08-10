import { getWindowManagerAndOptions, useWindowShared } from '@use-tauri/shared'
import type { UseWindowListenOptions } from '@use-tauri/shared'
import type { Theme, WindowManager, WindowOptions } from '@tauri-apps/api/window'
import { type Ref, ref } from 'vue-demi'
import { tryOnUnmounted } from '@vueuse/core'

export interface UseWindowReturn {
  windowManager: WindowManager
  x: Ref<number>
  y: Ref<number>
  width: Ref<number>
  height: Ref<number>
  isBlur: Ref<boolean>
  isFocus: Ref<boolean>
  isCreated: Ref<boolean>
  isClosed: Ref<boolean>
  theme: Ref<Theme>
  unlistenAll: () => void
}

export function useWindow(window: WindowManager, options?: UseWindowListenOptions): UseWindowReturn
export function useWindow(label: string, windowOptions?: WindowOptions, options?: UseWindowListenOptions): UseWindowReturn
export function useWindow(...args: any[]): UseWindowReturn {
  const { windowManager, options } = getWindowManagerAndOptions(...args)

  const x = ref(0)
  const y = ref(0)
  const width = ref(0)
  const height = ref(0)

  const isBlur = ref(false)
  const isFocus = ref(false)
  const isCreated = ref(false)
  const isClosed = ref(false)

  const theme = ref<Theme>('light')

  const { enableListens = {}, onMove, onResize, onBlur, onFocus, onWindowCreated, onCloseRequested, onThemeChanged } = options
  const { unlistenAll } = useWindowShared(windowManager, {
    enableListens,
    onMove(event) {
      x.value = event.payload.x
      y.value = event.payload.y
      onMove?.(event)
    },
    onResize(event) {
      width.value = event.payload.width
      height.value = event.payload.height
      onResize?.(event)
    },
    onBlur(event) {
      isBlur.value = true
      isFocus.value = false
      onBlur?.(event)
    },
    onFocus(event) {
      isBlur.value = false
      isFocus.value = true
      onFocus?.(event)
    },
    onWindowCreated(event) {
      isCreated.value = true
      onWindowCreated?.(event)
    },
    onCloseRequested(event) {
      isClosed.value = true
      onCloseRequested?.(event)
    },
    onThemeChanged(event) {
      theme.value = event.payload
      onThemeChanged?.(event)
    },
  })

  tryOnUnmounted(() => {
    unlistenAll()
  })

  return {
    windowManager,
    x,
    y,
    width,
    height,
    isBlur,
    isFocus,
    isCreated,
    isClosed,
    theme,
    unlistenAll,
  }
}
