# 811. 子域名访问计数

## 题目
  

[地址](https://leetcode.cn/problems/subdomain-visit-count/)

## 时间

2022年10月05日

## 难度

中等

## 题解

这道题好像不算是算法题，就是哈希表收集、计数。

```js
/**
 * @param {string[]} cpdomains
 * @return {string[]}
 */
var subdomainVisits = function(cpdomains) {
    const map = new Map()
    for (let cpdomain of cpdomains) {
        const [times, keys] = getKeysAndTimes(cpdomain)

        for (let key of keys) {
            map.set(key, (map.get(key) || 0) + times)
        }
    }

    let ans = []
    for (let [key, value] of map) {
        ans.push(`${value} ${key}`)
    }

    return ans
};

function getKeysAndTimes(str) {
    const [times, s] = str.split(' ')
    const keys = []
    keys.push(s)

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '.') {
            keys.push(s.slice(i + 1))
        }
    }
    
    return [+times, keys]
}
```
