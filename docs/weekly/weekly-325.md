
# 第 324 场周赛
 
:::info
参加时间：2022-12-25
:::

可能由于疫情，也可能由于圣诞节，参加的人数很少，只有 3530 人。我今天也只做出来来第一题，是历史最坏成绩了。

最后排名是  1273/3550。

## [6269. 到目标字符串的最短距离](https://leetcode.cn/problems/shortest-distance-to-target-string-in-a-circular-array/)

```js
/**
 * @param {string[]} words
 * @param {string} target
 * @param {number} startIndex
 * @return {number}
 */
var closetTarget = function(words, target, startIndex) {
    for (let i = 0; i < words.length; i++) {
        const index1 = (startIndex + i) % words.length
        const index2 = (startIndex - i + words.length) % words.length
        if (words[index1] === target || words[index2] === target) {
            return i
        }
    }
    
    return -1
};
```

[2516. 每种字符至少取 K 个](https://leetcode.cn/problems/take-k-of-each-character-from-left-and-right/)

第二题确实有点难，我想了一个小时也没有想到好的解决方案。后面的就自然放弃了。事后发现原来是二分法，真的巧妙。


```js
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var takeCharacters = function (s, k) {
  if (k === 0) {
    return 0
  }

  let lo = 1, hi = s.length;
  const count = [0, 0, 0]
  for (let i = 0; i < s.length; i++) {
    count[s[i].charCodeAt(0) - 'a'.charCodeAt(0)]++
  }

  if (count[0] < k || count[1] < k || count[2] < k) {
    return -1
  }

  const compute = (mid) => {
    debugger
    const count = [0, 0, 0]
    for (let i = 0; i < mid; i++) {
      count[s[i].charCodeAt(0) - 'a'.charCodeAt(0)]++
    }

    if (count[0] >= k && count[1] >= k && count[2] >= k) {
      return true
    }

    let i = mid - 1;
    while (i >= 0) {
      count[s[i].charCodeAt(0) - 'a'.charCodeAt(0)]--
      count[s[s.length - 1 - (mid - i - 1)].charCodeAt(0) - 'a'.charCodeAt(0)]++
      if (count[0] >= k && count[1] >= k && count[2] >= k) {
        return true
      }
      i--
    }

    return false
  }

  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2)
    const val = compute(mid)

    if (val) {
      hi = mid
    } else {
      lo = mid + 1
    }
  }

  return hi
};

```
