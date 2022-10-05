# 921. 使括号有效的最少添加

## 时间

2022年10月04日

## 难度

中等

## 题解

这道题难就难在理解题意，总之意思就是存在的一个左括号必须和右括号匹配，拆解开来

- 它可以被写成 AB （A 与 B 连接）, 其中 A 和 B 都是有效字符串: 意思就是 '()()' 这种是合法的
- 它可以被写作 (A)，其中 A 是有效字符串: 意思就是 (()) 这种是合法的。

```js
/**
 * @param {string} s
 * @return {number}
 */
var minAddToMakeValid = function(s) {
    let leftCount = 0
    let ans = 0

    for (let char of s) {
        if (char === '(') {
            leftCount++
        } else {
            if (leftCount > 0) {
                leftCount--
            } else {
                ans++
            }
        }
    }

    return ans + leftCount
};
```