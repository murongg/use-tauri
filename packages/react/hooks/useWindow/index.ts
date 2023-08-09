import { useEffect, useState } from 'react'
import { type UseWindowListenOptions, getWindowManagerAndOptions, useWindowShared } from '@use-tauri/shared'
import type { WindowManager, WindowOptions } from '@tauri-apps/api/window'

export interface UseWindowReturn {
  x: number
  y: number
  width: number
  height: number
  isBlur: boolean
  isFocus: boolean
  isCreated: boolean
  isClosed: boolean
  unlistenAll: () => void
}
export function useWindow(window: WindowManager, options?: UseWindowListenOptions): UseWindowReturn
export function useWindow(label: string, windowOptions?: WindowOptions, options?: UseWindowListenOptions): UseWindowReturn
export function useWindow(...args: any[]): UseWindowReturn {
  const { windowManager, options } = getWindowManagerAndOptions(...args)
  const { enableListens = {}, onMove, onResize, onBlur, onFocus, onWindowCreated, onCloseRequested } = options

  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const [isBlur, setIsBlur] = useState(false)
  const [isFocus, setIsFocus] = useState(false)
  const [isCreated, setIsCreated] = useState(false)
  const [isClosed, setIsClosed] = useState(false)

  const { unlistenAll } = useWindowShared(windowManager, {
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
  })

  useEffect(() => {
    return () => {
      unlistenAll()
    }
  }, [])

  return {
    x,
    y,
    width,
    height,
    isBlur,
    isFocus,
    isClosed,
    isCreated,
    unlistenAll,
  }
}
