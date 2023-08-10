export interface WindowPosition {
  x: number
  y: number
}
export interface WindowSize {
  width: number
  height: number
}
export type WindowTheme = 'Dark' | 'Light'

export type FilePath = string

export type OnMovePayload = WindowPosition
export type OnResizePayload = WindowSize
export interface OnScaleChangePayload {
  scaleFactor: number
  size: WindowSize
}
export interface OnWindowCreatedPayload {
  label: string
}

export type EventCallbackNone = null
