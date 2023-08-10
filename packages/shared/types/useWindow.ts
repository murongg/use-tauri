import type { Event } from '@tauri-apps/api/event'
import type { EventCallbackNone, OnMovePayload, OnResizePayload, OnWindowCreatedPayload } from '@use-tauri/core'

export interface UseWindowListenOptions {

  /**
   * Listen to window move event.
   * @param event
   * @returns
   */
  onMove?: (event: Event<OnMovePayload>) => void
  /**
   * Listen to window resize event.
   * @param event
   * @returns
   */
  onResize?: (event: Event<OnResizePayload>) => void

  /**
   * Listen to window focus event.
   * @param event
   * @returns
   */
  onBlur?: (event: Event<EventCallbackNone>) => void

  /**
   * Listen to window blur event.
   * @param event
   * @returns
   */
  onFocus?: (event: Event<EventCallbackNone>) => void

  /**
   * Listen to window created event.
   * @param event
   * @returns
   */
  onWindowCreated?: (event: Event<OnWindowCreatedPayload>) => void

  /**
   * Listen to window close event.
   * @param event
   * @returns
   */
  onCloseRequested?: (event: Event<EventCallbackNone>) => void

  /**
   * Enable listens.
   */
  enableListens?: {
    /**
     * Enable listen to move event.
     * When value is true, x and y will be updated when window move.
     */
    move?: boolean

    /**
     * Enable listen to resize event.
     * When value is true, width and height will be updated when window resize.
     */
    resize?: boolean

    /**
     * Enable listen to blur event.
     * When value is true, isBlur will be updated when window blur.
     */
    blur?: boolean

    /**
     * Enable listen to focus event.
     * When value is true, isBlur will be updated when window focus.
    */
    focus?: boolean

    /**
     * Enable listen to created event.
     * When value is true, isCreated will be updated when window created.
     */
    windowCreated?: boolean

    /**
     * Enable listen to close event.
     * When value is true, isClosed will be updated when window close.
     */
    closeRequested?: boolean
  }
}
