import { useEffect, useState } from 'react'
import { type UseWindowListenOptions, getWindowManagerAndOptions, useWindowShared } from '@use-tauri/shared'
import type { Theme, WindowManager, WindowOptions } from '@tauri-apps/api/window'
import type { UseTauriWindowManager } from '@use-tauri/core'

export type UseWindowReturn = Readonly<[WindowManager, {
  x: number
  y: number
  width: number
  height: number
  isBlur: boolean
  isFocus: boolean
  isCreated: boolean
  isClosed: boolean
  theme: Theme
  unlistenAll: () => void
  unlisten: UseTauriWindowManager['unlisten']
}]>
export function useWindow(window: WindowManager, options?: UseWindowListenOptions): UseWindowReturn
export function useWindow(label: string, windowOptions?: WindowOptions, options?: UseWindowListenOptions): UseWindowReturn
export function useWindow(...args: any[]): UseWindowReturn {
  const { windowManager, options } = getWindowManagerAndOptions(...args)
  const { enableListens = {}, onMove, onResize, onBlur, onFocus, onWindowCreated, onCloseRequested, onThemeChanged } = options

  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const [isBlur, setIsBlur] = useState(false)
  const [isFocus, setIsFocus] = useState(false)
  const [isCreated, setIsCreated] = useState(false)
  const [isClosed, setIsClosed] = useState(false)

  const [theme, setTheme] = useState<Theme>('light')

  const { unlistenAll, unlisten } = useWindowShared(windowManager, {
    enableListens,
    onMove(event) {
      setX(event.payload.x)
      setY(event.payload.y)
      onMove?.(event)
    },
    onResize(event) {
      setWidth(event.payload.width)
      setHeight(event.payload.height)
      onResize?.(event)
    },
    onBlur(event) {
      setIsBlur(true)
      setIsFocus(false)
      onBlur?.(event)
    },
    onFocus(event) {
      setIsBlur(false)
      setIsFocus(true)
      onFocus?.(event)
    },
    onWindowCreated(event) {
      setIsCreated(true)
      onWindowCreated?.(event)
    },
    onCloseRequested(event) {
      setIsClosed(true)
      onCloseRequested?.(event)
    },
    onThemeChanged(event) {
      setTheme(event.payload)
      onThemeChanged?.(event)
    },
  })

  useEffect(() => {
    return () => {
      unlistenAll()
    }
  }, [])

  return [windowManager, {
    x,
    y,
    width,
    height,
    isBlur,
    isFocus,
    isClosed,
    isCreated,
    theme,
    unlistenAll,
    unlisten,
  }] as const
}
