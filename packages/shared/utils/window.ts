import { WebviewWindow, WindowManager } from '@tauri-apps/api/window'
import type { UseWindowListenOptions } from '../types'

export function getWindowManagerAndOptions(...args: any[]) {
  let windowManager: WindowManager
  let options: UseWindowListenOptions
  if (args[0] instanceof WindowManager) {
    windowManager = args[0]
    options = args[1]
  }
  else {
    windowManager = new WebviewWindow(args[0], args[1])
    options = args[2]
  }
  return {
    windowManager,
    options,
  }
}
