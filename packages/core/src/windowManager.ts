import type { EventCallback, EventName, UnlistenFn } from '@tauri-apps/api/event'
import { type Theme, WebviewWindow, type WindowManager, type WindowOptions } from '@tauri-apps/api/window'
import type { EventCallbackNone, FilePath, OnMovePayload, OnResizePayload, OnScaleChangePayload, OnWindowCreatedPayload } from './types'

const managers: Map<string, WindowManager> = new Map()

export class UseTauriWindowManager {
  public windowManager: WindowManager
  private listenings: Map<EventName, UnlistenFn> = new Map()

  constructor(windowManager: WindowManager) {
    const manager = managers.get(windowManager.label)
    if (manager) {
      this.windowManager = manager
    }
    else {
      this.windowManager = windowManager
      managers.set(windowManager.label, windowManager)
    }
  }

  /**
   * listen to window manager event.
   * @param name
   * @param cb
   */
  async listen<T>(name: EventName, cb: EventCallback<T>) {
    const eventUnlisten = this.listenings.get(name)
    eventUnlisten && eventUnlisten()
    const unlisten = await this.windowManager.listen(name, cb)
    this.listenings.set(name, unlisten)
  }

  /**
   * listen to window manager move event, callback window position.
   * @param cb
   */
  onMove(cb: EventCallback<OnMovePayload>) {
    this.listen('tauri://move', cb)
  }

  /**
   * listen to window manager resize event, callback window size.
   * @param cb
   */
  onResize(cb: EventCallback<OnResizePayload>) {
    this.listen('tauri://resize', cb)
  }

  /**
   * listen to window manager focus event, none callback.
   * @param cb
   */
  onBlur(cb: EventCallback<EventCallbackNone>) {
    this.listen('tauri://blur', cb)
  }

  /**
   * listen to window manager blur event, none callback.
   * @param cb
   */
  onFocus(cb: EventCallback<EventCallbackNone>) {
    this.listen('tauri://focus', cb)
  }

  /**
   * listen to window manager close event, none callback.
   * @param cb
   */
  onCloseRequested(cb: EventCallback<EventCallbackNone>) {
    this.listen('tauri://close-requested', cb)
  }

  /**
   * listen to window manager created event, none callback.
   * @param cb
   */
  onWindowCreated(cb: EventCallback<OnWindowCreatedPayload>) {
    this.listen('tauri://window-created', cb)
  }

  /**
   * listen to window manager destroyed event, none callback.
   * @param cb
   */
  onDestroyed(cb: EventCallback<EventCallbackNone>) {
    this.listen('tauri://destroyed', cb)
  }

  /**
   * listen to window manager file drop event, callback file paths.
   * @param cb
   */
  onFileDrop(cb: EventCallback<FilePath[]>) {
    this.listen('tauri://file-drop', cb)
  }

  /**
   * listen to window manager file drop hover event, callback file paths.
   * @param cb
   */
  onFileDropHover(cb: EventCallback<FilePath[]>) {
    this.listen('tauri://file-drop-hover', cb)
  }

  /**
   * listen to window manager file drop cancelled event, none callback.
   * @param cb
   */
  onFileDropCancelled(cb: EventCallback<EventCallbackNone>) {
    this.listen('tauri://file-drop-cancelled', cb)
  }

  /**
   * listen to window theme changed event, callback theme.
   * @param cb
   */
  onThemeChanged(cb: EventCallback<Theme>) {
    this.listen('tauri://theme-changed', cb)
  }

  /**
   * listen to window manager scale changed event, callback scale factor and window size.
   * @param cb
   */
  onScaleChange(cb: EventCallback<OnScaleChangePayload>) {
    this.listen('tauri://scale-change', cb)
  }

  /**
   * listen to window manager menu event, callback menu id.
   * @param cb
   */
  onMenu(cb: EventCallback<string>) {
    this.listen('tauri://menu', cb)
  }

  /**
   * get listen event.
   * @param name
   * @returns
   */
  getListen(name: EventName) {
    return this.listenings.get(name)
  }

  /**
   * unlisten event.
   * @param name
   */
  unlisten(name: EventName) {
    this.getListen(name)?.()
    this.listenings.delete(name)
  }

  /**
   * unlisten all events.
   */
  unlistenAll() {
    this.listenings.forEach(unlisten => unlisten())
    this.listenings.clear()
  }
}

export function getOrNewManager(label: string, options?: WindowOptions) {
  if (managers.get(label))
    return managers.get(label)!

  const manager = new WebviewWindow(label, options)
  managers.set(label, manager)
  return manager
}
