import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useClickOutside } from './useClickOutside'

describe('useClickOutside', () => {
  let container: HTMLDivElement
  let element: HTMLDivElement

  beforeEach(() => {
    container = document.createElement('div')
    element = document.createElement('div')
    container.appendChild(element)
    document.body.appendChild(container)
  })

  it('should call handler when clicking outside', () => {
    const handler = vi.fn()
    const ref = { current: element }

    renderHook(() => useClickOutside(ref, handler))

    const outsideElement = document.createElement('div')
    document.body.appendChild(outsideElement)

    const event = new MouseEvent('mousedown', { bubbles: true })
    outsideElement.dispatchEvent(event)

    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should not call handler when clicking inside', () => {
    const handler = vi.fn()
    const ref = { current: element }

    renderHook(() => useClickOutside(ref, handler))

    const event = new MouseEvent('mousedown', { bubbles: true })
    element.dispatchEvent(event)

    expect(handler).not.toHaveBeenCalled()
  })

  it('should handle touch events', () => {
    const handler = vi.fn()
    const ref = { current: element }

    renderHook(() => useClickOutside(ref, handler))

    const outsideElement = document.createElement('div')
    document.body.appendChild(outsideElement)

    const event = new TouchEvent('touchstart', { bubbles: true })
    outsideElement.dispatchEvent(event)

    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should cleanup event listeners on unmount', () => {
    const handler = vi.fn()
    const ref = { current: element }

    const { unmount } = renderHook(() => useClickOutside(ref, handler))

    unmount()

    const outsideElement = document.createElement('div')
    document.body.appendChild(outsideElement)
    const event = new MouseEvent('mousedown', { bubbles: true })
    outsideElement.dispatchEvent(event)

    expect(handler).not.toHaveBeenCalled()
  })
})
