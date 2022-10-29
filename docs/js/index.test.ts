import {describe, assert, it, beforeEach, vi, afterEach, expect} from 'vitest'
import { clearInterval, compose, setInterval } from ".";

describe('compose', () => {
  function fn1(x: number) {
    return x + 1;
  }
  function fn2(x: number) {
    return x + 2;
  }
  function fn3(x: number) {
    return x + 3;
  }
  function fn4(x: number) {
    return x + 4;
  }

  it('compose right', () => {

    assert.equal(compose(fn1, fn2, fn3, fn4)(1), 11)
  })
})

describe('setInterval', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('called once when time arrived first interval', () => {
    const fn = vi.fn(() => {})

    setInterval(fn, 200)
    vi.advanceTimersByTime(199)
    expect(fn).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
    expect(fn).toHaveBeenCalled()
  })

  it('called twice when time arrived second interval', () => {
    const fn = vi.fn(() => {})

    setInterval(fn, 200)
    vi.advanceTimersByTime(401)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('not called again when disposed by clearInterval', () => {
    const fn = vi.fn(() => {})

    const timer = setInterval(fn, 200)
    vi.advanceTimersByTime(401)
    clearInterval(timer)
    expect(fn).toHaveBeenCalledTimes(2)
    vi.advanceTimersByTime(200)
    expect(fn).toHaveBeenCalledTimes(2)
  })
})