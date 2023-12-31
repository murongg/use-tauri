export * from '@use-tauri/core'
export * from '@use-tauri/shared'
export {
  useWindow as useWindowReact,
  useWindowSize as useWindowSizeReact,
  useWindowPosition as useWindowPositionReact,
  useWindowTheme as useWindowThemeReact,
} from '@use-tauri/react'

export type {
  UseWindowReturn as UseWindowReturnReact,
  UseWindowSizeReturn as UseWindowSizeReturnReact,
  UseWindowPositionReturn as UseWindowPositionReturnReact,
  UseWindowThemeReturn as UseWindowThemeReturnReact,
} from '@use-tauri/react'

export {
  useWindow as useWindowVue,
  useWindowSize as useWindowSizeVue,
  useWindowPosition as useWindowPositionVue,
  useWindowTheme as useWindowThemeVue,
} from '@use-tauri/vue'

export type {
  UseWindowReturn as UseWindowReturnVue,
  UseWindowSizeReturn as UseWindowSizeReturnVue,
  UseWindowPositionReturn as UseWindowPositionReturnVue,
  UseWindowThemeReturn as UseWindowThemeReturnVue,
} from '@use-tauri/vue'
