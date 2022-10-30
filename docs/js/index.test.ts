import {describe, assert, it, beforeEach, vi, afterEach, expect, test} from 'vitest'
import { clearInterval, compose, myNew, setInterval } from ".";

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

describe('myNew', () => {
  test('construct a new Person', () => {
    function Person(name: string) {
      this.name = name
    }

    const mysteryven = new Person('mysteryven')

    expect(mysteryven).toStrictEqual(new Person('mysteryven'))
    expect(Object.getPrototypeOf(mysteryven)).equal(Person.prototype)
  })

  test('get function value if it has returns', () => {
    function Person(name: string) {
      this.name = name

      return {
        obj: 1
      }
    }

    const mysteryven = myNew(Person, 'hi')

    expect(mysteryven).toStrictEqual({
      obj: 1 
    })
  })
})