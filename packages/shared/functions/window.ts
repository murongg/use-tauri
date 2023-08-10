import type { WindowManager } from '@tauri-apps/api/window'
import { UseTauriWindowManager } from '@use-tauri/core'
import type { UseWindowListenOptions } from '../types'

const fn = (..._args: any[]) => { }

export interface useWindowSharedReturn {
  unlistenAll: () => void
  unlisten: UseTauriWindowManager['unlisten']
}

export function useWindowShared(window: WindowManager, options: UseWindowListenOptions): useWindowSharedReturn {
  const { enableListens = {}, onMove = fn, onResize = fn, onBlur = fn, onFocus = fn, onWindowCreated = fn, onCloseRequested = fn } = options
  const useTauriWindowManager = new UseTauriWindowManager(window)
  if (enableListens?.move || onMove)
    useTauriWindowManager.onMove(onMove)

  if (enableListens?.resize || onResize)
    useTauriWindowManager.onResize(onResize)

  if (enableListens.blur || enableListens.focus || onBlur)
    useTauriWindowManager.onBlur(onBlur)

  if (enableListens.blur || enableListens.focus || onFocus)
    useTauriWindowManager.onFocus(onFocus)

  if (enableListens?.windowCreated || onWindowCreated)
    useTauriWindowManager.onWindowCreated(onWindowCreated)

  if (enableListens?.closeRequested || onCloseRequested)
    useTauriWindowManager.onCloseRequested(onCloseRequested)

  const unlistenAll = () => {
    useTauriWindowManager.unlistenAll()
  }

  return {
    unlistenAll,
    unlisten: useTauriWindowManager.unlisten,
  }
}
