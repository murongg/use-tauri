import type { EventCallback, EventName, UnlistenFn } from '@tauri-apps/api/event'
import type { WindowManager } from '@tauri-apps/api/window'

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
   * listen to window manager move event.
   * @param cb
   */
  onMove(cb: EventCallback<{ x: number; y: number }>) {
    this.listen('tauri://move', cb)
  }

  /**
   * listen to window manager resize event.
   * @param cb
   */
  onResize(cb: EventCallback<{ width: number; height: number }>) {
    this.listen('tauri://resize', cb)
  }

  /**
   * listen to window manager focus event.
   * @param cb
   */
  onBlur(cb: EventCallback<null>) {
    this.listen('tauri://blur', cb)
  }

  /**
   * listen to window manager blur event.
   * @param cb
   */
  onFocus(cb: EventCallback<null>) {
    this.listen('tauri://focus', cb)
  }

  /**
   * listen to window manager close event.
   * @param cb
   */
  onCloseRequested(cb: EventCallback<null>) {
    this.listen('tauri://close-requested', cb)
  }

  /**
   * listen to window manager created event.
   * @param cb
   */
  onWindowCreated(cb: EventCallback<null>) {
    this.listen('tauri://window-created', cb)
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
  }

  /**
   * unlisten all events.
   */
  unlistenAll() {
    this.listenings.forEach(unlisten => unlisten())
    this.listenings.clear()
  }
}
