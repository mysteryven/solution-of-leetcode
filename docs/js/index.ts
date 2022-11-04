
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

// 1.
/*
 问题：如何判断字符串是合法的IPv4地址
*/
// '123.123.123.123'

function isIPv4(str) {
  const arr = str.split('.').filter(Boolean)
  if (arr.length !== 4) {
    return false
  }

  for (let i = 0; i < arr.length; i++) {
    // '0.1111.0.0'
    if (arr[i].length > 3) {
      return false
    }

    //  '0.01.0.0'
    //     ^^
    if (arr[i] !== '0' && arr[i][0] === '0') {
      return false
    }

    const num = Number(arr[i])

    // '0.0x.00.1'
    //    ^^
    if (Number.isNaN(num)) {
      return false
    }

    // 0.-1.xxx.x
    //   ^^
    if (num < 0 || num > 255) {
      return false
    }
  }

  return true
}

/*
 问题：给定两个有序正整数数组，求他们的交集，例如[1，3，5，7，8]与[3，6，8，20，31]的交集为[3,8]。
*/
export function findUnion(a, b) {
  let i = 0
  let j = 0
  
  const result = new Set()
  while ( i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      result.add(a[i])
      i++
      j++
    } else if (a[i] < b[j]) {
      i++
    } else {
      j++
    }
  }

  return Array.from(result)
}

// 3.
/*
问题：实现方法f, 判断以下图结构中，是否存在闭环并打印出闭环上的节点
*/

var graph = [
  { src: 'g', dst: 'e' },
  { src: 'a', dst: 'b' },
  { src: 'f', dst: 'g' },
  { src: 'e', dst: 'f' },
  { src: 'c', dst: 'd' },
  { src: 'b', dst: 'c' },
];

function f() {
}


// f(graph); // e, f, g






//4.
// 简单实现一个事件订阅机制，具有监听on和触发emit以及取消监听off方法
/**
 * const event = new EventEmitter();
 * event.on('someEvent', (...args) => {
 *     console.log('some_event triggered', ...args);
 * });
 * event.emit('someEvent', 'abc', '123');
 */


class EventEmitter {
  eventMap = new Map()
  
  on(eventName, callback) {
    const eventFns = this.eventMap.get(eventName) 
    if (eventFns) {
      eventFns.push(callback)
    } else {
      this.eventMap.set(eventName, [callback])
    }
  }

  emit(eventName, ...params) {
    const fns = this.eventMap.get(eventName)
    if (!Array.isArray(fns)) {
      return false
    }
    for (let fn of fns) {
      fn(...params)
    }
  }

  off(eventName) {
    this.eventMap.set(eventName, null)
  }
}







