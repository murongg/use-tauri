import type { WindowManager } from '@tauri-apps/api/window'
import { useEffect } from 'react'
import { useWindow } from '../useWindow'

export interface UseWindowSizeReturn {
  width: number
  height: number
}

export function useWindowSize(manager: WindowManager): UseWindowSizeReturn {
  const [, { width, height, unlisten }] = useWindow(manager, {
    enableListens: {
      resize: true,
    },
  })

  useEffect(() => {
    return () => {
      unlisten('tauri://resize')
    }
  }, [])

  return {
    width,
    height,
  }
}
