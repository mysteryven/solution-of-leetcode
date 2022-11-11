# 3. 无重复字符的最长子串
## 题目


[地址](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)


## 时间


2022年 11 月 11 日


## 难度


简单


## 题解


```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    if (s.length === 0) {
        return 0
    }

    let max = 1
    const set = new Set()

    let i = 0
    let j = 0
    while (j < s.length) {
        while(i < j && set.has(s[j])) {
            set.delete(s[i++])
        }
        set.add(s[j])
        max = Math.max(max, j - i + 1)
        j++
    }

    return max
};
```