import type { WindowManager } from '@tauri-apps/api/window'
import { useEffect } from 'react'
import { useWindow } from '../useWindow'

export interface UseWindowPositionReturn {
  x: number
  y: number
}

export function useWindowPosition(manager: WindowManager): UseWindowPositionReturn {
  const [, { x, y, unlisten }] = useWindow(manager, {
    enableListens: {
      move: true,
    },
  })

  useEffect(() => {
    return () => {
      unlisten('tauri://move')
    }
  }, [])

  return {
    x,
    y,
  }
}
