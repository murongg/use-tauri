import type { WindowManager } from '@tauri-apps/api/window'
import { UseTauriWindowManager } from '@use-tauri/core'
import type { UseWindowListenOptions } from '../types'

// const fn = (..._args: any[]) => { }

export interface useWindowSharedReturn {
  unlistenAll: () => void
  unlisten: UseTauriWindowManager['unlisten']
}

function tryOnManagerEvent(enable: boolean | undefined, on: Function | undefined, targetOn: Function) {
  if (enable || on)
    targetOn(on)
}

export function useWindowShared(window: WindowManager, options: UseWindowListenOptions): useWindowSharedReturn {
  const { enableListens = {}, onMove, onResize, onBlur, onFocus, onWindowCreated, onCloseRequested, onThemeChanged } = options
  const useTauriWindowManager = new UseTauriWindowManager(window)

  tryOnManagerEvent(enableListens?.move, onMove, useTauriWindowManager.onMove)
  tryOnManagerEvent(enableListens?.resize, onResize, useTauriWindowManager.onResize)
  tryOnManagerEvent(enableListens?.blur || enableListens?.focus, onBlur, useTauriWindowManager.onBlur)
  tryOnManagerEvent(enableListens?.blur || enableListens?.focus, onFocus, useTauriWindowManager.onFocus)
  tryOnManagerEvent(enableListens?.windowCreated, onWindowCreated, useTauriWindowManager.onWindowCreated)
  tryOnManagerEvent(enableListens?.closeRequested, onCloseRequested, useTauriWindowManager.onCloseRequested)
  tryOnManagerEvent(enableListens?.themeChanged, onThemeChanged, useTauriWindowManager.onThemeChanged)

  const unlistenAll = () => {
    useTauriWindowManager.unlistenAll()
  }

  return {
    unlistenAll,
    unlisten: useTauriWindowManager.unlisten,
  }
}
