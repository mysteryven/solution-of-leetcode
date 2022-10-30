
type LastReturn<T extends any[]> = ReturnType<T[0]>

export function compose<T extends ((...args: any[]) => any)[]>(...fns: T) {
  return function(...args: Parameters<T[0]>) {
    return fns.reduce((prev: any, current) => {
      return [current(...prev)]
    }, args)[0] as LastReturn<T>
  }
}

const timerMap = new Map()
let localTimer = -1 

export function setInterval(fn: () => void, timeout: number) {
  let first = true  
  let timerRef = {
    timer: null! as ReturnType<typeof setTimeout>
  }

  const run = () => {
    if (first) {
      first = false
    } else fn() 

    timerRef.timer = setTimeout(() => {
      run()
    }, timeout)
  }

  run()

  localTimer++
  timerMap.set(localTimer, timerRef)
  return localTimer
}

export function clearInterval(timer: number) {
  clearTimeout(timerMap.get(timer).timer)
}

export function myNew<T extends (...arg: any) => any>(Fn: T, ...args: Parameters<T>) {
  const obj = Object.create(Fn.prototype)

  const res = Fn.call(obj, ...args as any)
  if (is(res, 'object') || is(res, 'function')) {
    return res
  }

  return obj
}

function is(object: unknown, type: string): boolean  {
  return (Object.prototype.toString.call(object).slice(8, -1) as string).toLowerCase() === type

}