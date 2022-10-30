# 第 317 场双周赛


今天这场感觉不是特别有意思
 
:::info
参加时间：2022-10-30
:::

## [6220. 可被三整除的偶数的平均值](https://leetcode.cn/problems/average-value-of-even-numbers-that-are-divisible-by-three/)


简单


```js
var averageValue = function(nums) {
    const arr = nums.filter(num => num % 3 === 0 && num % 2 === 0)
    
    return Math.floor(arr.reduce((prev, cur) => prev + cur, 0) / arr.length) || 0
};
```


## [6221. 最流行的视频创作者](https://leetcode.cn/problems/most-popular-video-creator/)

```js
var mostPopularCreator = function(creators, ids, views) {
    const map = new Map()
    
    for (let i = 0; i < creators.length; i++) {
        let unit = map.get(creators[i])
        
        if (unit) {
            unit.total = unit.total + views[i]
            if (views[i] > unit.hotView || (views[i] === unit.hotView && ids[i] < unit.hotId)) {
                unit.hotId = ids[i]
                unit.hotView = views[i]
            }
        } else {
            unit = {
                total: views[i],
                hotId: ids[i],
                hotView: views[i]
            }
            
            map.set(creators[i], unit)
        }
    }

    let max = -1
    
    for (let [_, unit] of map) {
        if (max < unit.total) {
            max = unit.total
        }
    }
    
    let ret = []
    for (let [name, unit] of map) {
        if (unit.total === max) {
            ret.push([name, unit.hotId])
        }
    }

    return ret
};
```

[6222. 美丽整数的最小增量](https://leetcode.cn/problems/minimum-addition-to-make-integer-beautiful/)

```js
/**
 * @param {number} n
 * @param {number} target
 * @return {number}
 */
var makeIntegerBeautiful = function (n, target) {
  debugger
  let arr = n.toString().split('').map(i => +i)

  let total = arr.reduce((prev, cur) => prev + cur, 0)

  if (total <= target) {
    return 0
  }

  let value = n
  while (total > target) {
    let digit = 0
    for (let i = arr.length - 1; i > 0; i--) {
      if (arr[i] !== 0) {
        break;
      }
      digit++
    }

    value = (10 - arr[arr.length - digit - 1]) * Math.pow(10, digit) + value
    arr = value.toString().split('').map(i => +i)
    total = arr.reduce((prev, cur) => prev + cur, 0)
  }

  return value - n
};

```